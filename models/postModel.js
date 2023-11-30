const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxLength: 1000 },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 255 },
  content: { type: String, required: true, maxLength: 5000 },
  author: { type: String, required: true },
  tags: [{ type: String, maxLength: 50 }],
  comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
