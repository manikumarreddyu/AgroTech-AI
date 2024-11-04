import React, { useState } from "react";

const ProductCard = ({ product, onClick }) => (
  <div
    className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
    onClick={() => onClick(product)}
  >
    <img src={product.imageUrl} alt={product.productName} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold text-green-600">{product.productName}</h3>
      <p className="text-gray-500 text-sm">{product.productType}</p>
      <p className="text-gray-700 mt-2">${product.price}</p>
      <p className="mt-2">{product.priceType}</p>
      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-md ${product.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        {product.isAvailable ? "Available" : "Unavailable"}
      </div>
    </div>
  </div>
);

export default ProductCard;
