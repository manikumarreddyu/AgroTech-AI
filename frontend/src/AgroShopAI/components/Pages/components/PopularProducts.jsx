import React from 'react';

export default function PopularProducts({ data }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-2">Popular Products</h3>
      <div className="space-y-2">
        {data.map((product, index) => (
          <div key={index} className="flex justify-between bg-gray-100 p-2 rounded">
            <span>{product.name}</span>
            <span>{product.sales} sales</span>
          </div>
        ))}
      </div>
    </div>
  );
}
