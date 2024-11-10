
import React, { useState, useEffect } from 'react'

// Dummy data for inventory items
const dummyInventory = [
  { id: 1, sku: 'FRT001', name: 'Organic Apples', stock: 500, category: 'Fruits', seller: 'Green Farms', location: 'Warehouse A' },
  { id: 2, sku: 'VEG002', name: 'Fresh Carrots', stock: 750, category: 'Vegetables', seller: 'Veggie Co.', location: 'Warehouse B' },
  { id: 3, sku: 'GRN003', name: 'Whole Wheat', stock: 1000, category: 'Grains', seller: 'Grain Growers', location: 'Warehouse C' },
  { id: 4, sku: 'DRY004', name: 'Organic Cashews', stock: 250, category: 'Dry Fruits', seller: 'Nutty Delights', location: 'Warehouse A' },
  { id: 5, sku: 'HRB005', name: 'Fresh Basil', stock: 100, category: 'Herbs', seller: 'Herb Haven', location: 'Warehouse B' },
]

export default function WarehouseInventory() {
  const [inventory, setInventory] = useState(dummyInventory)
  const [selectedItems, setSelectedItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortColumn, setSortColumn] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [editItem, setEditItem] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === '' || item.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortColumn === '') return 0
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleEdit = (item) => {
    setEditItem({ ...item })
  }

  const handleDelete = (id) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      setInventory(inventory.filter(item => item.id !== itemToDelete))
      setShowDeleteModal(false)
      setItemToDelete(null)
    }
  }

  const handleSave = () => {
    setInventory(inventory.map(item => item.id === editItem.id ? editItem : item))
    setEditItem(null)
  }

  const handleBulkDelete = () => {
    setInventory(inventory.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredInventory.map(item => item.id))
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulating file upload and processing
      setTimeout(() => {
        const newItems = [
          { id: inventory.length + 1, sku: 'NEW001', name: 'Uploaded Product', stock: 100, category: 'New', seller: 'New Seller', location: 'Warehouse D' },
          { id: inventory.length + 2, sku: 'NEW002', name: 'Another Upload', stock: 200, category: 'New', seller: 'New Seller', location: 'Warehouse E' },
        ]
        setInventory([...inventory, ...newItems])
        setShowUploadModal(false)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 mt-20 pt-3">
      {/* Flashy Banner */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6 shadow-lg">
        <h1 className="text-3xl font-bold">AgroShop Warehouse Inventory</h1>
        <p className="text-sm mt-2">Manage your agricultural products efficiently</p>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content Container */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Search and Filter */}
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

          {/* Inventory Table */}
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
                            setSelectedItems(selectedItems.filter(id => id !== item.id))
                          } else {
                            setSelectedItems([...selectedItems, item.id])
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
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
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
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 transition duration-300"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Inventory</h2>
            <p className="mb-4 text-gray-600">Select a CSV file to upload new inventory items.</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mb-4 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}