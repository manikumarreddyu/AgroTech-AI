const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Search and Filter</h2>
    <div className="flex flex-wrap items-center space-x-4">
      <input
        type="text"
        placeholder="Search tickets..."
        className="p-2 border border-gray-300 rounded flex-grow"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="p-2 border border-gray-300 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <select
        className="p-2 border border-gray-300 rounded"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  </div>
);

export default SearchAndFilter;
