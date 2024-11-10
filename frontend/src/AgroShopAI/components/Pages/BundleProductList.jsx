import React from "react";

export default function BundleProductList({
  products,
  bundleId,
  handleCustomize,
}) {
  return (
    <div>
      <h4 className="font-semibold mb-2">Products in this bundle:</h4>
      <ul>
        {products.map((product) => (
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
              onChange={(e) =>
                handleCustomize(bundleId, product.id, e.target.value)
              }
              className="ml-auto w-20 p-1 border border-gray-300 rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
