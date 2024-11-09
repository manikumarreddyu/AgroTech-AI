// QuickBuyModal.js
import React from "react";

export default function QuickBuyModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Quick Buy</h2>
        <p className="mb-4">
          You are about to buy: <strong>{product.name}</strong> for $
          {product.discountedPrice.toFixed(2)}
        </p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
