import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from the API based on productId
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/${productId}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h3>Reviews</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
