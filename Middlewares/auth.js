const jwt = require("jsonwebtoken");
const util = require("util");

const jwtVerify = util.promisify(jwt.verify);

const auth = async (req, res, next) => {
  try {
    const tokenData = req.headers.authorization;

    if (!tokenData) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }

    const token = tokenData.split(" ")[1];

    const decodedData = await jwtVerify(token, process.env.JWT_SECRET_KEY);

    req.user = {
      _id: decodedData._id,
      role: decodedData.role,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "failed",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      status: "failed",
    });
  }
};

module.exports = auth;
