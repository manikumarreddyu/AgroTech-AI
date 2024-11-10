import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs"; // Importing an icon for CTA button
import { Carousel } from "react-responsive-carousel"; // Carousel package
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styling

const Recommendations = ({ products }) => {
  const recommended = products.slice(0, 8); // More recommendations for a full carousel

  return (
    <div className="my-10 py-10 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg">
      <h3 className="text-3xl font-semibold text-center text-green-800 mb-6">Recommended for You</h3>

      {/* Carousel for recommended products */}
      <Carousel
        showArrows
        infiniteLoop
        showThumbs={false}
        autoPlay
        interval={4000}
        transitionTime={600}
        className="max-w-6xl mx-auto"
      >
        {recommended.map((product) => (
          <motion.div
            key={product._id}
            className="p-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </Carousel>

      {/* "View All" CTA button */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all">
          View All <BsArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Recommendations;
