import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./sub-components/ProductCard";
import PriceCalculator from "./sub-components/PriceCalculator";
import Recommendations from "./sub-components/Recommendations";
import CompareProducts from "./sub-components/CompareProducts";
import SearchBar from "./sub-components/SearchBar";
import ProductModal from "./sub-components/ProductModal";

// Mock Data (instead of fetching from API)
const mockProducts = [
  {
    _id: "1",
    name: "Tractor",
    description: "A high-performance tractor for large farms.",
    price: 100,
    image: "/rent-assets/tractor.png",
    seller: { 
      name: "John Doe", 
      contact: "123-456-7890", 
      location: "California",
      coordinates: { lat: 36.7783, lon: -119.4179 }, // Example coordinates
    },
    category: ["Farming", "Heavy Equipment"],
    rentalDurationOptions: ["hourly", "daily", "weekly"],
    availabilityStatus: "available", // Options: "available", "rented", "maintenance"
    rating: 4.5, // Added rating for product
  },
  {
    _id: "2",
    name: "Seeder",
    description: "Efficient seeding tool for fast planting.",
    price: 30,
    image: "/rent-assets/seeder.png",
    seller: { 
      name: "Jane Smith", 
      contact: "987-654-3210", 
      location: "Texas",
      coordinates: { lat: 31.9686, lon: -99.9018 },
    },
    category: ["Farming", "Planting Tools"],
    rentalDurationOptions: ["daily", "weekly"],
    availabilityStatus: "rented", // Currently rented
    rating: 4.0,
  },
  {
    _id: "3",
    name: "Sprayer",
    description: "High-pressure sprayer for pesticides.",
    price: 40,
    image: "/rent-assets/sprayer.png",
    seller: { 
      name: "Alice Brown", 
      contact: "456-789-1230", 
      location: "Florida",
      coordinates: { lat: 27.9944, lon: -81.7603 },
    },
    category: ["Farming", "Pesticide Tools"],
    rentalDurationOptions: ["hourly", "daily", "weekly"],
    availabilityStatus: "available",
    rating: 4.8,
  },
  {
    _id: "4",
    name: "Plow",
    description: "Heavy-duty plow for tilling large plots.",
    price: 70,
    image: "/rent-assets/plow.png",
    seller: { 
      name: "Bob Green", 
      contact: "654-321-9870", 
      location: "Ohio",
      coordinates: { lat: 40.4173, lon: -82.9071 },
    },
    category: ["Farming", "Tillage Tools"],
    rentalDurationOptions: ["daily", "weekly"],
    availabilityStatus: "maintenance", // Under maintenance
    rating: 4.2,
  },
];

const AgriProductListing = () => {
  const [products, setProducts] = useState(mockProducts);  // Use mock data here
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Normally, here we would fetch data from an API, but we'll use mock data instead.
    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get("https://api.example.com/products");
    //     setProducts(response.data);
    //   } catch (err) {
    //     console.error("Error fetching products:", err);
    //     setError("Error fetching products");
    //   }
    // };
    // fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 mt-16 bg-cover bg-center">
      
      <motion.h1
        className="text-4xl font-bold text-green-700 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Agricultural Products for Rent
      </motion.h1>

      <SearchBar />

      {error ? (
        <motion.p className="text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </motion.div>
          ))}
        </div>
      )}

      <PriceCalculator />

      <Recommendations products={products} />

      <CompareProducts products={products} />

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgriProductListing;
