const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const postController = require('../controllers/posts')
//Register
router.route('/')
.post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserByIdWithPassword)
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:id/posts')
  .get(postController.getAllPosts)
  .post(postController.createPost);
module.exports = router;