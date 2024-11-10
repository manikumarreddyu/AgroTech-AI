// ProductList.js
import React from 'react'

export default function ProductList({ products, handleSelectProduct, handleCreateNewProduct }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-green-700">Product List</h2>
        <button
          onClick={handleCreateNewProduct}
          className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition transform hover:scale-105"
        >
          + Add New Product
        </button>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="flex items-center justify-between p-4 hover:bg-green-100 rounded-lg transition">
              <div className="flex items-center space-x-4">
                <img src={product.images[0]} alt={product.name} width={50} height={50} className="rounded-full" />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)} - Stock: {product.stockQuantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleSelectProduct(product)}
                className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
