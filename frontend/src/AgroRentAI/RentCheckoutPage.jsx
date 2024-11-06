import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RentCheckoutPage = () => {
  // Dummy cartItems data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Farm Tractor',
      description: 'High power tractor for various agricultural tasks.',
      price: 150, // price per day
      quantity: 2,
      image: 'https://example.com/images/tractor.jpg',
    },
    {
      id: 2,
      name: 'Harvesting Machine',
      description: 'Efficient harvesting machine for quick crop collection.',
      price: 200, // price per day
      quantity: 1,
      image: 'https://example.com/images/harvester.jpg',
    }
  ]);

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Calculate total price based on cartItems
  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleCheckout = () => {
    // Normally you would send the order to the backend for processing
    console.log('Proceeding to checkout with the following details:', userDetails);
    alert('Your order is placed. Waiting for approval from the admin/seller.');
    navigate('/order-confirmation');  // Redirect to order confirmation page
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Recalculate total when cart items change
  React.useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-8 mt-12">
      <h2 className="text-4xl font-extrabold text-green-900 mb-8">Checkout</h2>

      <div className="max-w-5xl bg-gradient-to-b from-green-100 to-green-200 rounded-lg shadow-2xl p-6 w-full">
        {/* Cart items list */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Your Cart</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                  <div>
                    <h4 className="text-lg font-semibold text-green-900">{item.name}</h4>
                    <p className="text-sm text-green-700">{item.description}</p>
                    <p className="text-sm text-green-600">Price: ${item.price} / day</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-bold text-green-800 mr-4">${item.price * item.quantity}</p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-green-800 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-green-700">Your cart is empty. Please add items to your cart.</p>
          )}
        </div>

        {/* User Details Form */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Billing Details</h3>
          <form>
            <div className="mb-4">
              <label className="block text-green-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-green-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-green-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 mb-2">Address</label>
              <textarea
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-green-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-green-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-green-300 rounded-md"
                required
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Order Summary</h3>
          <div className="flex justify-between items-center border-b py-4">
            <span className="text-lg text-green-700">Total Price:</span>
            <span className="text-xl font-bold text-green-900">${totalPrice}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-500 transition-colors duration-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentCheckoutPage;
