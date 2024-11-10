import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      {/* Product Image and Tag */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition duration-300 ease-in-out hover:opacity-80"
        />
        <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.tag}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <span className="text-gray-500 text-sm">
            {product.stock} in stock
          </span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 flex items-center">
            <Star className="fill-current" size={16} />
            <span className="ml-1">{product.rating}</span>
          </span>
          <span className="text-gray-600 text-sm">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-green-600 font-bold text-2xl">
          ${product.price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none transition duration-300">
          Add to Cart
        </button>
      </div>

      {/* Hover Effect */}
      <div className="p-4 mt-4 text-center">
        <span className="text-sm text-gray-500">
          Free shipping on orders over $50!
        </span>
      </div>
    </div>
  );
}
