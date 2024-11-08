// RatingsReviewsComponent.js
import React from 'react';
import { Star, Tractor } from 'lucide-react'; // Using icons to match the agricultural theme

const RatingsReviewsComponent = ({ reviews }) => (
  <div className="bg-white p-6 rounded-lg ">
    <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
      <Tractor className="mr-2 text-green-700" /> Ratings & Reviews
    </h3>

    <ul className="space-y-6">
      {reviews.map((review, index) => (
        <li 
          key={index} 
          className="p-4 border rounded-lg shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200"
        >
          <div className="flex items-center mb-2">
            <strong className="text-green-700 mr-2">Rental ID:</strong>
            <span>{review.rentalId}</span>
          </div>
          
          <div className="flex items-center mb-2">
            <strong className="text-green-700 mr-2">Rating:</strong>
            <span className="flex items-center">
              {Array(review.rating).fill(<Star className="text-yellow-500" />)}
            </span>
          </div>

          <p className="text-gray-700">
            <strong className="text-green-700">Comment:</strong> {review.comment}
          </p>
        </li>
      ))}
    </ul>
  </div>
);

export default RatingsReviewsComponent;
