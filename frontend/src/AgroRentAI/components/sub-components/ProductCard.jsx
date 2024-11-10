import React from "react";

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg shadow-lg bg-white overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      {/* Product Image */}
      <img
        src={product.image || "/path/to/default-product-image.png"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>

        {/* Product Description */}
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>

        {/* Price */}
        <p className="text-xl font-semibold text-green-600 mt-2">{`$${product.price} per day`}</p>

        {/* Additional Product Info */}
        <div className="mt-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {product.category && product.category.length > 0 && product.category.map((category, index) => (
              <span key={index} className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{category}</span>
            ))}
          </div>

          {/* Rental Duration */}
          <div className="mt-2">
            {product.rentalDurationOptions && (
              <p className="text-sm text-gray-600">
                Rental Duration:{" "}
                {product.rentalDurationOptions.join(", ")}
              </p>
            )}
          </div>

          {/* Availability Status */}
          <div className="mt-2">
            <p
              className={`text-sm ${
                product.availabilityStatus === "available"
                  ? "text-green-600"
                  : product.availabilityStatus === "rented"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {product.availabilityStatus}
            </p>
          </div>

          {/* Seller Info */}
          {product.seller && (
            <div className="mt-4 border-t pt-4 text-sm text-gray-600">
              <p className="font-semibold">Seller: {product.seller.name}</p>
              <p>Contact: {product.seller.contact}</p>
              <p>Location: {product.seller.location}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
