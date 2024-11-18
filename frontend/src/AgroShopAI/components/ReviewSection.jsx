
import React, { useState } from 'react';

const ReviewSection = ({ product_id,reviews, setReviews }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(""); // Manage userId as well

  const handleReviewSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Create the review object
    const reviewData = {
      product: product_id, // Replace this with the actual product ID as needed
      user: userId.trim(), // User ID from state
      rating,
      comment: reviewText.trim(), // Review text from state
    };
  
    // Check if review text, rating, and user ID are valid
    if (reviewText.trim() && rating > 0 && userId.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}api/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set the content type to JSON
          },
          body: JSON.stringify(reviewData), // Convert the review data to JSON format
        });
  
        if (response.ok) {
          // If the response is OK, update the reviews state
          const newReview = await response.json(); // Get the response data
          setReviews([...reviews, newReview]); // Update the reviews state with the new review
  
          // Clear the input fields
          setReviewText("");
          setRating(0);
          setUserId(""); // Clear user ID input after submission
        } else {
          // Handle error response
          console.error("Failed to submit review:", response.statusText);
        }
      } catch (error) {
        // Handle network errors
        console.error("Error submitting review:", error);
      }
    }
  };
  

  return (
    <div className="mt-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="space-y-4 w-full md:w-1/2">
        <div>
          <label className="block text-lg font-semibold">Your Name:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold">Your Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-lg font-semibold">Your Review:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            placeholder="Write your review here..."
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">Submit Review</button>
      </form>

      {/* Reviews List */}
      <div className="mt-6 w-full md:w-1/2">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 mb-2">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className="ml-2 text-gray-600 font-semibold">- {review.user}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
