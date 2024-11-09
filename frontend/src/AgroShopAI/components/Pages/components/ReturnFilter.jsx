function ReturnFilter({ filter, setFilter }) {
  return (
    <div className="flex space-x-2">
      {["All", "Eligible", "Pending"].map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`px-4 py-2 rounded ${
            filter === status
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

export default ReturnFilter;
