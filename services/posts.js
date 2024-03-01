const Post = require('../models/posts');
const User = require('../models/users');
const jwt = require('jsonwebtoken'); 

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
  const post = await Post.findById(postId);
  if (!post) return null;
  await post.deleteOne();

  // find the user and update their postList
  const user = await User.findById(idUserName);
  if (user) {
    const postIndex = user.postList.indexOf(postId);
    if (postIndex > -1) {
      // remove the post from the postList
      user.postList.splice(postIndex, 1);
      // save the updated user
      await user.save();
    }
  }

  return post;
};

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

module.exports = {
  getAllPosts,
  createPost,
  deleteUserPosts,
  deletePost,
  updatedPost,
};