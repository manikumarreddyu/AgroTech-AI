// EditModal.js
import React from 'react';

export default function EditModal({ editItem, setEditItem, handleSave }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Item</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
            value={editItem.stock}
            onChange={(e) => setEditItem({ ...editItem, stock: parseInt(e.target.value) })}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            onClick={() => setEditItem(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
