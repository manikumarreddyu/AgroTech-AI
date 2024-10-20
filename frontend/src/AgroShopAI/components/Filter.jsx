import React, { useState, useEffect, useRef } from "react";

const Filter = ({ items, setFilteredItems }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("none"); // Default to "none"
  const [brand, setBrand] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [discountOption, setDiscountOption] = useState("none");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const brands = [...new Set(items.map((item) => item.brand.name))]; // Access brand.name
    setBrandList(brands);
  }, [items]);

  useEffect(() => {
    filterItems(priceRange, sortOption, brand, discountOption);
  }, [priceRange, sortOption, brand, discountOption]);

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
    const filtered = brandList.filter((b) =>
      b.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered);
    setIsDropdownOpen(value.length > 0 && filtered.length > 0);
  };

  const handleBrandSelect = (selectedBrand) => {
    setBrand(selectedBrand);
    setFilteredBrands([]);
    setIsDropdownOpen(false);
  };

  const handleDiscountChange = (e) => {
    setDiscountOption(e.target.value);
  };

  const filterItems = (priceRange, sortOption, brand, discountOption) => {
    let filteredItems = items.filter((item) => {
      const itemBrand = item.brand.name.toLowerCase(); // Access brand.name
      const discountPercent = parseInt(item.offer) || 0; // Ensure offer is parsed correctly
      
      // Calculate salePrice
      const salePrice = item.price * (1 - (item.offer / 100)); 
  
      return (
        (priceRange.min === "" || salePrice >= Number(priceRange.min)) && // Use salePrice for filtering
        (priceRange.max === "" || salePrice <= Number(priceRange.max)) && // Use salePrice for filtering
        (brand ? itemBrand.includes(brand.toLowerCase()) : true) &&
        (discountOption === "none" ||
          (discountOption === "less-than-10" && discountPercent < 10) ||
          (discountOption === "10" && discountPercent >= 10) ||
          (discountOption === "20" && discountPercent >= 20) ||
          (discountOption === "30" && discountPercent >= 30) ||
          (discountOption === "40" && discountPercent >= 40) ||
          (discountOption === "50" && discountPercent >= 50))
      );
    });
  
    // Sorting logic remains the same
    if (sortOption === "price-asc") {
      filteredItems.sort((a, b) => (a.price * (1 - (a.offer / 100))) - (b.price * (1 - (b.offer / 100)))); // Sort by salePrice
    } else if (sortOption === "price-desc") {
      filteredItems.sort((a, b) => (b.price * (1 - (b.offer / 100))) - (a.price * (1 - (a.offer / 100)))); // Sort by salePrice
    } else if (sortOption === "newly-added") {
      filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Use createdAt for newly added
    }
  
    setFilteredItems(filteredItems);
  };
  

  return (
    <div className="flex flex-col gap-4 p-4 border-2 rounded-lg bg-white ">
      <div className="bg-white p-2 rounded-lg">
        <h2 className="font-semibold text-lg border-b-2 mb-4">Filter</h2>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">&#9830; Price Range</h3>
            {(priceRange.min !== "" || priceRange.max !== "") && (
              <button
                onClick={() => setPriceRange({ min: "", max: "" })}
                className="text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-2">
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

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">&#9830; Sort By</h3>
            {sortOption !== "none" && (
              <button
                onClick={() => setSortOption("none")}
                className="text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              <input
                type="radio"
                value="price-asc"
                checked={sortOption === "price-asc"}
                onChange={handleSortChange}
                className="mr-2"
              />
              Price: Low to High
            </label>
            <label>
              <input
                type="radio"
                value="price-desc"
                checked={sortOption === "price-desc"}
                onChange={handleSortChange}
                className="mr-2"
              />
              Price: High to Low
            </label>
            <label>
              <input
                type="radio"
                value="newly-added"
                checked={sortOption === "newly-added"}
                onChange={handleSortChange}
                className="mr-2"
              />
              Newly Added
            </label>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">&#9830; Discount</h3>
            {discountOption !== "none" && (
              <button
                onClick={() => setDiscountOption("none")}
                className="text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <label>
              <input
                type="radio"
                value="less-than-10"
                checked={discountOption === "less-than-10"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              Less than 10%
            </label>
            <label>
              <input
                type="radio"
                value="10"
                checked={discountOption === "10"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              10% off or more
            </label>
            <label>
              <input
                type="radio"
                value="20"
                checked={discountOption === "20"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              20% off or more
            </label>
            <label>
              <input
                type="radio"
                value="30"
                checked={discountOption === "30"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              30% off or more
            </label>
            <label>
              <input
                type="radio"
                value="40"
                checked={discountOption === "40"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              40% off or more
            </label>
            <label>
              <input
                type="radio"
                value="50"
                checked={discountOption === "50"}
                onChange={handleDiscountChange}
                className="mr-2"
              />
              50% off or more
            </label>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">&#9830; Brand</h3>
            {brand && (
              <button
                onClick={() => setBrand("")}
                className="text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <input
            type="text"
            value={brand}
            onChange={handleBrandChange}
            placeholder="Brand Name"
            className="border rounded p-1 w-full bg-gray-100 mt-2"
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && filteredBrands.length > 0 && (
            <ul className="border rounded bg-white mt-2 max-h-48 overflow-y-auto z-10">
              {filteredBrands.map((b) => (
                <li
                  key={b}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleBrandSelect(b)}
                >
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
