import React, { useState } from 'react';

export default function ProductStepForm({ step, productData, handleInputChange, handleSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle modal open and close
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select a category</option>
              {['Seeds', 'Fertilizers', 'Pesticides', 'Farm Equipment', 'Irrigation Systems'].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="mb-4">
            <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter price"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter quantity"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <>
          {/* Confirmation Modal */}
          <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 ${isModalOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Confirm Submission</h3>
              <p className="mb-4">Are you sure you want to submit the product with the following details?</p>
              <ul className="mb-4">
                <li><strong>Name:</strong> {productData.name}</li>
                <li><strong>Category:</strong> {productData.category}</li>
                <li><strong>Price:</strong> ₹{productData.price}</li>
                <li><strong>Quantity:</strong> {productData.quantity}</li>
                <li><strong>Description:</strong> {productData.description}</li>
              </ul>
              <div className="flex justify-between">
                <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                <button
                  onClick={() => {
                    handleSubmit();
                    closeModal();
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>

          {/* Button to trigger modal */}
          <div className="text-center">
            <button
              onClick={openModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Product
            </button>
          </div>
        </>
      )}
    </>
  );
}
