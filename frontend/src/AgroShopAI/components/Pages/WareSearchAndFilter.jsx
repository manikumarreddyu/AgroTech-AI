
import React from 'react';

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  setShowUploadModal,
  selectedItems,
  handleBulkDelete,
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <select
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-transparent"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Grains">Grains</option>
        <option value="Dry Fruits">Dry Fruits</option>
        <option value="Herbs">Herbs</option>
      </select>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        onClick={() => setShowUploadModal(true)}
      >
        Upload Inventory
      </button>
      {selectedItems.length > 0 && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          onClick={handleBulkDelete}
        >
          Delete Selected ({selectedItems.length})
        </button>
      )}
    </div>
  );
}
