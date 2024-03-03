const Post = require('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken'); 
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// const getAllPosts = async (friendId) =>{
//     try {
//         return await Post.findById({ friendId}).exec();
//       } catch (error) {
//         res.status(404).send(error);
//       }
// };
const getAllPosts = async () => {
    return await Post.find({});
}

const createPost = async (newPost) => {
    return await newPost.save();
}

const deleteUserPosts = async (userId) => {
    return await Post.deleteMany({ idUserName: userId });
}

const deletePost = async (idUserName, postId) => {
  const postIdObj = new ObjectId(String(postId));
  const post = await Post.findById(postIdObj);
  if (!post) return null;

  // Remove the post from the likes of users who liked it
  await User.updateMany({ likes: postIdObj }, { $pull: { likes: postIdObj } });

  await post.deleteOne();

  // Find the user and update their postList
  const user = await User.findById(idUserName);
  if (user) {
    const postIndex = user.postList.indexOf(postIdObj);
    if (postIndex > -1) {
      // Remove the post from the postList
      user.postList.splice(postIndex, 1);
      // Save the updated user
      await user.save();
    }
  }
  return post;
}

const updatedPost = async(
  idUserName,
  postId,
  initialText,
  pictures,
) => {
    const post = await Post.findById(postId);
    if (!post) return null;
    post.idUserName = idUserName;
    if(initialText)
      post.initialText = initialText;
    post.pictures = pictures;
    return await post.save();  
}
const updateUserPosts = async (userId, update) => {
  await Post.updateMany({ idUserName: userId }, { $set: update });
}

const getAllPostsByUserId = async (userId) => {
  return await Post.find({ idUserName: userId }).sort({ time: -1 });
}




const addLikeOrRemoveLike = async (userId, postId) => {
  const userIdObj = new ObjectId(String(userId));
  const postIdObj = new ObjectId(String(postId));

  const post = await Post.findById(postIdObj);
  if (!post) return null;
  const user = await User.findById(userIdObj);
  if (!user) return null;

  if (post.likes.includes(userIdObj)) {
    post.likes = post.likes.filter((like) => !like.equals(userIdObj));
    user.likes = user.likes.filter((like) => !like.equals(postIdObj));
  } else {
    post.likes.push(userIdObj);
    user.likes.push(postIdObj);
  }

  await post.save();
  await user.save();
  return post;
}

const deleteUserLikes = async (userId) => {
  const userIdObj = new ObjectId(userId);
  return await Post.updateMany({ likes: userIdObj }, { $pull: { likes: userIdObj } });
}

module.exports = {
  getAllPosts,
  createPost,
  deleteUserPosts,
  deletePost,
  updatedPost,
  updateUserPosts,
  getAllPostsByUserId,
  addLikeOrRemoveLike,
  deleteUserLikes
};