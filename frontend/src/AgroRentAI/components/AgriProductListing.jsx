import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import productsBg from "../rent-assets/productsBg.png"

const AgriProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
      }
    };
    fetchProducts();
  }, []);

  // Framer Motion animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 mt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${productsBg})` }}>

      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Agricultural Products
      </motion.h1>

      {error ? (
        <motion.p className="text-red-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-2 border-green-500 rounded-lg shadow-lg overflow-hidden"
            >
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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
