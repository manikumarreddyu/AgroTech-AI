import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Using React Icons for the search icon

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass the search query, category, and price range to the parent component
    onSearch({ searchQuery, category, priceRange });
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-4 bg-white shadow-lg rounded-lg">
      {/* Search Input */}
      <div className="flex items-center border-2 border-green-500 rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-64 sm:w-80 focus:outline-none"
          placeholder="Search for products..."
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white p-2 flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <FaSearch />
        </button>
      </div>

      {/* Category Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="category" className="text-sm text-gray-600">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none"
        >
          <option value="all">All</option>
          <option value="equipment">Equipment</option>
          <option value="tools">Tools</option>
          <option value="seeds">Seeds</option>
          <option value="fertilizers">Fertilizers</option>
        </select>
      </div>

      {/* Price Range Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="priceRange" className="text-sm text-gray-600">
          Price Range:
        </label>
        <select
          id="priceRange"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 border-2 border-green-500 rounded-lg focus:outline-none"
        >
          <option value="all">All</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-200">$50 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500+">$500+</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
