function StoryModal({ story, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{story.name}'s Story</h2>
        <img
          src={story.image}
          alt={story.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p className="text-gray-700 mb-4">{story.fullStory}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
