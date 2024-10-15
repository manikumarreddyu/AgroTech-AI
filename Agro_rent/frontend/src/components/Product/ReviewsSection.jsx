import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const ReviewsSection = ({ machineId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    comment: '',
    reviewId: '' // Store review ID for editing
  });
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if editing a review

  // Fetch reviews from the backend
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/review/all`, { params: { machineId } });
      setReviews(response.data.reviews);
    } catch (err) {
      setError('Failed to fetch reviews.');
    }
  };

  useEffect(() => {
    fetchReviews(); // Fetch reviews when the component mounts
  }, [machineId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update review if editing
        const response = await axios.put(`${BASE_URL}/api/review`, {
          reviewId: formData.reviewId,
          comment: formData.comment,
          rating: formData.rating,
        });

        // Update reviews state with edited review
        const updatedReviews = reviews.map((review) =>
          review._id === response.data.updatedReview._id ? response.data.updatedReview : review
        );
        setReviews(updatedReviews);
      } else {
        // Create new review
        const response = await axios.post(`${BASE_URL}/api/review`, {
          ...formData,
          machineId,
        });
        // Update reviews state with new review
        setReviews([...reviews, response.data.createdReview]);
      }
      // Clear form data
      setFormData({
        name: '',
        email: '',
        rating: '',
        comment: '',
        reviewId: '' // Reset reviewId
      });
      setIsEditing(false); // Reset editing state
      fetchReviews();
      window.location.reload();
    } catch (err) {
      setError('Failed to submit review.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (review) => {
    setFormData({
      name: review.userId?.name || '',
      email: review.userId?.email || '',
      rating: review.rating,
      comment: review.comment,
      reviewId: review._id // Set reviewId for editing
    });
    setIsEditing(true); // Set editing state
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${BASE_URL}/api/review`, { data: { reviewId } });
      // Update reviews state to remove the deleted review
      setReviews(reviews.filter((review) => review._id !== reviewId));
      window.location.reload();
      fetchReviews();
    } catch (err) {
      setError('Failed to delete review.');
    }
  };

  return (
    <div className='p-10'>
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}
      {/* Display previous reviews */}
      <div className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded mb-2 shadow-sm shadow-zinc-500">
              <p className="text-lg font-semibold">{review.userId?.name || 'Anonymous'}</p>
              <p className="text-gray-600">{review.userId?.email}</p>
              <p className="text-gray-600">Rating: {review.rating}</p>
              <p className="text-gray-600">{review.comment}</p>
              <Button onClick={() => handleEdit(review)} color="primary">Edit</Button>
              <Button onClick={() => handleDelete(review._id)} color="secondary">Delete</Button>
            </div>
          ))
        ) : (
          <p>No reviews available. Be the first to review!</p>
        )}
      </div>

      {/* Review form */}
      <h2 className='text-2xl font-bold mb-4'>{isEditing ? 'Edit Review' : 'Add a Review:'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div className="mb-4">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div className="mb-4">
          <TextField
            id="rating"
            name="rating"
            label="Rating"
            variant="standard"
            type="number"
            value={formData.rating}
            onChange={handleChange}
            inputProps={{ min: "1", max: "5" }}
            required
            fullWidth
          />
        </div>
        <div className="mb-4">
          <TextField
            id="comment"
            name="comment"
            label="Comment"
            variant="standard"
            multiline
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Review' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewsSection;
