import React, { useState } from "react";
import { FaSearch, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for search, loading, and status

const RentOrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackOrder = () => {
    if (!orderId) return; // Avoid empty submission

    setLoading(true);
    setError(null);
    setOrderStatus(null);

    // Simulate order tracking (In a real app, you would fetch this from an API)
    const mockOrderStatus = {
      123: "Shipped - Expected delivery: 2 days",
      456: "In Transit - Expected delivery: 1 day",
      789: "Delivered - Thank you for renting!",
    };

    // Simulate an API request delay
    setTimeout(() => {
      if (mockOrderStatus[orderId]) {
        setOrderStatus(mockOrderStatus[orderId]);
      } else {
        setError("Order ID not found. Please check and try again.");
      }
      setLoading(false);
    }, 1500); // Simulate network delay
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-green-200 shadow-lg rounded-lg w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-green-600 mb-6">Order Tracking</h3>

      {/* Order ID Input */}
      <div className="mb-4 flex items-center space-x-2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Track Order Button */}
      <button
        onClick={handleTrackOrder}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
      >
        {loading ? (
          <FaSpinner className="animate-spin mx-auto" />
        ) : (
          "Track Order"
        )}
      </button>

      {/* Display Order Status */}
      {loading && <p className="text-gray-600 text-center mt-4">Tracking your order...</p>}

      {/* Error or Order Status */}
      {orderStatus && !loading && (
        <div className="mt-6 text-green-600">
          <FaCheckCircle className="inline mr-2" />
          <strong>Order Status:</strong> {orderStatus}
        </div>
      )}

      {error && !loading && (
        <div className="mt-6 text-red-600">
          <FaTimesCircle className="inline mr-2" />
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Order History Section */}
      <div className="mt-8 border-t border-gray-300 pt-6">
        <h4 className="text-lg font-semibold text-gray-800">Past Orders</h4>
        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="font-medium text-gray-700">Order ID: 123</span>
            <span className="text-green-600">Shipped - 2 days</span>
          </li>
          <li className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="font-medium text-gray-700">Order ID: 456</span>
            <span className="text-yellow-600">In Transit - 1 day</span>
          </li>
          <li className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="font-medium text-gray-700">Order ID: 789</span>
            <span className="text-green-600">Delivered - Thank you for renting!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RentOrderTracking;
