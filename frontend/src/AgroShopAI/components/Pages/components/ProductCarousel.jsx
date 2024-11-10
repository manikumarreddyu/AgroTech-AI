import React, { useState, useEffect } from 'react'

export default function FeaturedProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyProducts.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyProducts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dummyProducts.length) % dummyProducts.length)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Featured Products</h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {[...dummyProducts, ...dummyProducts.slice(0, 2)].map((product, index) => (
            <div key={`${product.id}-${index}`} className="w-full flex-shrink-0 px-2">
              <div
                className="bg-white rounded-lg shadow-md p-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.backgroundImage})` }}
              >
                <div className="ml-5">
                <h3 className="text-xl font-semibold mb-2 text-green-500">{product.name}</h3>
                <p className="text-gray-200 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-green-500">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
          aria-label="Previous product"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none"
          aria-label="Next product"
        >
          &#10095;
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {dummyProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 mx-1 rounded-full ${
              index === currentIndex % dummyProducts.length ? 'bg-green-500' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const dummyProducts = [
    { id: 1, name: 'Organic Fertilizer', price: 19.99, description: 'Nutrient-rich organic fertilizer for all crops', backgroundImage: 'https://i0.wp.com/www.bigtoolbox.com/wp-content/uploads/2022/05/BTB-Blog-Organic.jpg' },
    { id: 2, name: 'Drip Irrigation Kit', price: 89.99, description: 'Water-saving irrigation system for efficient farming', backgroundImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCiwqx3GQ4LZS_qTaGO-5yWa_Scrkv2gjiI3IYVHzV79t0ERXbM7NH0FBBexMYJBeZ9Y&usqp=CAU' },
    { id: 3, name: 'Heirloom Tomato Seeds', price: 4.99, description: 'Non-GMO, organic heirloom tomato seed variety pack', backgroundImage: 'https://www.threshseed.com/cdn/shop/files/mule-team-heirloom-tomato-seeds-43401418637561.jpg?v=1726787052&width=2000' },
    { id: 4, name: 'Pruning Shears', price: 24.99, description: 'High-quality steel pruning shears for precise cuts', backgroundImage: 'https://www.hausandgarten.com/cdn/shop/articles/Hero_Image_-_How_To_Use_Pruning_Shears_600x.png?v=1706594768' },
    { id: 5, name: 'Soil pH Tester', price: 29.99, description: 'Digital soil pH meter for optimal crop management', backgroundImage: 'https://thehomesteadingrd.com/wp-content/uploads/2022/06/The-5-Best-Soil-pH-Testers-in-2022-cover-e1700235887801.jpg' },
    { id: 6, name: 'Composting Bin', price: 49.99, description: 'Large-capacity composting bin for organic waste', backgroundImage: 'https://4344835.fs1.hubspotusercontent-na1.net/hubfs/4344835/Imported_Blog_Media/setting-up-outdoor-compost-bin_a-1.jpg' },
]
