import React, { useState } from 'react';
import img1 from "../../assets/crops/test1.png";

const SoilMoistureCalculator = () => {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [soilType, setSoilType] = useState('');
  const [calculatedMoisture, setCalculatedMoisture] = useState(null);
  const [error, setError] = useState(null);

  const calculateSoilMoisture = () => {
    const rain = parseFloat(rainfall);
    const temp = parseFloat(temperature);

    // Basic validation for inputs
    if (!rain || !temp || rain < 0 || temp < 0) {
      setError("Please enter valid positive values for rainfall and temperature.");
      setCalculatedMoisture(null);
      return;
    }

    // Basic validation for soil type
    if (!soilType) {
      setError("Please select a valid soil type.");
      setCalculatedMoisture(null);
      return;
    }

    setError(null);

    // Example calculation logic based on rainfall, temperature, and soil type
    let baseMoisture;

    // Base moisture level based on soil type
    if (soilType === 'clay') {
      baseMoisture = 30; // Example base moisture for clay soil
    } else if (soilType === 'loam') {
      baseMoisture = 25; // Example base moisture for loam soil
    } else if (soilType === 'sandy') {
      baseMoisture = 20; // Example base moisture for sandy soil
    }

    // Adjust the base moisture based on rainfall and temperature
    const moistureFromRain = rain * 0.5; // Assuming rainfall contributes directly to moisture
    const moistureLossFromTemperature = temp * 0.2; // Assuming temperature affects moisture loss

    // Calculate final soil moisture
    const finalMoisture = baseMoisture + moistureFromRain - moistureLossFromTemperature;

    // Ensure moisture does not exceed 100%
    const adjustedMoisture = Math.min(100, Math.max(0, finalMoisture));
    
    setCalculatedMoisture(adjustedMoisture.toFixed(2));
  };


  return (
    <div
      className="flex items-center justify-center min-h-screen p-24 pt-40"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black opacity-40" />
      
      {/* Glassmorphism effect on the form */}
      <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Soil Moisture Calculator
        </h2>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            />
            <label
              className="text-green-500 font-semibold absolute left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg"
            >
              Rainfall (mm)
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            />
            <label
              className="text-green-500 font-semibold absolute left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg"
            >
              Temperature (°C)
            </label>
          </div>

          <div className="relative">
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            >
              <option value="">Select Soil Type</option>
              <option value="clay">Clay</option>
              <option value="loam">Loam</option>
              <option value="sandy">Sandy</option>
            </select>
            <label
              className="text-green-500 font-semibold absolute left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg"
            >
              Soil Type
            </label>
          </div>

          <button
            onClick={calculateSoilMoisture}
            type="button"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Calculate Soil Moisture
          </button>
        </form>

        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
        {calculatedMoisture !== null && !error && (
          <div className="mt-6 p-4 bg-green-200 rounded-md">
            <p className="text-green-800 font-semibold">
              Calculated Soil Moisture: <span className="text-green-600">{calculatedMoisture}%</span>
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default SoilMoistureCalculator;
