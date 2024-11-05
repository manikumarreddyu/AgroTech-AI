// controllers/discussionController.js

const Post = require("../model/post");
const Comment = require("../model/comment");
const User = require("../model/user");

// Controller to create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, images, author } = req.body;
    // const author = req.user._id; // Assuming user is authenticated

    const post = new Post({
      content,
      images,
      author,
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Controller to add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    // const author = req.user._id;
    const { postId } = req.params;

    const comment = new Comment({
      content,
      author,
      post: postId,
    });

    await comment.save();

    // Add comment to the post's comments array
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Controller to retrieve all posts with their comments
exports.getPostsWithComments = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName")
      .populate({
        path: "comments",
        populate: { path: "author", select: "firstName lastName" },
      })
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

exports.getSinglePostWithComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("author", "firstName lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "firstName lastName",
        },
      });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post with comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};
