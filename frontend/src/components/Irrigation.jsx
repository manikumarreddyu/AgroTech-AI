'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplet, Sun, MapPin, Thermometer } from 'lucide-react';

// Import your images
import img2 from '../assets/102.jpg'; // Update the path as necessary

const soilTypes = ['Black', 'Clayey', 'Loamy', 'Red', 'Sandy'];
const cropTypes = ['Barley', 'Cotton', 'Ground Nuts', 'Maize', 'Millets', 'Oil Seeds', 'Paddy', 'Pulses', 'Sugarcane', 'Tobacco', 'Wheat'];

const items = [
  { type: 'advantage', text: 'Increases crop yield and quality.' },
  { type: 'disadvantage', text: 'Can be costly for small-scale farmers.' },
  { type: 'advantage', text: 'Optimizes water use and minimizes wastage.' },
  { type: 'disadvantage', text: 'Risk of over-irrigation leading to environmental issues.' },
  { type: 'advantage', text: 'Tailors predictions to specific soil and crop needs.' },
  { type: 'disadvantage', text: 'Dependence on predictions may reduce traditional knowledge.' },
  { type: 'advantage', text: 'Enhances farmer knowledge and decision-making.' },
  { type: 'disadvantage', text: 'Requires ongoing monitoring and adjustments to be effective.' },
];

export default function IrrigationSystem() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    Soil_Type: '',
    Crop_Type: '',
    Avg_Temperature: '',
    Geographical_Location: '',
    Moisture_Level: ''
  });
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePredictClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setResult("Optimal Irrigation");
    setShowResult(true);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-green-800 pt-20"
      >
        Irrigation System
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Card 1: About Irrigation System */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">About Irrigation System</h2>
          <img src={img2} alt="Irrigation Example 2" className="w-full h-48 object-cover mb-4 rounded" />
          <p className="text-green-800 mb-4">
            🌱 The Irrigation System transforms how farmers manage water application. It considers essential parameters like soil type, weather data, geographical location, and moisture levels.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-green-700">How it Works</h3>
          <ul className="list-disc list-inside text-green-800">
            <li>Analyze soil and environmental parameters for water needs.</li>
            <li>Get precise irrigation predictions based on data.</li>
            <li>Make informed decisions on water management.</li>
          </ul>
        </div>

        {/* Card 2: Predict Irrigation */}
        <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Predict Irrigation</h2>
          <form onSubmit={handlePredictClick} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="text-green-600" />
              <select onChange={(e) => handleChange('Soil_Type', e.target.value)} className="flex-1 border border-gray-300 rounded-md p-2">
                <option value="">Select Soil Type</option>
                {soilTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Droplet className="text-green-600" />
              <select onChange={(e) => handleChange('Crop_Type', e.target.value)} className="flex-1 border border-gray-300 rounded-md p-2">
                <option value="">Select Crop Type</option>
                {cropTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="text-green-600" />
              <input
                type="number"
                name="Avg_Temperature"
                value={formData.Avg_Temperature}
                onChange={(e) => handleChange('Avg_Temperature', e.target.value)}
                placeholder="Average Temperature"
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-green-600" />
              <input
                type="text"
                name="Geographical_Location"
                value={formData.Geographical_Location}
                onChange={(e) => handleChange('Geographical_Location', e.target.value)}
                placeholder="Geographical Location"
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="text-green-600" />
              <input
                type="number"
                name="Moisture_Level"
                value={formData.Moisture_Level}
                onChange={(e) => handleChange('Moisture_Level', e.target.value)}
                placeholder="Moisture Level"
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md p-2">
              Predict Irrigation
            </button>
          </form>
          {showResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-lg font-semibold">
                The Predicted Irrigation is <span className="text-xl text-green-600">{result}</span>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Advantages and Disadvantages */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Advantages and Disadvantages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: item.type === 'advantage' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border-l-4 ${item.type === 'advantage' ? 'border-green-500' : 'border-red-500'}`}>
                <div className="p-4">
                  <h3 className={`text-lg font-semibold mb-2 ${item.type === 'advantage' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'advantage' ? '✅ Advantage' : '❌ Disadvantage'}
                  </h3>
                  <p className="text-green-800">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
