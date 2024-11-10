import React from 'react';

const ReviewItem = ({ review }) => {
  const { userName, rating, comment, createdAt } = review;

  return (
    <li className="review-item">
      <div className="review-header">
        <strong>{userName}</strong>
        <span className="review-rating">{'★'.repeat(rating)}</span>
      </div>
      <p>{comment}</p>
      <small>Reviewed on {new Date(createdAt).toLocaleDateString()}</small>
    </li>
  );
};

export default ReviewItem;
