import React from "react";

const CompareProducts = ({ products }) => {
  const compareItems = products.slice(0, 2); // Comparing the first two products

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold text-center mb-6">Compare Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {compareItems.map((product) => (
          <div
            key={product._id}
            className="border-2 border-green-500 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image || "/path/to/default-image.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="text-xl font-bold text-gray-800">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-green-600">{`$${product.price} per day`}</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareProducts;
