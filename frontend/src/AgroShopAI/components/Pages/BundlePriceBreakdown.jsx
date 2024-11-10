import React from "react";

export default function BundlePriceBreakdown({ bundle }) {
  const calculateTotalPrice = (products) =>
    products.reduce((total, product) => total + product.price, 0);
  const calculateDiscountedPrice = (bundle) => {
    const totalPrice = calculateTotalPrice(bundle.products);
    return totalPrice - totalPrice * bundle.discount;
  };

  return (
    <div>
      <h4 className="font-semibold mb-2">Price Breakdown:</h4>
      <p>Original Price: ${calculateTotalPrice(bundle.products).toFixed(2)}</p>
      <p>Bundle Price: ${calculateDiscountedPrice(bundle).toFixed(2)}</p>
      <p className="text-green-600 font-semibold">
        You Save: $
        {(
          calculateTotalPrice(bundle.products) -
          calculateDiscountedPrice(bundle)
        ).toFixed(2)}{" "}
        ({(bundle.discount * 100).toFixed(0)}% off)
      </p>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
