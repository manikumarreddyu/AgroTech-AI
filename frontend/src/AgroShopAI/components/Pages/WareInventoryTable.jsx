// InventoryTable.js
import React from 'react';

export default function InventoryTable({
  filteredInventory,
  selectedItems,
  toggleSelectAll,
  handleSort,
  handleEdit,
  handleDelete,
  setSelectedItems
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-3 text-left">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={selectedItems.length === filteredInventory.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('sku')}>SKU</th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('name')}>Product Name</th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('stock')}>Stock</th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('category')}>Category</th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('seller')}>Seller</th>
            <th className="p-3 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort('location')}>Location</th>
            <th className="p-3 text-left font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 transition duration-150">
              <td className="p-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => {
                    if (selectedItems.includes(item.id)) {
                      setSelectedItems(selectedItems.filter(id => id !== item.id));
                    } else {
                      setSelectedItems([...selectedItems, item.id]);
                    }
                  }}
                />
              </td>
              <td className="p-3">{item.sku}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.stock}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.seller}</td>
              <td className="p-3">{item.location}</td>
              <td className="p-3">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
