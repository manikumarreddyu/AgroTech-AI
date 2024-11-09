
import React, { useState, useEffect } from "react";

export default function ProductCard({ product, onQuickBuy }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(product.endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(product.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [product.endTime]);

  function calculateTimeLeft(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return { total, hours, minutes, seconds };
  }

  function calculateDiscount(original, discounted) {
    return Math.round(((original - discounted) / original) * 100);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.brand}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold text-green-600">
            ${product.discountedPrice.toFixed(2)}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded mb-2">
          {calculateDiscount(product.originalPrice, product.discountedPrice)}% OFF
        </div>
        <div className="text-sm text-gray-600 mb-4">
          Ends in: {formatTime(timeLeft.hours)}:
          {formatTime(timeLeft.minutes)}:
          {formatTime(timeLeft.seconds)}
        </div>
        <button
          onClick={() => onQuickBuy(product)}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Quick Buy
        </button>
      </div>
    </div>
  );
}
