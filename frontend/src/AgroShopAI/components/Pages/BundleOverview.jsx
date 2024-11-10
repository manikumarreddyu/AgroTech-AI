import React, { useState } from 'react'

export default function BundleOverview({ bundle, onCustomizePrice }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  const calculateTotalPrice = (products) =>
    products.reduce((total, product) => total + product.price, 0)

  const calculateDiscountedPrice = (products, discount) => {
    const totalPrice = calculateTotalPrice(products)
    return totalPrice - totalPrice * discount
  }

  return (
    <div className="border border-green-200 rounded-lg p-4 mb-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{bundle.name}</h3>
          {bundle.popular && (
            <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Popular
            </span>
          )}
          {bundle.loyaltyOnly && (
            <span className="bg-purple-400 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Loyalty Exclusive
            </span>
          )}
        </div>
        <button
          onClick={toggleDetails}
          className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Products in this bundle:</h4>
            <ul>
              {bundle.products.map((product) => (
                <li key={product.id} className="flex items-center mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 mr-2 object-cover"
                  />
                  <span>{product.name}</span>
                  <input
                    type="number"
                    value={product.price.toFixed(2)}
                    onChange={(e) => onCustomizePrice(bundle.id, product.id, e.target.value)}
                    className="ml-auto w-20 p-1 border border-gray-300 rounded"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Price Breakdown:</h4>
            <p>Original Price: ${calculateTotalPrice(bundle.products).toFixed(2)}</p>
            <p>Bundle Price: ${calculateDiscountedPrice(bundle.products, bundle.discount).toFixed(2)}</p>
            <p className="text-green-600 font-semibold">
              You Save: $
              {(
                calculateTotalPrice(bundle.products) -
                calculateDiscountedPrice(bundle.products, bundle.discount)
              ).toFixed(2)}{' '}
              ({(bundle.discount * 100).toFixed(0)}% off)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
