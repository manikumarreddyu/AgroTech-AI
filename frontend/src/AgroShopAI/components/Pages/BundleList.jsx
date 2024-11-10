import React from "react";
import BundleCard from "./BundleCard";

export default function BundleList({
  bundles,
  isLoyaltyMember,
  handleCustomize,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Featured Bundles</h2>
      {bundles.map(
        (bundle) =>
          (!bundle.loyaltyOnly || (bundle.loyaltyOnly && isLoyaltyMember)) && (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              handleCustomize={handleCustomize}
            />
          )
      )}
    </div>
  );
}
