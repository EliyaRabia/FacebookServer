const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.route("/").get(postController.get25Posts);

module.exports = router;