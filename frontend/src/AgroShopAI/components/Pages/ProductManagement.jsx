// AdminProductManagement.js
import React, { useState } from 'react'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

const dummyProducts = [
  {
    id: '1',
    name: 'Organic Apples',
    category: 'fruits',
    price: 2.99,
    description: 'Fresh, juicy organic apples from local farms.',
    sku: 'APP001',
    stockQuantity: 100,
    images: ['/placeholder.svg?height=150&width=150', '/placeholder.svg?height=150&width=150']
  },
  {
    id: '2',
    name: 'Farm Fresh Eggs',
    category: 'dairy',
    price: 4.50,
    description: 'Free-range eggs from happy chickens.',
    sku: 'EGG002',
    stockQuantity: 50,
    images: ['/placeholder.svg?height=150&width=150']
  },
  {
    id: '3',
    name: 'Organic Carrots',
    category: 'vegetables',
    price: 1.99,
    description: 'Crunchy and sweet organic carrots.',
    sku: 'CAR003',
    stockQuantity: 200,
    images: ['/placeholder.svg?height=150&width=150']
  }
]

export default function AdminProductManagement() {
  const [products, setProducts] = useState(dummyProducts)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleCreateNewProduct = () => {
    setSelectedProduct({
      id: `NEW${Date.now()}`,  // Generate new unique ID
      name: '',
      category: '',
      price: 0,
      description: '',
      sku: '',
      stockQuantity: 0,
      images: []
    })
    setIsCreating(true)
    setIsEditing(false)
  }

  const handleSubmit = (product) => {
    if (isCreating) {
      setProducts([...products, product])
    } else {
      const updatedProducts = products.map(p =>
        p.id === product.id ? product : p
      )
      setProducts(updatedProducts)
    }
    setIsEditing(false)
    setIsCreating(false)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">AgroShop Admin</h1>
          <p className="text-xl text-gray-600">Product Management Dashboard</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product List */}
          <ProductList 
            products={products}
            handleSelectProduct={handleSelectProduct}
            handleCreateNewProduct={handleCreateNewProduct}
          />

          {/* Product Edit/Create Form */}
          {(isEditing || isCreating) && selectedProduct && (
            <ProductForm
              selectedProduct={selectedProduct}
              isCreating={isCreating}
              isEditing={isEditing}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
        {/* Flashy Banner */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">Boost Your Agricultural Business!</h2>
          <p className="text-xl">Manage your products efficiently with AgroShop's powerful admin tools.</p>
        </div>
      </div>
    </div>
  )
}
