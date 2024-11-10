

import { useState } from 'react'

const dummyStories = [
  {
    id: 1,
    name: "Vivek",
    location: "New Delhi, India",
    cropType: "Organic Vegetables",
    technology: "Hydroponics",
    summary: "Increased yield by 40% using hydroponic systems",
    fullStory: "John Doe, a third-generation farmer from California, embraced hydroponic technology to grow organic vegetables. Despite initial challenges, he persevered and saw a 40% increase in yield within the first year. His success has inspired many local farmers to adopt sustainable practices.",
    image: "https://media.istockphoto.com/id/1166954334/photo/portrait-of-happy-senior-farmer.jpg?s=612x612&w=0&k=20&c=dn2yLIXXkXSWTsv2HdEiJHqSyQhbNT77SHc0dxetUrI="
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Andalusia, Spain",
    cropType: "Olive Trees",
    technology: "Precision Agriculture",
    summary: "Reduced water usage by 30% with precision irrigation",
    fullStory: "Maria Garcia, an olive farmer from Andalusia, implemented precision agriculture techniques to optimize her irrigation systems. By using soil sensors and weather data, she reduced water usage by 30% while maintaining high-quality olive production. Her story showcases the power of technology in preserving traditional farming practices.",
    image: "https://st5.depositphotos.com/4435155/66403/i/1600/depositphotos_664032036-stock-photo-portrait-female-farmer-who-cultivating.jpg"
  },
  {
    id: 3,
    name: "Raj Patel",
    location: "Gujarat, India",
    cropType: "Cotton",
    technology: "Organic Farming",
    summary: "Transitioned to organic cotton, increasing profit margins",
    fullStory: "Raj Patel, a cotton farmer from Gujarat, made the bold decision to transition to organic farming methods. Despite initial yield reductions, he persevered and saw increased profit margins due to premium pricing for organic cotton. His success has led to a community-wide shift towards sustainable farming practices in his region.",
    image: "https://img.etimg.com/thumb/width-420,height-315,imgsize-23777,resizemode-75,msid-13090201/opinion/interviews/science-of-food-is-hijacked-to-highest-bidder-raj-patel/new-section/raj-patel.jpg"
  }
]

export default function FarmerSuccessStories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStory, setSelectedStory] = useState(null)

  const filteredStories = dummyStories.filter(story =>
    story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.technology.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Farmer Success Stories</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <p className="text-lg">
            Discover inspiring stories of farmers who have embraced sustainable practices and innovative technologies to transform their agricultural journey.
          </p>
        </section>

        <section className="mb-8">
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full p-2 border border-green-300 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <div key={story.id} className="bg-white border border-green-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={story.image} alt={story.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{story.location}</p>
                <p className="text-sm text-gray-600 mb-2">{story.cropType} | {story.technology}</p>
                <p className="text-gray-700 mb-4">{story.summary}</p>
                <button
                  onClick={() => setSelectedStory(story)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedStory.name}'s Story</h2>
            <img src={selectedStory.image} alt={selectedStory.name} className="w-full h-64 object-cover mb-4 rounded" />
            <p className="text-gray-700 mb-4">{selectedStory.fullStory}</p>
            <button
              onClick={() => setSelectedStory(null)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
    </div>
  )
}