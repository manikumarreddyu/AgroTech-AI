import React, { useState, useEffect } from "react";
import axios from "axios";


const DiscussionPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null); // For handling success/error messages

  const ApiUrl = process.env.NODE_ENV === "production"
    ? "https://yourapiurl.com"
    : "http://localhost:8080";

  // Fetch posts with comments
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/discussions/posts`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
        setAlert({ type: "error", message: "Failed to load posts." });
      }
    };

    fetchPosts();
  }, []);

  // Handle creating a new post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        content: newPostContent,
        images: [], // Placeholder for images
        author: "6725ba1d61742ceab8724142", // Replace with the current user's ID
      };

      const response = await axios.post(`${ApiUrl}/api/discussions/posts`, newPost);
      setPosts((prevPosts) => [response.data.post, ...prevPosts]); // Add new post without reload
      setNewPostContent(""); // Clear input field
      setAlert({ type: "success", message: "Post created successfully!" });
    } catch (error) {
      console.error("Error creating post:", error);
      setAlert({ type: "error", message: "Failed to create post." });
    }
  };

  // Handle creating a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        content: newCommentContent,
        author: "6728e52174915a9964fecf5a", // Replace with current user's ID
      };

      const response = await axios.post(
        `${ApiUrl}/api/discussions/posts/6729c51729c24c5b6589b8ac/comments`,
        newComment
      );

      // Update comments of the selected post
      setPosts((prevPosts) => {
        return prevPosts.map((post) =>
          post._id === selectedPostId
            ? { ...post, comments: [response.data.comment, ...post.comments] }
            : post
        );
      });

      setNewCommentContent(""); // Clear comment input field
      setSelectedPostId(null); // Close comment form
      setAlert({ type: "success", message: "Comment added successfully!" });
    } catch (error) {
      console.error("Error adding comment:", error);
      setAlert({ type: "error", message: "Failed to add comment." });
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`${ApiUrl}/api/discussions/posts/${postId}/comments/${commentId}`);

      // Remove deleted comment from the post's comments array
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment._id !== commentId) }
            : post
        )
      );
      setAlert({ type: "success", message: "Comment deleted successfully!" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      setAlert({ type: "error", message: "Failed to delete comment." });
    }
  };

  // Handle closing the alert
  const handleAlertClose = () => {
    setAlert(null); // Clear the alert state when the user clicks the cancel button
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading posts...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100">
        <div className="discussion-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 ">
      <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Discussion Forum</h1>

      {/* Alert Message with Close Button */}
      {alert && (
        <div className={`alert ${alert.type === "error" ? "bg-red-500" : "bg-green-500"} text-white p-4 rounded mb-6 flex justify-between items-center`}>
          <span>{alert.message}</span>
          <button
            onClick={handleAlertClose}
            className="text-white font-semibold hover:text-gray-300 ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Create a new post */}
      <div className="new-post mb-12 bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Create a New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <textarea
            className="w-full p-4 border border-green-300 rounded-md mb-4"
            placeholder="What's on your mind?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
          >
            Post
          </button>
        </form>
      </div>

      {/* Display posts */}
      <div className="posts-list space-y-8 ">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post bg-white rounded-lg shadow-lg p-6 bg-gradient-to-b from-green-100 to-green-200">
              <div className="post-header mb-6">
                <h3 className="text-2xl font-bold text-green-800">{post.author.firstName} {post.author.lastName}</h3>
                <p className="text-sm text-green-600">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
              <div className="post-content mb-6">
                <p className="text-lg">{post.content}</p>
              </div>

              {/* Display comments */}
              {selectedPostId === post._id && (
                <div className="comments-section mb-6">
                  <h4 className="text-xl font-semibold text-green-700">Comments:</h4>
                  {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment._id} className="comment p-4 bg-gray-50 mb-4 rounded-lg shadow-sm flex justify-between items-start">
                      <div>
                        <p className="text-sm text-green-600">
                          {comment.author.firstName} {comment.author.lastName}
                        </p>
                        <p className="text-md">{comment.content}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(post._id, comment._id)}
                        className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                      >
                        Delete Comment
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}

                </div>
              )}

              {/* Add comment form */}
              {selectedPostId === post._id ? (
                <form onSubmit={handleCommentSubmit} className="comment-form mt-6">
                  <textarea
                    className="w-full p-4 border border-green-300 rounded-md mb-4"
                    placeholder="Write a comment..."
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                    rows="4"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
                  >
                    Post Comment
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSelectedPostId(post._id)}
                  className="text-green-600 mt-4 hover:text-green-800"
                >
                  Add a comment
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
    </div>
  
  );
};

export default DiscussionPage;
