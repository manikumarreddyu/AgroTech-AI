// WishlistComponent.js
import React from 'react';

const WishlistComponent = ({ wishlist }) => {
  return (
    <div>
      {wishlist.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <div>
            <p className="text-lg text-green-700">{item.name}</p>
            <p className="text-green-600">{item.price}</p>
          </div>
          <button className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300">
            Rent Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishlistComponent;
