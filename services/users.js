const User = require('../models/users');
const jwt = require('jsonwebtoken');

const createUser = async (username, password, displayName, photo) => {
  const user = new User({
    username,
    password,
    displayName,
    photo,
    postList: [],
    friendsList: [],
    friendRequests: [],
    friendRequestsSent: []
  });
  try {
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (username, password) => {
  try {
    return await User.findOne({ username, password }).exec();
  } catch (error) {
    res.status(404).send(error);
  }
};

const getUserByUsername = async (username) => {
  try {
    return await User.findOne({ username }).exec();
  } catch (error) {
    res.status(404).send(error);
    return null;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id).select('-password').exec();
  } catch (error) {
    res.status(404).send(error);
    return null;
  }
};

const getUserByIdWithPassword = async (id) => {
  try {
    return await User.findById(id).exec();
  } catch (error) {
    res.status(404).send
    return null;
  }
}

const updateUser = async (id, username, password, displayName, photo) => {
  const user = await getUserByIdWithPassword(id);
  if (!user) 
    return null;
  if (username !== user.username) {
    const userExists = await getUserByUsername(username);
    if (userExists) 
      return null;
    Object.assign(user, { username });
  }
  if (password !== user.password && password !== "" && password !== undefined && password !== null) {
    Object.assign(user, { password });
  }
  if (displayName !== user.displayName) {
    Object.assign(user, { displayName });
  }
  if (photo !== user.photo && photo !== "" && photo !== undefined && photo !== null) {
    Object.assign(user, { photo });
  }
  return await user.save();
};


const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) 
    return null;
  await user.deleteOne();
  return true;
};

const getAllFriends = async (id) => {
  const user = await getUserById(id);
  if (!user) 
    return null;
  const friends = [];
  for (let i = 0; i < user.friendsList.length; i++) {
    const friend = await getUserById(user.friendsList[i]);
    friends.push(friend);
  }
  return friends;
}

const addFriend = async (id, friendId) => {
  const user = await getUserById(id);
  if (!user) 
    return null;
  const friend = await getUserById(friendId);
  if (!friend) 
    return null;
  user.friendRequests.push(friend.username);
  friend.friendRequestsSent.push(user.username);
  await user.save();
  await friend.save();
  return friend;
}


module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
  getUserByIdWithPassword,
  getAllFriends,
  addFriend,
};