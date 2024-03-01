const userService = require('../services/users');
const jwt = require('jsonwebtoken');
const postSevice = require('../services/posts');

const createUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const photo = req.body.photo;
    console.log("hey");
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
      // Verify the token
      const decoded = jwt.verify(token, "key");

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
const getUserByIdWithPassword = async (req, res) => {
  const id = req.params.id;
  user = await userService.getUserByIdWithPassword(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("User not found");
  }
};

const updateUser = async (req, res) => {
    console.log("hey");
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const photo = req.body.photo;
    user = await userService.updateUser(id,username, password, displayName, photo);
    if (user !== null) {
        res.status(200).send('User updated successfully');
    }else{
        res.status(404).send('User not found / Username already exists');
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    await postSevice.deleteUserPosts(id);
    isDeleted = await userService.deleteUser(id);
    if (isDeleted) {
        res.status(200).send('User deleted successfully');
    }else{
        res.status(404).send('User not found');
    }
}

const getAllFriends = async (req, res) => {
  const id = req.params.id;
  const friends = await userService.getAllFriends(id);
  if (friends) {
    res.status(200).json(friends);
  } else {
    res.status(404).send("User not found");
  }
}

const addFriend = async (req, res) => {
  const id = req.params.id;
  const friendId = req.body.friendId;
  const friend = await userService.addFriend(id, friendId);
  if (friend) {
    res.status(200).send("Friend added successfully");
  } else {
    res.status(404).send("Error adding friend");
  }
};
module.exports = {
  createUser,
  login,
  getUserByUsername,
  getUser,
  getUserById,
  getUserByIdWithPassword,
  updateUser,
  deleteUser,
  getAllFriends,
  addFriend,
};