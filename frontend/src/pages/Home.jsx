import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import heroImage from '../assets/hero.png';
import Features from '../components/Features';
import About from './About';
import Showcase from '../components/Showcase';
import TestimonialSlider from '../components/TestimonialSlider';
import FAQ from '../components/FAQ';
import { FaComment } from "react-icons/fa"; // Import the message icon
import "../styles/ChatbotButton.css";

export default function Home() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-green-50 to-green-100">
      {/* Main content */}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-4 md:py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-48"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl md:text-6xl">
            <span className="block">Welcome to AgroTech AI</span>
            <span className="block text-green-600">Revolutionizing Agriculture</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md mx-auto mt-3 text-base text-green-800 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Explore AI-powered solutions tailored to enhance farming practices. From crop prediction to soil analysis,
            discover tools designed to optimize agricultural productivity.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 sm:flex sm:justify-center"
          >
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
          </motion.div>
        </motion.div>

        {/* Chatbot Button */}
        <div className="relative">
          <Link
            to="/chatbot"
            className="group fixed bottom-4 right-20 bg-green-500 rounded-full p-3 shadow-lg transition-transform transform hover:scale-110 animate-swing"
          >
            <FaComment className="text-white text-3xl" />
            <span className="absolute -top-10 -right-4 bg-white text-green-500 text-sm rounded-md px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blink-text">
              Try Our ChatBot
            </span>
          </Link>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <img
            src={heroImage}
            alt="AgroTech AI Hero"
            width="100%"  
            className="object-cover rounded-lg" 
          />
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center">How It Works ?</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Data Collection', 'Analysis', 'Optimization'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-b from-green-100 to-green-200 p-6 rounded-lg text-center z-10 shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-green-700">Step {index + 1}: {step}</h3>
                <p className="mt-4 text-green-600">
                  {index === 0 && 'We gather real-time data on soil conditions, weather, and crop health using cutting-edge sensors and AI.'}
                  {index === 1 && 'Our AI models analyze the data to provide actionable insights on crop growth and health.'}
                  {index === 2 && 'Based on the analysis, we recommend the best practices to improve crop yield and sustainability.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Features />
      </motion.div>

      {/* About Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <About />
      </motion.div>

      {/* Showcase Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <Showcase />
      </motion.div>

      {/* Testimonial Slider Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <TestimonialSlider />
      </motion.div>

      {/* FAQ Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <FAQ />
      </motion.div>
    </div>
  );
}
