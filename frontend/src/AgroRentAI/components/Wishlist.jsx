// WishlistComponent.js
import React, { useEffect, useState } from 'react';

const WishlistComponent = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/wishlist?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await response.json();
        setWishlist(data.wishlist);
      } catch (error) {
        setError('Error fetching wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
        <span className="mr-2">🌱</span> Saved Items / Wishlist
      </h3>
      <p className="text-gray-700 mb-4">Items you’ve saved for later rental.</p>

      <div className="space-y-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm bg-green-50 hover:bg-green-100 transition-colors duration-200 flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-semibold text-green-600">{item.name}</h4>
                <p className="text-gray-700">{item.price}</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
                Rent Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-green-700">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistComponent;
