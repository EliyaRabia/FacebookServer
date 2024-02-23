const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { username, password, displayName, photo } = req.body;
    const user = new User({
        username,
        password,
        displayName,
        photo
    });
    try {
        return await user.save();
    } catch (error) {
        res.status(404).send(error);
    }
}

const getUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        return await User.findOne({ username, password }).exec();
    } catch (error) {  
        res.status(404).send(error);
    }
}

const getUserbyUsername = async (req, res) => {
    const { username } = req.body;
    try {
        return await User.findOne({ username }).exec();
    } catch (error) {
        res.status(404).send(error);
        return null;
    }
}
module.exports = { createUser , getUser, getUserbyUsername};