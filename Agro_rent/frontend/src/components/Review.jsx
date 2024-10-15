import React from 'react';

const Review = ({ profilePicture, name, postingTime, starRating, reviewText }) => {
  return (
    <div className="review-item flex items-center space-x-4">
      {/* Profile Picture Placeholder */}
      <div className="h-12 w-12 rounded-full bg-gray-300">
        {/* You can optionally render a profile picture here */}
        <img src={profilePicture} alt={name} className="h-full w-full rounded-full" />
      </div>
      <div>
        {/* Reviewer's Name */}
        <h4 className="text-lg font-semibold">{name}</h4>
        {/* Time of Posting */}
        <span className="text-gray-500">{postingTime}</span>
        {/* Star Ratings */}
        <div className="text-yellow-400">{starRating}</div>
        {/* Review Text */}
        <p className="text-gray-700">{reviewText}</p>
      </div>
    </div>
  );
};

export default Review;
