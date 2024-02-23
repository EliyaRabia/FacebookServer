const userService = require('../services/user');
const jwt = require('jsonwebtoken');
const createUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const photo = req.body.photo;
    user = await userService.getUserbyUsername(username);
    if (!user) {
        res.status(200).json(await userService.createUser(username, password, displayName, photo));
    }else{
        res.status(404).send('Username already exists');
    }
}

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    user = await userService.getUser(username, password);
    if (user) {
        res.status(200).json(user);
        const token = jwt.sign({ username: user.username}, "key")
        res.json(token);
    }else{
        res.status(404).send('Username or password is incorrect');
    }
}

const getUser = async (req, res) => {
    const username = req.body.username;
    user = await userService.getUserbyUsername(username);
    if (user) {
        res.status(200).json(req.body.username,req.body.displayName,req.body.photo);
    }else{
        res.status(404).send('Username not found');
    }
}
module.exports = { createUser , login , getUser };