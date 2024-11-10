function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <section className="mb-8">
      <input
        type="text"
        placeholder="Search stories..."
        className="w-full p-2 border border-green-300 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </section>
  );
}
