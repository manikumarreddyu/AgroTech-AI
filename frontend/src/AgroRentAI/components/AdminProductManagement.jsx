import React from "react";
import { Plus, Edit, Trash, Eye } from "lucide-react";

const ProductManagement = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onViewProduct }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center justify-center">
      Product Management
    </h2>
    <button
      onClick={onAddProduct}
      className="bg-green-600 text-white px-6 py-3 rounded-md mb-6 hover:bg-green-700 transition-colors duration-300 flex items-center"
    >
      <Plus className="inline w-4 h-4 mr-2" /> Add Product
    </button>

    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 bg-green-50 hover:bg-green-100 shadow-sm transition-colors duration-200">
          <div className="flex justify-between items-start mb-2">
            {/* Product Info */}
            <div>
              <p className="text-lg font-semibold text-green-700">{product.name}</p>
              <p className="text-sm text-gray-700 mb-1">{product.description}</p>
              <p className="text-green-600">
                ${product.price} - {product.category} - {product.availability ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            {/* Product Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => onViewProduct(product.id)}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                <Eye className="w-4 h-4" /> View
              </button>
              <button
                onClick={() => onUpdateProduct(product.id)}
                className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                <Trash className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
          {/* Stock or Availability */}
          <p className="text-sm text-gray-500">SKU: {product.sku} | Stock: {product.stockCount}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ProductManagement;
