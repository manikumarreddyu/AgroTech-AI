// RentalHistoryComponent.js
import React from 'react';
import { Trash } from 'lucide-react';

const RentalHistoryComponent = ({ rentals, handleCancelRental }) => {
  return (
    <div>
      {rentals.map(rental => (
        <div key={rental.id} className="flex justify-between items-center border-b py-4">
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
      ))}
    </div>
  );
};

export default RentalHistoryComponent;
