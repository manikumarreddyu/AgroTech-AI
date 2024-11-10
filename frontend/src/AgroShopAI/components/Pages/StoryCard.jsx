function StoryCard({ story, onClick }) {
  return (
    <div className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={story.image}
        alt={story.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
        <p className="text-sm text-gray-600 mb-2">{story.location}</p>
        <p className="text-sm text-gray-600 mb-2">
          {story.cropType} | {story.technology}
        </p>
        <p className="text-gray-700 mb-4">{story.summary}</p>
        <button
          onClick={() => onClick(story)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
