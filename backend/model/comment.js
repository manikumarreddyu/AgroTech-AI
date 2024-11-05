// models/Comment.js

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (farmer)
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);
