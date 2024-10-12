import React from 'react';
import aiImage from '../assets/ai.jpg'; // Import the image

const AdvantagesDisadvantages = () => {
  const points = [
    "Predicting the best crop based on soil and climate data",
    "Real-time crop monitoring using AI-powered sensors and drones",
    "Precision farming for optimizing irrigation and pesticide usage",
    "Detailed soil health analysis to enhance crop growth and productivity",
    "Accurate weather forecasting to plan planting, irrigation, and harvesting",
    "Advanced yield prediction models for better resource planning",
    "Automated detection of pests and weeds for targeted intervention",
    "Increased labor efficiency through AI-powered robotic systems",
    "Optimizing the agricultural supply chain from farm to market",
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-green-100">
      <h2 className="text-4xl font-extrabold text-green-700 text-center mb-8">Why AI in Agriculture ?</h2>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <img src={aiImage} alt="AI in Agriculture" className="w-2/4 h-auto rounded-lg shadow-lg" />
        </div>

        {/* Points Section */}
        <div className="md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transition-shadow duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-1">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">AI Solutions</h3>
            <ul className="list-disc list-inside text-green-600 space-y-2">
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesDisadvantages;
