import { Search, ChevronDown } from "lucide-react";

export default function SearchAndSort({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4 md:px-8">
      {/* Search Input */}
      <div className="relative w-full md:w-72 mb-4 md:mb-0">
        <label htmlFor="search" className="text-sm text-gray-600 mb-2 block">
          Search Products
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search products"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Sort By Dropdown */}
      <div className="relative w-full md:w-56">
        <label htmlFor="sortBy" className="text-sm text-gray-600 mb-2 block">
          Sort By
        </label>
        <select
          id="sortBy"
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products by"
        >
          <option value="trending">Trending Now</option>
          <option value="price">Price: Low to High</option>
          <option value="rating">Top Rated</option>
          <option value="newest">Newest Arrivals</option>
          <option value="discount">Discounted</option>
        </select>
        <ChevronDown
          className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
          size={20}
        />
      </div>

      {/* Filter Button */}
      <div className="w-full md:w-32 mt-4 md:mt-0">
        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out"
          onClick={() => alert("Filters Applied")}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
