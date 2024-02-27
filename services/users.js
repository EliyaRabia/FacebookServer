const User = require('../models/users');
const jwt = require('jsonwebtoken');

const createUser = async (username, password, displayName, photo) => {
  const user = new User({
    username,
    password,
    displayName,
    photo,
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
    
const updateUser = async (id, username, password, displayName, photo) => {
  const user = await getUserById(id);
  if (!user)
   return null;
  user.username = username;
  user.password = password;
  user.displayName = displayName;
  user.photo = photo;
  await user.save();
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) 
    return null;
  await user.deleteOne();
  return user;
};



module.exports = { createUser, getUser, getUserByUsername, getUserById,updateUser,deleteUser };