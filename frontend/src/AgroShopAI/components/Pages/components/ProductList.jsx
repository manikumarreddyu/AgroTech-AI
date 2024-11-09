
import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onQuickBuy }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickBuy={onQuickBuy} />
      ))}
    </div>
  );
}
