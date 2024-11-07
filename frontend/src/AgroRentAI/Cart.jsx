import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import './index.css';
import { OrderSummary, PromoCodeInput } from '../AgroShopAI/components/CartComponents';

const RentCartPage = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(10); // Example flat shipping cost
  const [taxRate, setTaxRate] = useState(0.08); // Example tax rate of 8%
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      name: "Tractor",
      description: "High-power tractor suitable for plowing and heavy-duty farm work.",
      price: 200,
      image: "https://example.com/images/tractor.jpg",
      rating: 4.5,
      category: ["Machinery", "Farming Equipment"],
      available: true,
      deliveryEstimate: "2-4 days",
    },
    {
      id: 2,
      name: "Rotary Tiller",
      description: "Efficient tiller for preparing the soil for planting, suitable for medium-sized farms.",
      price: 75,
      image: "https://example.com/images/rotary-tiller.jpg",
      rating: 4.3,
      category: ["Machinery", "Soil Preparation"],
      available: false,
      deliveryEstimate: "N/A",
    },
    {
        name: "Seed Planter",
        description: "Automatic seed planter for precise and efficient planting.",
        price: 90,
        image: "https://example.com/images/seed-planter.jpg",
        rating: 4.2,
        category: ["Machinery", "Planting"],
      },
  
  ];

  const recommendedItems = [
    {
      name: "Fertilizer Spreader",
      description: "Compact spreader for distributing fertilizer evenly across large areas.",
      price: 50,
      image: "https://example.com/images/fertilizer-spreader.jpg",
    },
    {
      name: "Water Pump",
      description: "Durable water pump suitable for irrigation purposes.",
      price: 65,
      image: "https://example.com/images/water-pump.jpg",
    },
  ];

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price, 0);
  const calculateTax = () => calculateSubtotal() * taxRate;
  const calculateTotal = () => calculateSubtotal() - discount + calculateTax() + shippingCost;

  const handleApplyDiscountCode = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(calculateSubtotal() * 0.1);
    } else {
      alert('Invalid discount code');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto p-6 bg-green-50 min-h-screen mt-14">
      <h1 className="text-3xl font-semibold mb-4 text-green-800">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg shadow-md">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300" />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => navigate('/products')} 
                className="text-green-600 mt-4 underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-6 border-b border-gray-200 pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-green-800">{item.name}</h2>
                  <p className="text-gray-500">Price: ₹{item.price}</p>
                  <p className={item.available ? "text-green-500" : "text-red-500"}>
                    {item.available ? 'In Stock' : 'Out of Stock'}
                    </p>
                  <p className="text-gray-500">
                    Delivery Estimate: {item.available ? item.deliveryEstimate : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <button 
                    onClick={() => setSavedItems([...savedItems, item])} 
                    className="text-blue-500 underline mr-4"
                  >
                    Save for Later
                  </button>
                  <button 
                    onClick={() => console.log("Item removed")} 
                    className="text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800 font-bold">₹{calculateSubtotal().toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Discount</span>
            <span className="text-gray-800 font-bold">-₹{discount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-500">₹{shippingCost}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-500">₹{calculateTax().toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-semibold text-gray-800 mt-4">
            <span>Total</span>
            <span className="font-bold">₹{calculateTotal().toFixed(2)}</span>
          </div>

          <button 
            onClick={handleCheckout} 
            className="w-full bg-green-600 text-white font-semibold py-2 mt-6 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>

          <div className="mt-6">
            <label className="block text-gray-500 mb-2">Do you have a promo code?</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="border border-gray-300 p-2 flex-1 min-w-0 rounded-md mr-2" 
              />
              <button 
                onClick={handleApplyDiscountCode} 
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Saved for Later */}
      {savedItems.length > 0 && (
        <div className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Saved for Later</h2>
          {savedItems.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b border-gray-200 pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md mr-4" />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-green-800">{item.name}</h2>
                <p className="text-gray-500">Price: ₹{item.price}</p>
              </div>
              <button 
                onClick={() => setCartItems([...cartItems, item])} 
                className="text-green-500 underline"
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Recommended Products */}
      <div className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendedItems.map((item, index) => (
            <div key={index} className="flex items-center border border-gray-200 p-4 rounded-md">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
              <div>
                <h3 className="text-green-800 font-semibold">{item.name}</h3>
                <p className="text-gray-500">Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentCartPage;
