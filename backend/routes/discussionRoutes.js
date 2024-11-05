// routes/discussionRoutes.js

const express = require('express');
const { createPost, addComment, getPostsWithComments,getSinglePostWithComments } = require('../controllers/discussionController');
const router = express.Router();

// Route to create a new post
router.post('/posts', createPost);

// Route to add a comment to a post
router.post('/posts/:postId/comments', addComment);

// Route to retrieve all posts with their comments
router.get('/posts', getPostsWithComments);

router.get('/post/:postId', getSinglePostWithComments);


module.exports = router;
