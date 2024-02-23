const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

//Register
router.route('/').post(userController.createUser);


module.exports = router;