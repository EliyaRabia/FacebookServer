const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

//Register
router.route('/')
.post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUserByIdWithPassword)
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;