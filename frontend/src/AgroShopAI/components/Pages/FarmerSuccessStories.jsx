export default function FarmerSuccessStories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  const filteredStories = dummyStories.filter(
    (story) =>
      story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.technology.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <p className="text-lg">
            Discover inspiring stories of farmers who have embraced sustainable
            practices and innovative technologies to transform their
            agricultural journey.
          </p>
        </section>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={setSelectedStory}
            />
          ))}
        </section>
      </main>

      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
}
