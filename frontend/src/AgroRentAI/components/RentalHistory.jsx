// RentalHistoryComponent.js
import React, { useState, useEffect } from 'react';
import { Trash, Star } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const RentalHistoryComponent = () => {
  const [rentals, setRentals] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});

  // API base URL
  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';


  useEffect(() => {
    // Fetch rental data - replace with API call or mock data
    setRentals([
      { id: '1', name: 'Tractor Rental', duration: '3 days', cost: '$200', status: 'Completed', productId: '123' },
      { id: '2', name: 'Plough Rental', duration: '2 days', cost: '$150', status: 'Completed', productId: '456' },
      { id: '2', name: 'Plough Rental', duration: '2 days', cost: '$150', status: 'Completed', productId: '456' },
      // Add more rental data as needed
    ]);
  }, []);

  // Handle rating and comment changes
  const handleRatingChange = (id, value) => setRatings({ ...ratings, [id]: value });
  const handleCommentChange = (id, value) => setComments({ ...comments, [id]: value });

  // Submit rating to the backend
  const handleSubmitRating = async (rental) => {
    const { id: rentalId, productId } = rental;
    const rating = ratings[rentalId];
    const comment = comments[rentalId];
  
    if (!rating) {
      toast.error('Please provide a rating.');
      return;
    }
  
    try {
      const response = await fetch(`${ApiUrl}/api/products/${productId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentalId,
          rating,
          comment,
          userEmail: 'example@gmail.com', // Replace with actual user email
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Review submitted successfully!');
      } else {
        toast.error(data.message || 'Error submitting review.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Error submitting rating.');
    }
  };

  // Cancel rental handler
  const handleCancelRental = (rentalId) => {
    console.log(`Rental ${rentalId} canceled`);
  };

  return (
    <div>
      <ToastContainer/>
      <h1 className='text-2xl text-green-900 font-bold'>Your Rental History</h1>
      {rentals.map(rental => (
        <div key={rental.id} className="flex flex-col border-b py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg text-green-700">{rental.name}</p>
              <p className="text-green-600">{rental.duration} - {rental.cost}</p>
              <p className="text-green-600">{rental.status}</p>
            </div>
            <button
              onClick={() => handleCancelRental(rental.id)}
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300">
              <Trash className="inline w-4 h-4 mr-1" /> Cancel
            </button>
          </div>

          {/* Rating Input */}
          <div className="mt-4">
            <p className="text-green-700 font-semibold">Rate this rental:</p>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${ratings[rental.id] >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(rental.id, star)}
                />
              ))}
            </div>

            <textarea
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="Leave a comment..."
              value={comments[rental.id] || ''}
              onChange={e => handleCommentChange(rental.id, e.target.value)}
            />

            <button
              onClick={() => handleSubmitRating(rental)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors duration-300">
              Submit Rating
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalHistoryComponent;
