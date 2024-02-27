const Post = require('../models/posts');
const jwt = require('jsonwebtoken'); 

const getAllPosts = async (friendId) =>{
    try {
        return await Post.findById({ friendId}).exec();
      } catch (error) {
        res.status(404).send(error);
      }

};