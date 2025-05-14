const Post = require("../Models/post");

const createPost = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400).json({
      message: "title is required",
      status: "failed",
    });
  }

  const post = await Post.create({
    title,
    description,
  });
  res.json({
    message: "post created successfully",
    status: "success",
    data: post,
  });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    res.status(404).json({
      message: "No Posts Found.",
      status: "failed",
    });
  }
  res.json({
    message: "posts fetched successfully",
    status: "success",
    data: posts,
  });
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).json({
      message: "post not found",
      status: "failed",
    });
  }
  res.json({
    message: "post fetched successfully",
    status: "success",
    data: post,
  });
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        status: "failed",
      });
    }

    res.json({
      message: "Post updated successfully",
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: "error",
      error: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    res.status(404).json({
      message: "post not found",
      status: "failed",
    });
  }
  res.json({
    message: "post deleted successfully",
    status: "success",
    data: post,
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
