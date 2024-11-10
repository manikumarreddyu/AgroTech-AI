import React from "react";
import { ShoppingCart } from "lucide-react";

export default function BundleHeader({ title, subtitle, onCartClick }) {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6 shadow-md relative">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm mt-1 text-green-100">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onCartClick}
            className="bg-green-500 hover:bg-green-700 p-2 rounded-full transition-colors shadow-md"
            aria-label="Go to Cart"
          >
            <ShoppingCart className="text-white w-6 h-6" />
          </button>

          <button className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-100 transition-colors shadow-md">
            Shop Now
          </button>
        </div>
      </div>

      {/* Optional decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-600" />
    </header>
  );
}
