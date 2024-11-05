// models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  images: [{ type: String }], // Array to store URLs for uploaded images
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (farmer)
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of references to Comment model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
