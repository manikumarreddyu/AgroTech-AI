import React, { useState } from 'react';
import  FeaturedProductsCarousel from './ProductCarousel'
const SellerProductManagementPage = ({
  products,
  searchTerm,
  setSearchTerm,
  handleAddProduct,
  handleDeleteProduct,
  expandedProduct,
  toggleProductExpansion,
}) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Product Management</h2>

      {/* Search and Add Product Section */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products"
          className="p-3 w-2/3 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white p-3 rounded-r-md ml-2"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <ul className="space-y-4">
        {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
          <li key={product.id} className="bg-white p-4 shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-semibold">{product.name}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleProductExpansion(product.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {expandedProduct === product.id ? 'Collapse' : 'Expand'}
                </button>
              </div>
            </div>

            {/* Expanded Product Details */}
            {expandedProduct === product.id && (
              <div className="mt-4">
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <div className="mt-4 flex space-x-4">
                  <button className="bg-yellow-500 text-white p-2 rounded-md">Edit</button>
                  <button className="bg-gray-500 text-white p-2 rounded-md">Save Changes</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    <FeaturedProductsCarousel />
    </div>
  );
}

export default SellerProductManagementPage;
