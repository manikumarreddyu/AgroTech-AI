import React, { useState } from "react";

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);

  // Helper function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) {
      // Limit file size to 5MB
      setImage(file);
    } else {
      setError("Image size exceeds 5MB");
    }
  };

  // Helper function for validation
  const validateForm = () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return false;
    }
    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error and success messages
    setError("");
    setSuccess("");

    // Validate the form
    if (!validateForm()) return;

    setLoading(true);

    const reviewData = {
      productId,
      rating,
      comment,
      image,
    };

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();
      onReviewSubmit(newReview);

      // Reset form after successful submission
      setRating(1);
      setComment("");
      setImage(null);
      setSuccess("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Clear error and success messages after 5 seconds
  const clearMessages = () => {
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
  };

  // Clear messages when form changes
  React.useEffect(() => {
    clearMessages();
  }, [comment, rating, image]);

  return (
    <div className="review-form">
      <h3>Write a Review</h3>

      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Display success message */}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Rating selection */}
        <div>
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-select"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        {/* Comment text area */}
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            placeholder="Write your review here..."
            className="comment-textarea"
          />
        </div>

        {/* Image upload */}
        <div>
          <label>Upload an Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />
          {image && <p>Image selected: {image.name}</p>}
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {/* Additional information */}
      <div className="form-footer">
        <p>
          By submitting a review, you agree to our{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>
          .
        </p>
        <p>
          Your review may take a few minutes to appear on the page after
          submission.
        </p>
      </div>
    </div>
  );
};

export default ReviewForm;
