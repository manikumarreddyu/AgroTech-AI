import React from "react";
import ProductCard from "./ProductCard";

const Recommendations = ({ products }) => {
  const recommended = products.slice(0, 4); // Just a slice for demonstration

  return (
    <div className="my-8">
      <h3 className="text-2xl font-semibold mb-6 text-center">Recommended Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recommended.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
