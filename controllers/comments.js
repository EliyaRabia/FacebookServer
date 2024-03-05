const postService = require('../services/posts');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const User = require('../models/users');
const userService = require('../services/users');
const commentService = require('../services/comments');

const addComment = async(req, res) => {
    const idUserName = req.params.id;
    const idPost = req.params.pid;
    const fullname = req.body.fullname;
    const icon = req.body.icon;
    const text = req.body.text;
    const newComment = {
        idUserName,
        fullname,
        idPost,
        icon,
        text,
    };
    const comment = await commentService.addComment(idPost, newComment, idUserName);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(404).send("Error adding comment");
    }
}

const getCommentsByPostId = async(req, res) => {
    const postId = req.params.pid;
    const post = await Post.findById(postId)
    if (!post) {
        res.status(404).send("Post not found");
        return;
    }
    const comments = await commentService.getComments(postId);
    if (comments) {
        res.status(200).json(comments);
    } else {
        res.status(404).send("Error getting comments");
    }
}

const updateComment = async(req, res) => {
    const commentId = req.params.cid;
    const text = req.body.text;
    const comment = await commentService.updateComment(commentId, text);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(404).send("Error updating comment");
    }
}

const deleteComment = async(req, res) => {
    const commentId = req.params.cid;
    const comment = await commentService.deleteComment(commentId);
    if (comment) {
        res.status(200).json(comment);
    } else {
        res.status(404).send("Error deleting comment");
    }
}

module.exports = {
    addComment,getCommentsByPostId,updateComment,deleteComment
};