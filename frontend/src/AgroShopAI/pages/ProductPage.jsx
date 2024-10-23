import React, { useState } from 'react';
import ReviewSection from '../components/ReviewSection'; // Adjust the path as needed

const ProductPage = () => {
  const [currentImage, setCurrentImage] = useState(
    "https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category-img/growth_promoters.jpg?raw=true"
  );

  const [reviews, setReviews] = useState([
    {
      text: "This fertilizer has significantly improved my crop yield. Highly recommend!",
      rating: 5
    }
  ]);
  
  const images = [
    "https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category-img/growth_promoters.jpg?raw=true",
    "https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category-img/fungicides.jpg?raw=true",
    "https://github.com/IkkiOcean/AgroTech_Assets/blob/main/shop-asset/category-img/seeds.jpg?raw=true"
  ];

  return (
    <div className="min-h-screen bg-gray-800 p-2 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-white border border-gray-300 rounded-md shadow-md">
        {/* Image Section */}
        <div className="flex p-2 bg-white border-r-2 rounded-l-md">
          {/* Thumbnails Column */}
          <div className="flex flex-col pt-6 space-y-2 items-center w-16">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-16 h-16 border border-gray-300 rounded-md cursor-pointer hover:opacity-75"
                onMouseEnter={() => setCurrentImage(image)}
              />
            ))}
          </div>

          {/* Main Product Image */}
          <div className="flex justify-center w-full h-2/3 p-6 space-y-6">
            <img
              src={currentImage}
              alt="Agricultural Product"
              className="object-cover w-full max-w-lg transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 space-y-6 rounded-md">
          {/* Product Title */}
          <h1 className="text-4xl font-bold">Premium Organic Fertilizer</h1>

          {/* Product Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="text-gray-600">(300 ratings)</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-red-500">₹49.99</div>

          {/* Availability */}
          <p className="text-green-600 font-bold">In Stock</p>

          {/* Product Description */}
          <p className="text-gray-700">
            This premium organic fertilizer is made from natural ingredients, ensuring your plants receive the best nutrition for healthy growth. Suitable for all types of crops and gardens.
          </p>

          {/* Usage Instructions */}
          <div className="space-y-2">
            <p className="text-lg font-semibold">Usage Instructions:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Apply 1 cup per 10 square feet of soil.</li>
              <li>Mix well with the topsoil before planting.</li>
              <li>Water the soil thoroughly after application.</li>
            </ul>
          </div>

          {/* Size Options */}
          <div className="space-y-2">
            <p className="text-lg font-semibold">Size:</p>
            <div className="flex space-x-4">
              <button className="w-20 h-20 bg-green-500 rounded-md border text-white">1 Kg</button>
              <button className="w-20 h-20 bg-brown-500 rounded-md border text-black">2 Kg</button>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <select id="quantity" className="border border-gray-300 rounded-md px-4 py-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10 kg</option>
            </select>
          </div>

          {/* Add to Cart and Buy Now Buttons */}
          <div className="space-y-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-bold hover:bg-yellow-500 w-full">Add to Cart</button>
            <button className="bg-orange-600 text-white px-6 py-3 rounded-md font-bold hover:bg-orange-700 w-full">Buy Now</button>
          </div>

          {/* Shipping Information */}
          <div className="text-sm text-gray-600">
            <p>Ships from and sold by AgriStore.</p>
            <p>Eligible for free shipping on orders over $50.</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewSection reviews={reviews} setReviews={setReviews} />
    </div>
  );
};

export default ProductPage;
