import React, { useState, useEffect, useRef } from "react";

const Filter = ({ items, setFilteredItems }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("default");
  const [brand, setBrand] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]); // State to manage filtered brands
  const [brandList, setBrandList] = useState([]); // State to hold unique brands
  const [discountOption, setDiscountOption] = useState("none"); // State for discount filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  const dropdownRef = useRef(null); // Ref for the dropdown

  useEffect(() => {
    // Extract unique brands from items
    const brands = [...new Set(items.map((item) => item.brand))];
    setBrandList(brands);
  }, [items]);

  useEffect(() => {
    filterItems(priceRange, sortOption, brand, discountOption);
  }, [priceRange, sortOption, brand, discountOption]);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);

    // Filter the brand list based on user input (case insensitive)
    const filtered = brandList.filter((b) =>
      b.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered);
    setIsDropdownOpen(value.length > 0 && filtered.length > 0); // Open dropdown if there are filtered brands
  };

  const handleBrandSelect = (selectedBrand) => {
    setBrand(selectedBrand);
    setFilteredBrands([]); // Clear suggestions
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const handleDiscountChange = (e) => {
    setDiscountOption(e.target.value);
  };

  const filterItems = (priceRange, sortOption, brand, discountOption) => {
    let filteredItems = items.filter((item) => {
      const itemBrand = item.brand.toLowerCase(); // Convert item brand to lowercase for comparison
      const discountPercent = parseInt(item.offer) || 0; // Extract discount percentage from the offer string

      return (
        (priceRange.min === "" || item.salePrice >= priceRange.min) &&
        (priceRange.max === "" || item.salePrice <= priceRange.max) &&
        (brand ? itemBrand.includes(brand.toLowerCase()) : true) && // Compare brand case-insensitively
        (discountOption === "none" ||
          (discountOption === "less-than-10" && discountPercent < 10) ||
          (discountOption === "10" && discountPercent >= 10) ||
          (discountOption === "20" && discountPercent >= 20) ||
          (discountOption === "30" && discountPercent >= 30) ||
          (discountOption === "40" && discountPercent >= 40) ||
          (discountOption === "50" && discountPercent >= 50))
      );
    });

    if (sortOption === "price-asc") {
      filteredItems.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortOption === "price-desc") {
      filteredItems.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortOption === "newly-added") {
      filteredItems.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    setFilteredItems(filteredItems);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-2 bg-white rounded-lg">
      <h2 className="font-semibold text-lg">Filter Options</h2>

      <div>
        <h3 className="font-medium">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            name="min"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={handlePriceChange}
            className="border rounded p-1 w-full bg-gray-100"
            min="0"
          />
          <input
            type="number"
            name="max"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={handlePriceChange}
            className="border rounded p-1 w-full bg-gray-100"
            min="0"
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium">Sort By</h3>
        <select value={sortOption} onChange={handleSortChange} className="border rounded p-1 w-full bg-gray-100">
          <option value="default">Select</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newly-added">Newly Added</option>
        </select>
      </div>

      <div>
        <h3 className="font-medium">Discount</h3>
        <select value={discountOption} onChange={handleDiscountChange} className="border rounded p-1 w-full bg-gray-100">
          <option value="none">No Discount Filter</option>
          <option value="less-than-10">Less than 10%</option>
          <option value="10">10% off or more</option>
          <option value="20">20% off or more</option>
          <option value="30">30% off or more</option>
          <option value="40">40% off or more</option>
          <option value="50">50% off or more</option>
        </select>
      </div>

      <div>
        <h3 className="font-medium">Brand</h3>
        <input
          type="text"
          value={brand}
          onChange={handleBrandChange}
          placeholder="Brand Name"
          className="border rounded p-1 w-full bg-gray-100"
        />
        {/* Autocomplete dropdown */}
        {isDropdownOpen && filteredBrands.length > 0 && (
          <ul ref={dropdownRef} className="absolute bg-white border rounded shadow-lg z-10 mt-1 w-64">
            {filteredBrands.map((b, index) => (
              <li
                key={index}
                onClick={() => handleBrandSelect(b)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
