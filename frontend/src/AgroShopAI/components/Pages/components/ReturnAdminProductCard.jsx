import React from "react";

export default function ReturnProductCard({ product, handleReturn }) {
  return (
    <div className="border p-4 rounded shadow-lg bg-white">
      <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.model}</p>
      <div className="mt-4 flex justify-between">
        <span className="text-sm text-gray-500">Status: {product.status}</span>
        <button
          onClick={() => handleReturn(product)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Return
        </button>
      </div>
    </div>
  );
}
