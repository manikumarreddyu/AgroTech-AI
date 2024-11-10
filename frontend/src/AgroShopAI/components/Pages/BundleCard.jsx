import React from "react";
import BundleProductList from "./BundleProductList";
import BundlePriceBreakdown from "./BundlePriceBreakdown";

export default function BundleCard({ bundle, handleCustomize }) {
  return (
    <div className="border border-green-200 rounded-lg p-4 mb-6 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{bundle.name}</h3>
        {bundle.popular && (
          <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Popular
          </span>
        )}
        {bundle.loyaltyOnly && (
          <span className="bg-purple-400 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Loyalty Exclusive
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BundleProductList
          products={bundle.products}
          bundleId={bundle.id}
          handleCustomize={handleCustomize}
        />
        <BundlePriceBreakdown bundle={bundle} />
      </div>
    </div>
  );
}
