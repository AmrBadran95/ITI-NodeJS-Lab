const express = require("express");
const postController = require("../Controllers/post");
const router = express.Router();

router.post("/", postController.createPost);

router.get("/", postController.getAllPosts);

router.get("/:id", postController.getPostById);

router.patch("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
