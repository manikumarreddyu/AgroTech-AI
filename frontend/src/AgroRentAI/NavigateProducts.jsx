import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, Star } from 'lucide-react';
import img1 from "../assets/116.jpg";
import img2 from "../assets/112.jpg";
import img3 from "../assets/106.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./index.css"

// Assuming the categories list is the same
const categories = ['All', 'Farming Technology', 'Farming Equipment', 'Agriculture'];


const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleRentNowClick = () => {
    navigate(`/RentProductDetails/${product._id}`); // Assuming product.id uniquely identifies the product
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-700">${product.price}/day</span>
          <button
            onClick={handleRentNowClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
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
};

const FilterSidebar = ({ selectedCategory, setSelectedCategory, priceRange, setPriceRange }) => (
  <div className="w-64 bg-green-50 p-4 rounded-lg">
    <h2 className="text-lg font-semibold mb-4 text-green-800">Filters</h2>
    <div className="mb-4">
      <h3 className="font-medium mb-2 text-green-700">Category</h3>
      {categories.map((category) => (
        <div key={category} className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id={category} 
            className="mr-2 text-green-500 focus:ring-green-400"
            checked={selectedCategory === category}
            onChange={() => setSelectedCategory(category)}
          />
          <label htmlFor={category} className="text-green-800">{category}</label>
        </div>
      ))}
    </div>
    <div className="mb-4">
      <h3 className="font-medium mb-2 text-green-700">Price Range</h3>
      <input 
        type="range" 
        min="0" 
        max="10000000" 
        className="w-full accent-green-500"
        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} 
      />
      <div className="flex justify-between text-green-800">
        <span>$0</span>
        <span>${priceRange.max || 100}</span>
      </div>
    </div>
  </div>
);

// Array of banners with title, description, and image
const banners = [
  {
    image: img1,
    title: 'Welcome to AgriRent',
    description: 'Rent agricultural equipment with ease.',
  },
  {
    image: img2,
    title: 'Explore Our Products',
    description: 'Browse a wide range of farming tools and machinery.',
  },
  {
    image: img3,
    title: 'Get Started Today!',
    description: 'Sign up and start renting agricultural equipment today.',
  },
];


const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!transitioning) {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }
    }, 3000); 


    return () => clearInterval(intervalId);
  }, [transitioning]);

  const goToBanner = (index) => {
    setTransitioning(true);
    setCurrentBannerIndex(index);
    setTimeout(() => setTransitioning(false), 500); 
  };

  return (
    <div className="relative">
      {/* Banner Wrapper */}
      <div className="relative flex items-center justify-center h-64 bg-cover bg-center rounded-xl overflow-hidden transition-all duration-500 mb-6"
        style={{ backgroundImage: `url(${banners[currentBannerIndex].image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

        {/* Text Content */}
        <div className="relative text-center text-white px-4 py-6 z-10">
          <h1 className="text-3xl font-bold">{banners[currentBannerIndex].title}</h1>
          <p className="mt-2">{banners[currentBannerIndex].description}</p>
        </div>
      </div>

      {/* Dots for Indicating Active Banner */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-green-600' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>

      {/* Swipe/Scroll Functionality */}
      <div
        className="absolute inset-0"
        onTouchStart={(e) => {
          const startX = e.touches[0].clientX;
          const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) {
              setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
            } else if (endX - startX > 50) {
              setCurrentBannerIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd);
        }}
        onClick={() => setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)}  
      />
    </div>
  );
};

const RentalMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ApiUrl}/api/rent-products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    // Apply category filter
    if (selectedCategory !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category.includes(selectedCategory));
    }

    // Apply price range filter
    updatedProducts = updatedProducts.filter(product => product.price <= priceRange.max);

    // Apply sorting
    if (sortBy === 'price-low-high') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, priceRange, sortBy]);



  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category.includes(selectedCategory));
    }

    updatedProducts = updatedProducts.filter(product => product.price <= priceRange.max);

    // Filter products based on search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low-high') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]); 


  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                value={searchQuery} // Bind the input value to the state
                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
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
        <Banner
          title="Spring Sale: 20% Off All Garden Tools"
          description="Get ready for the gardening season with our amazing discounts!"
        />

        <div className="flex mb-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 mr-2 rounded-full shadow-md mb-2 hover:bg-green-100 transition-colors ${selectedCategory === category ? 'bg-green-200' : 'bg-white'} text-green-700`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row py-10">
          <FilterSidebar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
          />
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
              {filteredProducts.map((product) => (
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
