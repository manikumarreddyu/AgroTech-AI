import React from 'react'

export default function FeaturedProductsSection() {
  return (
    <section className="bg-green-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-green-700">{product.name}</h3>
              <p className="text-green-500">{product.price}</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
