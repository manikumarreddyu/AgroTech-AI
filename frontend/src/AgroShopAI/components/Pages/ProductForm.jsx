// ProductForm.js
import React, { useState } from 'react'

export default function ProductForm({ selectedProduct, isCreating, isEditing, handleSubmit }) {
  const [product, setProduct] = useState(selectedProduct)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stockQuantity' ? parseFloat(value) : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }))
    }
  }

  const removeImage = (index) => {
    const newImages = product.images.filter((_, i) => i !== index)
    setProduct(prev => ({
      ...prev,
      images: newImages
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!product.name) newErrors.name = 'Product name is required'
    if (!product.category) newErrors.category = 'Category is required'
    if (product.price <= 0) newErrors.price = 'Price must be greater than 0'
    if (!product.description) newErrors.description = 'Description is required'
    if (!product.sku) newErrors.sku = 'SKU is required'
    if (product.stockQuantity < 0) newErrors.stockQuantity = 'Stock quantity cannot be negative'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    handleSubmit(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 text-green-700">
                {isCreating ? 'Create New Product' : 'Edit Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  >
                    <option value="">Select a category</option>
                    <option value="fruits">Fruits</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="grains">Grains</option>
                    <option value="dairy">Dairy</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={selectedProduct.sku}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  />
                  {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
                </div>

                <div>
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={selectedProduct.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  />
                  {errors.stockQuantity && <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>}
                </div>

                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">Product Images</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageUpload}
                    multiple
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-50 file:text-green-700
                      hover:file:bg-green-100"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {selectedProduct.images.map((image, index) => (
                    <div key={index} className="relative">
                      <Image src={image} alt={`Product ${index + 1}`} width={150} height={150} className="w-full h-32 object-cover rounded-lg shadow-md" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition transform hover:scale-110"
                        aria-label="Remove image"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setIsCreating(false)
                      setSelectedProduct(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105"
                  >
                    {isCreating ? 'Create Product' : 'Update Product'}
                  </button>
                </div>
              </form>
            </div>
  )
}
