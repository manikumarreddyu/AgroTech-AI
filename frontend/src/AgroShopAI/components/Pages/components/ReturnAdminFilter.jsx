import React from "react";

export default function ReturnFilter({ filter, setFilter }) {
  return (
    <div className="flex items-center">
      <label htmlFor="filter" className="mr-4 text-green-700">
        Filter by Status:
      </label>
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="All">All</option>
        <option value="Eligible">Eligible</option>
        <option value="Pending">Pending</option>
        <option value="Returned">Returned</option>
      </select>
    </div>
  );
}
