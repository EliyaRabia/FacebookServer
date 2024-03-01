const Post = require('../models/posts');
const jwt = require('jsonwebtoken'); 

const getAllPosts = async (friendId) =>{
    try {
        return await Post.findById({ friendId}).exec();
      } catch (error) {
        res.status(404).send(error);
      }
};

const createPost = async (newPost) => {
    return await newPost.save();
}

const deleteUserPosts = async (userId) => {
    return await Post.deleteMany({ idUserName: userId });
}

module.exports = {
    getAllPosts,
    createPost,
    deleteUserPosts
};