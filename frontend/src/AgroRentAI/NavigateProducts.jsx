import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Star } from 'lucide-react';
import img1 from "../assets/116.jpg"
import img2 from "../assets/109.jpg"
import img3 from "../assets/105.jpg"
import img4 from "../assets/106.jpg"

const products = [
  {
    id: 1,
    name: 'Agricultural Drone',
    description: 'High-precision drone for crop monitoring, spraying, and data collection.',
    price: 2500,
    image: 'https://www.shutterstock.com/image-photo/precision-farming-drone-600391036.html', // Agricultural Drone
    rating: 4.8,
    category: ['Farming Technology', 'Agriculture'] // Can belong to multiple categories
  },
  {
    id: 2,
    name: 'Self-Driving Tractor',
    description: 'Autonomous tractor with GPS guidance for efficient and precise farming.',
    price: 120000,
    image: 'https://www.shutterstock.com/image-photo/self-driving-tractor-field-1922021274.html', // Self-Driving Tractor
    rating: 4.6,
    category: ['Farming Equipment', 'Agriculture']
  },
  {
    id: 3,
    name: 'Robotic Harvester',
    description: 'Automated harvester for fast and efficient crop collection.',
    price: 85000,
    image: 'https://www.shutterstock.com/image-photo/robotic-harvester-picking-fruits-1609956053.html', // Robotic Harvester
    rating: 4.4,
    category: ['Farming Equipment', 'Agriculture']
  },
  {
    id: 4,
    name: 'Precision Seeding Machine',
    description: 'Advanced seeder for accurate seed depth and spacing control.',
    price: 7000,
    image: 'https://www.shutterstock.com/image-photo/precision-seeding-machine-field-1891836431.html', // Precision Seeding Machine
    rating: 4.7,
    category: ['Farming Equipment', 'Agriculture']
  },
  {
    id: 5,
    name: 'Soil Moisture Sensor Network',
    description: 'Wireless sensors for real-time monitoring of soil moisture levels.',
    price: 150,
    image: 'https://www.shutterstock.com/image-photo/soil-moisture-sensor-network-1665156058.html', // Soil Moisture Sensor Network
    rating: 4.2,
    category: ['Farming Technology', 'Agriculture']
  },
  {
    id: 6,
    name: 'Automated Irrigation System',
    description: 'Smart irrigation system for efficient water management based on soil moisture data.',
    price: 800,
    image: 'https://www.shutterstock.com/image-photo/automated-irrigation-system-1037615663.html', // Automated Irrigation System
    rating: 4.5,
    category: ['Farming Technology', 'Agriculture']
  },
];

const categories = [
  'All', 
  'Farming Technology', 
  'Farming Equipment', 
  'Agriculture', 
  'Sustainable Farming', 
  'Irrigation Systems', 
  'Soil Health', 
  'Crop Monitoring', 
  'Livestock Management', 
  'Smart Farming Solutions'
];
  

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-700">${product.price}/day</span>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
          Rent Now
        </button>
      </div>
      <div className="flex items-center mt-2">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
      </div>
    </div>
  </div>
);

const FilterSidebar = () => (
  <div className="w-64 bg-green-50 p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-4 text-green-800">Filters</h2>
    <div className="mb-4">
      <h3 className="font-medium mb-2 text-green-700">Category</h3>
      {categories.map((category) => (
        <div key={category} className="flex items-center mb-2">
          <input type="checkbox" id={category} className="mr-2 text-green-500 focus:ring-green-400" />
          <label htmlFor={category} className="text-green-800">{category}</label>
        </div>
      ))}
    </div>
    <div className="mb-4">
      <h3 className="font-medium mb-2 text-green-700">Price Range</h3>
      <input type="range" min="0" max="100" className="w-full accent-green-500" />
      <div className="flex justify-between text-green-800">
        <span>$0</span>
        <span>$100</span>
      </div>
    </div>
  </div>
);

const Banner = ({ title, description, backgroundImage }) => {
    return (
      <div
        className="relative flex items-center justify-center h-64 bg-cover bg-center mb-4 rounded-xl"
        style={{ backgroundImage: `url(${img1})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div> {/* Optional overlay for better text contrast */}
        <div className="relative text-center text-white p-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2">{description}</p>
        </div>
      </div>
    );
  };

  const BannerCarousel = ({ banners }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };
  
    return (
      <div className="relative mx-auto">
        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-center h-64 bg-cover bg-center mb-4 rounded-xl"
          style={{
            backgroundImage: `url(${banners[currentSlide].backgroundImage})`,
          }}
        >
          {/* Overlay for better text contrast */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>
          
          {/* Slide Content */}
          <div className="relative text-center text-white p-4">
            <h1 className="text-3xl font-bold">{banners[currentSlide].title}</h1>
            <p className="mt-2">{banners[currentSlide].description}</p>
          </div>
          
          {/* Previous and Next Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 text-black hover:bg-opacity-50 px-4 py-2 rounded-full"
            onClick={prevSlide}
          >
            &#8592;
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 text-black hover:bg-opacity-50 px-4 py-2 rounded-full"
            onClick={nextSlide}
          >
            &#8594;
          </button>
        </div>
        
        {/* Dots for navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {banners.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                idx === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(idx)}
            ></span>
          ))}
        </div>
      </div>
    );
  };

const RentalMarketplace = () => {
  const [sortBy, setSortBy] = useState('popularity');

  return (
    <div className="min-h-screen bg-green-50 pb-20 z-10">
      <header className="bg-green-600 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">AgroRent AI</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
      <BannerCarousel
        banners={[
          {
            title: "Efficient Equipment Rentals",
            description: "Rent high-quality agricultural machinery tailored to your specific farming needs, without long-term commitments.",
            backgroundImage: img1
          },
          {
            title: "Expert Support at Your Fingertips",
            description: "Get access to expert advice and customer support 24/7 to ensure your farming operations run smoothly.",
            backgroundImage: img2
          },
          {
            title: "Flexible Rental Plans",
            description: "Choose from daily, weekly, or monthly rental plans that fit your budget and timeline, making farming more affordable.",
            backgroundImage: img3
          },
          {
            title: "Sustainable Farming Solutions",
            description: "Leverage modern, eco-friendly equipment that helps reduce carbon footprint while improving productivity.",
            backgroundImage: img4
          }
        ]}
      />


        <div className="flex mb-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 mr-2 bg-white rounded-full shadow-sm hover:bg-green-100 transition-colors text-green-700"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row py-10">
          <FilterSidebar />
          <div className="flex-1 md:ml-8 mt-8 md:mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-800">Available Products</h2>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 text-green-700"
                >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <Banner 
          title="Need Help Choosing?" 
          description="Our expert team is here to assist you in finding the perfect rental equipment for your project." 
        />
      </main>
    </div>
  );
};

export default RentalMarketplace;