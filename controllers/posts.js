const postService = require('../services/posts');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const User = require('../models/users');

// const getAllPosts = async(req, res) => {
//     const friendId = req.params.id;
//     posts = await postService.getAllPosts(friendId);
//     if (posts) {
//         res.status(200).json(posts);
//     }else{
//         res.status(404).send('there are no posts yet');
//     }
    
// }
const getAllPosts = async(req, res) => {
    const postList = await postService.getAllPosts();
    if (postList) {
        res.status(200).json(postList);
    } else {
        res.status(404).send("Error getting posts");
    }
}

const createPost = async(req, res) => {
    const idUserName = req.params.id;
    const fullname = req.body.fullname;
    const icon = req.body.icon;
    const initialText = req.body.initialText;
    const pictures = req.body.pictures;
    const time = req.body.time;
    const commentsNumber = 0;
    const likes = 0;
    const comments = [];
    const newPost = new Post({
        idUserName,
        fullname,
        icon,
        initialText,
        pictures,
        time,
        commentsNumber,
        likes,
        comments
    });
    const post = await postService.createPost(newPost);
    if (post) {
        const user = await User.findById(idUserName);
        user.postList.push(post._id);
        await user.save();
        res.status(200).json(post);
    }
    else{
        res.status(404).send('Error creating post');
    }
}

const deletePost = async(req, res) => {
    const idUserName = req.params.id;
    const postId = req.params.pid;
    const deletedPost = await postService.deletePost(idUserName, postId);
    if (deletedPost) {
      res.status(200).send("post deleted successfully");
    } else {
      res.status(404).send("Error deleting post");
    }
}

const updatePost = async(req, res) => {

    const idUserName = req.params.id;
    const postId = req.params.pid;
    const initialText = req.body.initialText;
    const pictures = req.body.pictures;
    const updatedPost = await postService.updatedPost(
      idUserName,
      postId,
      initialText,
      pictures,
    );
    if (updatedPost) {
      res.status(200).send("post updated successfully");
    } else {
      res.status(404).send("Error updating post");
    }
}



module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
};