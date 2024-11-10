import React from "react";

export default function TicketFilters({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      >
        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="text"
        placeholder="Search by ID or Subject"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
      />
    </div>
  );
}
