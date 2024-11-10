import React from "react";

export default function BundleRelatedItems({ relatedBundles }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedBundles.map((bundle) => (
          <div
            key={bundle.id}
            className="border border-green-200 rounded-lg p-4 shadow-md"
          >
            <img
              src={bundle.image}
              alt={bundle.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-semibold">{bundle.name}</h3>
            <p>${bundle.price.toFixed(2)}</p>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full">
              View Bundle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
