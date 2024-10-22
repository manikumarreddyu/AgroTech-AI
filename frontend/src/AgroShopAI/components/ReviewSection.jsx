// ReviewSection.js
import React, { useState } from 'react';

const ReviewSection = () => {
  // Default reviews with user IDs
  const [reviews, setReviews] = useState([
    { text: "Great product! Helped my crops thrive.", rating: 5, userId: "User123" },
    { text: "Good quality, but shipping took a while.", rating: 4, userId: "AgriExpert" },
    { text: "Not satisfied with the results.", rating: 2, userId: "FarmGuy" }
  ]);
  
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() && rating > 0 && userId.trim()) {
      setReviews([...reviews, { text: reviewText, rating, userId }]);
      setReviewText("");
      setRating(0);
    }
  };

  return (
    <div className="mt-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold">Your Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="0">Select a rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit Review</button>
      </form>

      {/* Reviews List */}
      <div className="mt-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4 mb-2">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className="ml-2 text-gray-600 font-semibold">- {review.userId}</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
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
