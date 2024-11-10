import React, { useState } from "react";

const PriceCalculator = () => {
  const [quantity, setQuantity] = useState(1);
  const [duration, setDuration] = useState("daily");
  const [discountCode, setDiscountCode] = useState("");
  const [currency, setCurrency] = useState("USD");

  const pricePerDay = 50; // Base price per day for simplicity

  // Price calculation based on duration
  const durations = {
    hourly: 5,
    daily: 50,
    weekly: 300,
    monthly: 1200,
  };

  const calculatePrice = () => {
    let totalPrice = durations[duration] * quantity;
    
    // Applying a discount code (example logic)
    if (discountCode === "DISCOUNT10") {
      totalPrice *= 0.9; // Apply a 10% discount
    }

    // Adding currency conversion (just for demonstration)
    if (currency === "EUR") {
      totalPrice *= 0.85; // Conversion rate from USD to EUR
    }

    return totalPrice.toFixed(2);
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-2xl max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Price Calculator</h3>

      <div className="space-y-4">
        {/* Horizontal Flex Container for Fields */}
        <div className="flex space-x-8 items-center">
          {/* Quantity Field */}
          <div className="w-1/4">
            <label className="block text-lg font-medium mb-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full p-3 rounded-lg border-2 border-green-500"
              placeholder="Enter quantity"
            />
          </div>

          {/* Duration Field */}
          <div className="w-1/4">
            <label className="block text-lg font-medium mb-2">Duration:</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-green-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Discount Code Field */}
          <div className="w-1/4">
            <label className="block text-lg font-medium mb-2">Discount Code (Optional):</label>
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-green-500"
              placeholder="Enter discount code"
            />
          </div>

          {/* Currency Selector */}
          <div className="w-1/4">
            <label className="block text-lg font-medium mb-2">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-green-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Base Price:</span>
            <span>{`${durations[duration]} per ${duration}`}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Quantity:</span>
            <span>{quantity}</span>
          </div>
          {discountCode && discountCode === "DISCOUNT10" && (
            <div className="flex justify-between text-green-600 font-medium mb-2" >
              <span>Discount Applied:</span>
              <span>-10%</span>
            </div>
          )}
          <div className="border-t-2 border-gray-200 my-4"></div>
          <div className="flex justify-between text-xl font-semibold text-green-600">
            <span>Total Price:</span>
            <span>{currency === "USD" ? `$${calculatePrice()}` : `€${calculatePrice()}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
