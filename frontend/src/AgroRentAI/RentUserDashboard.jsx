import React, { useState, useEffect } from 'react';
import { Star, Trash } from 'lucide-react';

const RentUserDashboard = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethods: [],
  });

  const [rentals, setRentals] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Fetch user data, rentals, wishlist, and reviews
  useEffect(() => {
    const fetchData = async () => {
      // Mock API calls
      const userData = await fetchUserProfile();
      const rentalData = await fetchUserRentals();
      const wishlistData = await fetchUserWishlist();
      const reviewData = await fetchUserReviews();

      setProfile(userData);
      setRentals(rentalData);
      setWishlist(wishlistData);
      setReviews(reviewData);
    };

    fetchData();
  }, []);

  // Mock API calls
  const fetchUserProfile = async () => {
    // Replace with actual API call
    return {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, Springfield, USA',
      paymentMethods: ['Visa **** 1234', 'Mastercard **** 5678'],
    };
  };

  const fetchUserRentals = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'Tractor', duration: '5 days', cost: '$150', status: 'Active' },
      { id: 2, name: 'Plow', duration: '2 days', cost: '$80', status: 'Pending' },
      { id: 3, name: 'Seeder', duration: '1 week', cost: '$200', status: 'Completed' },
    ];
  };

  const fetchUserWishlist = async () => {
    // Replace with actual API call
    return [
      { id: 1, name: 'Rototiller', price: '$300' },
      { id: 2, name: 'Lawn Mower', price: '$200' },
    ];
  };

  const fetchUserReviews = async () => {
    // Replace with actual API call
    return [
      { rentalId: 3, rating: 5, comment: 'Excellent equipment!' },
    ];
  };

  const handleCancelRental = (id) => {
    // Implement rental cancellation logic
    setRentals(rentals.filter(rental => rental.id !== id));
  };

  const handleReviewSubmission = (rentalId, review) => {
    setReviews([...reviews, review]);
    // Implement review submission logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900 mb-8 mt-16">User Dashboard</h1>

      {/* Profile Management Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Profile Management</h2>
        <p className="text-green-700"><strong>Name:</strong> {profile.name}</p>
        <p className="text-green-700"><strong>Email:</strong> {profile.email}</p>
        <p className="text-green-700"><strong>Address:</strong> {profile.address}</p>
        <h3 className="text-lg font-medium mt-4 text-green-700">Payment Methods</h3>
        <ul className="list-disc list-inside text-green-600 mb-4">
          {profile.paymentMethods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
        <button className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300">Edit Profile</button>
      </div>

      {/* My Rentals Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">My Rentals</h2>
        <div>
          {rentals.map(rental => (
            <div key={rental.id} className="flex justify-between items-center border-b py-4">
              <div>
                <p className="text-lg text-green-700">{rental.name}</p>
                <p className="text-green-600">{rental.duration} - {rental.cost}</p>
                <p className="text-green-600">{rental.status}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleCancelRental(rental.id)}
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
                >
                  <Trash className="inline w-4 h-4 mr-1" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Items / Wishlist Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Saved Items / Wishlist</h2>
        <div>
          {wishlist.length === 0 ? (
            <p className="text-green-600 text-center">No saved items in your wishlist.</p>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div>
                  <p className="text-lg text-green-700">{item.name}</p>
                  <p className="text-green-600">{item.price}</p>
                </div>
                <button className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300">Rent Now</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Submissions Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl text-center text-green-500 font-bold mb-4">Review Submissions</h2>
        <div>
          {rentals.map(rental => (
            <div key={rental.id} className="flex justify-between items-center border-b py-4">
              <div>
                <p className="text-lg text-green-700">{rental.name}</p>
                {reviews.find(review => review.rentalId === rental.id) ? (
                  <p className="text-green-600">You have reviewed this rental.</p>
                ) : (
                  <button
                    onClick={() => handleReviewSubmission(rental.id, { rentalId: rental.id, rating: 5, comment: 'Great product!' })}
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
                  >
                    Leave a Review
                  </button>
                )}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-green-600">{reviews.find(review => review.rentalId === rental.id)?.rating || 'No rating'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentUserDashboard;
