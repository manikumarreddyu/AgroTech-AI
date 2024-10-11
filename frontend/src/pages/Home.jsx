import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../assets/hero.png'; // Example image import for hero
import Features from '../components/Features';
import About from './About';
import Showcase from '../components/Showcase';
import TestimonialSlider from '../components/TestimonialSlider';
import FAQ from '../components/FAQ';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-green-50 to-green-100">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-4 md:py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl md:text-6xl pt-48">
            <span className="block">Welcome to AgroTech AI</span>
            <span className="block text-green-600">Revolutionizing Agriculture</span>
          </h1>
          <p className="max-w-md mx-auto mt-3 text-base text-green-800 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore AI-powered solutions tailored to enhance farming practices. From crop prediction to soil analysis,
            discover tools designed to optimize agricultural productivity.
          </p>
          <div className="mt-10 sm:flex sm:justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md shadow"
            >
              <Link
                to="/products"
                className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 md:py-4 md:text-lg md:px-10"
              >
                Explore Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <img
            src={heroImage}
            alt="AgroTech AI Hero"
            width={600}
            height={400}
            className="object-cover rounded-lg shadow-2xl"
          />
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">How It Works ?</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center z-10 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-green-700">Step 1: Data Collection</h3>
              <p className="mt-4 text-green-600">
                We gather real-time data on soil conditions, weather, and crop health using cutting-edge sensors and AI.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center z-10 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-green-700">Step 2: Analysis</h3>
              <p className="mt-4 text-green-600">
                Our AI models analyze the data to provide actionable insights on crop growth and health.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center z-10 shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-green-700">Step 3: Optimization</h3>
              <p className="mt-4 text-green-600">
                Based on the analysis, we recommend the best practices to improve crop yield and sustainability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Components */}
      <Features />
      <About />
      <Showcase />
      <TestimonialSlider />
      <FAQ />
    </div>
  );
}
