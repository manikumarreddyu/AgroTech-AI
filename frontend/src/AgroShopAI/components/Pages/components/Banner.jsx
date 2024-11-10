export default function Banner() {
  return (
    <div className="bg-green-100 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-green-800 mb-4 leading-tight md:text-5xl">
          Trending in AgroTech
        </h2>

        {/* Description */}
        <p className="text-xl text-green-700 mb-6 md:text-2xl">
          Discover the latest and most popular agricultural innovations! Stay
          ahead with new technologies.
        </p>

        {/* Call to Action */}
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition duration-300">
            Learn More
          </button>
          <button className="bg-transparent border-2 border-green-500 text-green-500 py-3 px-6 rounded-lg text-lg hover:bg-green-50 transition duration-300">
            Explore Products
          </button>
        </div>

        {/* Image Section (Optional for added visual appeal) */}
        <div className="mt-8">
          <img
            src="/assets/agriculture-banner.jpg"
            alt="Agriculture Innovations"
            className="mx-auto w-full h-[60vh] object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
