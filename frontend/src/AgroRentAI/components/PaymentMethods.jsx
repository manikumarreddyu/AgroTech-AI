import React, { useState } from 'react';

const PaymentMethodsComponent = ({ paymentMethods, updatePaymentMethods }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newMethod, setNewMethod] = useState({
    cardholder: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prevMethod) => ({
      ...prevMethod,
      [name]: value
    }));
  };

  const handleAddPaymentMethod = (e) => {
    e.preventDefault();
    if (
      newMethod.cardholder &&
      newMethod.cardNumber &&
      newMethod.expiration &&
      newMethod.cvv
    ) {
      // Check if card number is valid (this is just a basic check for length)
      if (newMethod.cardNumber.length < 13 || newMethod.cardNumber.length > 19) {
        alert('Please enter a valid card number.');
        return;
      }
      updatePaymentMethods([...paymentMethods, newMethod]);
      setIsAdding(false);
      setNewMethod({
        cardholder: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleRemovePaymentMethod = (index) => {
    const updatedMethods = paymentMethods.filter((_, i) => i !== index);
    updatePaymentMethods(updatedMethods);
  };

  return (
    <div className="p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-2xl ">
      <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Payment Methods</h2>

      {paymentMethods.length > 0 ? (
        <ul className="list-disc list-inside text-green-600 mb-4">
          {paymentMethods.map((method, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>
                {/* Check if cardNumber exists and is a valid string before slicing */}
                {method.cardholder} - 
                {method.cardNumber ? method.cardNumber.slice(-4) : '****VISA card ****'}
              </span>
              <button
                onClick={() => handleRemovePaymentMethod(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600">No payment methods added yet.</p>
      )}

      {/* Manage Payment Methods Button */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300 mb-4"
      >
        {isAdding ? 'Cancel' : 'Add Payment Method'}
      </button>

      {/* Add Payment Method Form */}
      {isAdding && (
        <form onSubmit={handleAddPaymentMethod} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-green-600">Cardholder Name</label>
            <input
              type="text"
              name="cardholder"
              value={newMethod.cardholder}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-600">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={newMethod.cardNumber}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-md"
              placeholder="1234 5678 1234 5678"
              required
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-green-600">Expiration Date</label>
              <input
                type="month"
                name="expiration"
                value={newMethod.expiration}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-green-600">CVV</label>
              <input
                type="text"
                name="cvv"
                value={newMethod.cvv}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="123"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300"
          >
            Add Card
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentMethodsComponent;
