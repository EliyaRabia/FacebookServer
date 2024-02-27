const userService = require('../services/users');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const photo = req.body.photo;
    user = await userService.getUserByUsername(username);
    if (!user) {
        res.status(200).json(await userService.createUser(username, password, displayName, photo));
    }else{
        res.status(404).send('Username already exists');
    }
}

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let user = await userService.getUser(username, password);
  if (user) {
    const userId = user._id; // get user id
    const token = jwt.sign({ id: userId }, "key");
    res.status(200).json({ userId, token });
  } else {
    res.status(404).send("Username or password is incorrect");
  }
};

const getUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  user = await userService.getUser(username,password);
  if (user) {
    res
      .status(200)
      .json(req.body.username, req.body.displayName, req.body.photo);
  } else {
    res.status(404).send("Username not found");
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.body.username;
  user = await userService.getUserByUsername(username);
  if (user) {
    res
      .status(200)
      .json(req.body.username, req.body.displayName, req.body.photo);
  } else {
    res.status(404).send("Username not found");
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;

  try {
      console.log(token);
      // Verify the token
      const decoded = jwt.verify(token, "key");
      console.log(decoded);

      // Check if the token's user id matches the requested user id
      if (decoded.id !== id) {
          res.status(403).send('Unauthorized');
          return;
      }

      const user = await userService.getUserById(id);
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      // If the token is invalid or expired, jwt.verify will throw an error
      res.status(403).send('Invalid token');
  }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const photo = req.body.photo;
    user = await userService.updateUser(id, username, password, displayName, photo);
    if (user) {
        res.status(200).json(user);
    }else{
        res.status(404).send('User not found');
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    user = await userService.deleteUser(id);
    if (user) {
        res.status(200).json(user);
    }else{
        res.status(404).send('User not found');
    }
}

module.exports = {
  createUser,
  login,
  getUserByUsername,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};