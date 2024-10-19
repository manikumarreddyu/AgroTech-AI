import React from 'react';

const ProductCard = ({ item }) => {
  const savings = item.mrp - item.salePrice;

  return (
    <div
      className="flex-shrink-0 w-64 h-fit bg-white rounded-lg overflow-hidden relative"
      style={{
        boxShadow: `rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
                    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
                    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px`,
      }}
    >
      <div className="w-full h-48">
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover cursor-pointer"
        />
        {/* Offer Tag */}
        {item.offer && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-l-full z-10">
            {item.offer}
          </span>
        )}
      </div>

      <div className="p-4 bg-white">
        {/* Title with truncation */}
        <h3 className="text-s font-semibold text-black cursor-pointer hover:text-blue-500">
          {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
        </h3>
        <span className="text-gray-400 text-xs hover:underline cursor-pointer hover:text-blue-500">{item.brand.length > 25 ? `${item.brand.substring(0, 35)}...` : item.brand}</span>
        <div className="flex items-center">
          <p className="text-black text-m display-inline mr-2">₹{item.salePrice}</p>
          <p className="text-gray-400 text-m display-inline line-through">₹{item.mrp}</p>
        </div>
        <p className="text-green-600 text-xs font-bold">You Save: ₹{savings.toFixed(2)}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between px-4 py-3 bg-white border-t-2">
        <button className="bg-green-400 hover:bg-green-300 text-gray-800 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out shadow-sm">
          Buy Now
        </button>
        <button className="bg-orange-400 hover:bg-orange-300 text-gray-800 font-medium px-4 py-2 rounded-md transition duration-200 ease-in-out shadow-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
