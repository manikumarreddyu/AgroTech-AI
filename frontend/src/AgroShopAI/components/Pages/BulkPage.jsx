import React, { useState, useEffect } from "react";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";
import BundleHeader from "./BundleHeader";
import BundleList from "./BundleList";
import BundleRelatedItems from "./BundleRelatedItems";
import BundleLoyaltyMessage from "./BundleLoyaltyMessage";
import { dummyBundles, relatedBundles } from "./BundleData.js";

export default function BundledProducts() {
  const [bundles, setBundles] = useState(dummyBundles);
  const [isLoyaltyMember, setIsLoyaltyMember] = useState(false);

  useEffect(() => {
    const checkLoyaltyStatus = () => {
      setIsLoyaltyMember(Math.random() > 0.5);
    };
    checkLoyaltyStatus();
  }, []);

  const handleCustomize = (bundleId, productId, newPrice) => {
    setBundles(
      bundles.map((bundle) => {
        if (bundle.id === bundleId) {
          const updatedProducts = bundle.products.map((product) =>
            product.id === productId
              ? { ...product, price: parseFloat(newPrice) }
              : product
          );
          return { ...bundle, products: updatedProducts };
        }
        return bundle;
      })
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 mt-20 pt-3">
      <BundleHeader title="AgroShop - Bundled Products" />
      <main className="container mx-auto p-4">
        <BundleList
          bundles={bundles}
          isLoyaltyMember={isLoyaltyMember}
          handleCustomize={handleCustomize}
        />
        <BundleRelatedItems relatedBundles={relatedBundles} />
        {!isLoyaltyMember && <BundleLoyaltyMessage />}
      </main>
    </div>
  );
}
