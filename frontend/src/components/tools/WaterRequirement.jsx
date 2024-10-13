import React, { useState } from 'react';
import img1 from "../../assets/crops/test1.png";

const WaterRequirementCalculator = () => {
  const [soilType, setSoilType] = useState('');
  const [cropType, setCropType] = useState('');
  const [area, setArea] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [waterRequirement, setWaterRequirement] = useState(null);
  const [error, setError] = useState(null);

  const calculateWaterRequirement = () => {
    const fieldArea = parseFloat(area);
    const temp = parseFloat(temperature);
    const rain = parseFloat(rainfall);

    // Basic validation for inputs
    if (!fieldArea || fieldArea <= 0 || !temp || temp < 0 || !rain || rain < 0) {
      setError("Please enter valid positive values for area, temperature, and rainfall.");
      setWaterRequirement(null);
      return;
    }

    // Basic validation for soil type and crop type
    if (!soilType || !cropType) {
      setError("Please select valid soil type and crop type.");
      setWaterRequirement(null);
      return;
    }

    setError(null);

    // Base water requirement per hectare based on crop type
    let baseWaterRequirement = 0;

    if (cropType === 'Wheat') {
      baseWaterRequirement = 500; // Example value in liters per hectare
    } else if (cropType === 'Corn') {
      baseWaterRequirement = 600; // Example value in liters per hectare
    } else if (cropType === 'Rice') {
      baseWaterRequirement = 700; // Example value in liters per hectare
    }

    // Adjust the base water requirement based on soil type
    if (soilType === 'clay') {
      baseWaterRequirement *= 1.2; // Example adjustment for clay soil
    } else if (soilType === 'loam') {
      baseWaterRequirement *= 1.0; // No adjustment for loam soil
    } else if (soilType === 'sandy') {
      baseWaterRequirement *= 0.8; // Example adjustment for sandy soil
    }

    // Calculate additional water needed based on temperature and rainfall
    const moistureAdjustment = rain > 50 ? -0.1 * baseWaterRequirement : 0; // Reduce requirement if rainfall is high
    const temperatureAdjustment = temp > 30 ? 0.2 * baseWaterRequirement : 0; // Increase requirement if temp is high

    // Final water requirement calculation
    const finalWaterRequirement = (baseWaterRequirement + temperatureAdjustment - moistureAdjustment) * fieldArea;

    setWaterRequirement(finalWaterRequirement.toFixed(2)); // Round to 2 decimal places
  };


  return (
    <div
      className="flex items-center justify-center min-h-screen p-24 pt-40"
      style={{
        backgroundImage: `url(${img1})`, // Add your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Glassmorphism effect on the form */}
      <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Water Requirement Calculator
        </h2>

        {/* Soil Type */}
        <div className="relative mb-6">
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
        </div>

        {/* Crop Type */}
        <div className="relative mb-6">
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
          >
            <option value="" className='text-green-500'>Select Crop Type</option>
            <option value="Wheat">Wheat</option>
            <option value="Corn">Corn</option>
            <option value="Rice">Rice</option>
          </select>
        </div>

        {/* Field Area */}
        <div className="relative mb-6">
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            placeholder=" "
          />
          <label className="text-green-500 bg-white absolute font-semibold left-2 -top-2.5  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg">
            Field Area (hectares)
          </label>
        </div>

        {/* Temperature */}
        <div className="relative mb-6">
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            placeholder=" "
          />
          <label className="text-green-500 bg-white absolute font-semibold left-2 -top-2.5  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg">
            Temperature (°C)
          </label>
        </div>

        {/* Rainfall */}
        <div className="relative mb-6">
          <input
            type="number"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
            className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            placeholder=" "
          />
          <label className="text-green-500 bg-white absolute font-semibold left-2 -top-2.5  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg">
            Rainfall (mm)
          </label>
        </div>

        <button
          onClick={calculateWaterRequirement}
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Calculate Water Requirement
        </button>

        {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
        {waterRequirement !== null && !error && (
          <p className="mt-6 text-white font-semibold">
            Water Required: <span className="text-green-300">{waterRequirement} liters</span>
          </p>
        )}
      </div>

    </div>
  );
};

export default WaterRequirementCalculator;
