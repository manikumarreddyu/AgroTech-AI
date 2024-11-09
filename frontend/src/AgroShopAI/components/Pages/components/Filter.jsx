import React, { useState } from "react";

export default function Filter({ onFilterChange }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [timeLeft, setTimeLeft] = useState("");

  const handleFilterChange = () => {
    const filterCriteria = {
      name,
      brand,
      priceRange,
      timeLeft,
    };
    console.log("Filter criteria:", filterCriteria); // Debugging step

    // Call onFilterChange with the filter criteria
    onFilterChange(filterCriteria);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-center text-green-800 mb-4">
        Filter Products
      </h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Search by brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min price"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="border rounded p-2 w-full"
          />
          <input
            type="number"
            placeholder="Max price"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <input
          type="number"
          placeholder="Time left in hours"
          value={timeLeft}
          onChange={(e) => setTimeLeft(e.target.value)}
          className="border rounded p-2"
        />
        <button
          onClick={handleFilterChange}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
