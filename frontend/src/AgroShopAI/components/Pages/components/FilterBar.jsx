import React from 'react'

export default function FilterBar({ handleFilterChange }) {
  return (
    <div className="flex mb-6">
      <select name="status" onChange={handleFilterChange} className="border rounded px-4 py-2 mr-4">
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="expired">Expired</option>
      </select>
      <input
        type="text"
        name="discountType"
        onChange={handleFilterChange}
        placeholder="Discount Type"
        className="border rounded px-4 py-2 mr-4"
      />
      <input
        type="date"
        name="dateRange"
        onChange={handleFilterChange}
        className="border rounded px-4 py-2"
      />
    </div>
  )
}
