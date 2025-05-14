const User = require("../Models/user");
const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const jwtSign = util.promisify(jwt.sign);

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({
      message: "Invalid Data",
      status: "failed",
    });
  }

  const saltRounds = +process.env.SALT_ROUNDS;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const registeredUser = {
    ...user.toObject(),
    password: undefined,
    __v: undefined,
  };

  res.json({
    message: "user created successfully",
    status: "success",
    data: registeredUser,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email or Password is missing",
      status: "failed",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email or Password is invalid",
      status: "failed",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Password is incorrect",
      status: "failed",
    });
  }

  const token = await jwtSign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2h",
    }
  );

  res.status(200).json({
    message: "user logged in successfully",
    status: "success",
    data: {
      accessToken: token,
    },
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({
      message: "No Users Found",
      status: "failed",
    });
  }
  res.json({
    message: "users fetched successfully",
    status: "success",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
      status: "failed",
    });
  }

  res.json({
    message: "users fetched successfully",
    status: "success",
    data: user,
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(404).json({
      message: "user not found",
      status: "failed",
    });
  }

  res.json({
    message: "user updated successfully",
    status: "success",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({
      message: "user not found",
      status: "failed",
    });
  }

  res.status(204).json({
    message: "user deleted successfully",
    status: "success",
  });
};

module.exports = {
  login,
  signup,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
