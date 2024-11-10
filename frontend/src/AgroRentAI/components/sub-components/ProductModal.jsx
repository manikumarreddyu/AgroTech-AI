import React from "react";

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="bg-white p-8 rounded-lg max-w-lg mx-auto text-center shadow-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-red-500"
      >
        &times;
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-bold text-green-600">${product.price} per day</p>
      
      <div className="mt-4">
        <button
          onClick={onClose}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
