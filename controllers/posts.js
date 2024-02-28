const postService = require('../services/posts');
const jwt = require('jsonwebtoken');

const getAllPosts = async(req, res) => {
    const friendId = req.params.id;
    posts = await postService.getAllPosts(friendId);
    if (posts) {
        res.status(200).json(posts);
    }else{
        res.status(404).send('there are no posts yet');
    }
    
}
module.exports = {
    getAllPosts
};