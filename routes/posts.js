const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

module.exports = router;