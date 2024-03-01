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
  // .get(postController.getAllPosts)
  .post(postController.createPost);

router.route("/:id/posts/:pid")
  .put(postController.updatePost)
  .delete(postController.deletePost);

router.route("/:id/frineds")
.post(userController.addFriend)
.get(userController.getAllFriends);

module.exports = router;