const postService = require('../services/posts');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const User = require('../models/users');

const getAllPosts = async(req, res) => {
    const friendId = req.params.id;
    posts = await postService.getAllPosts(friendId);
    if (posts) {
        res.status(200).json(posts);
    }else{
        res.status(404).send('there are no posts yet');
    }
    
}

const createPost = async(req, res) => {
    const idUserName = req.params.id;
    console.log(idUserName);
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

module.exports = {
    getAllPosts,
    createPost
};