import React from 'react';
import Review from './Review';

const reviews = [
    {
      profilePicture: '../src/assets/avatar.jpg',
      name: 'Ramu',
      postingTime: '3d ago',
      starRating: '★★★★☆',
      reviewText: 'Nulla laboris fugiat fugiat minim…',
    },
    {
        profilePicture: '../src/assets/avatar.jpg',
        name: 'Ravi',
        postingTime: '3d ago',
        starRating: '★★★★☆',
        reviewText: 'Nulla laboris fugiat fugiat minim…',
      },
      {
        profilePicture: '../src/assets/avatar.jpg',
        name: 'Srinu',
        postingTime: '3d ago',
        starRating: '★★★★☆',
        reviewText: 'Nulla laboris fugiat fugiat minim…',
      },
      {
        profilePicture: '../src/assets/avatar.jpg',
        name: 'Saidulu',
        postingTime: '3d ago',
        starRating: '★★★★☆',
        reviewText: 'Nulla laboris fugiat fugiat minim…',
      }
    // Add more review objects as needed
  ];

const Reviewscard = () => {
  return (
    
    <div className="container mx-auto h-full py-8">
      {/* Header Section */}
      <div className="section mb-6">
        {/* Title */}
        <h2 className="text-2xl font-bold">Reviews</h2>
        {/* Star Rating and Total Number of Reviews */}
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2">4.20 stars</span>
          <span className="text-gray-500">(99 reviews)</span>
        </div>
      </div>

      {/* Individual Review Items */}
<div className="section grid grid-cols-2 space-y-6">
        {/* Render each review using the Review component */}
        {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>

      {/* Show All Reviews Link */}
      <div className="show-all-reviews text-right">
        <a href="#" className="text-blue-500 hover:underline">Show all reviews</a>
      </div>
    </div>
  );
};

export default Reviewscard;
