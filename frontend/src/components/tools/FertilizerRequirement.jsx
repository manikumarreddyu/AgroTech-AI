import React, { useState } from 'react';
import img1 from "../../assets/crops/test1.png"; // Change to your desired background image

const FertilizerRequirementsCalculator = () => {
  const [cropType, setCropType] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [fertilizerCostPerKg, setFertilizerCostPerKg] = useState('');
  const [totalFertilizer, setTotalFertilizer] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [error, setError] = useState(null);

  // Fertilizer rate per hectare based on crop type
  const fertilizerRates = {
    wheat: 100, // kg per hectare
    corn: 120,  // kg per hectare
    rice: 150,  // kg per hectare
  };

  const calculateFertilizer = () => {
    const areaVal = parseFloat(fieldArea);
    const costPerKg = parseFloat(fertilizerCostPerKg);
    const rate = fertilizerRates[cropType];

    if (!areaVal || !costPerKg || areaVal <= 0 || costPerKg <= 0 || !rate) {
      setError("Please enter valid positive values for all fields.");
      setTotalFertilizer(null);
      setTotalCost(null);
      return;
    }

    setError(null);
    const fertilizerAmount = areaVal * rate;
    setTotalFertilizer(fertilizerAmount.toFixed(2));
    const cost = fertilizerAmount * costPerKg;
    setTotalCost(cost.toFixed(2));
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
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
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Fertilizer Requirements Calculator
        </h2>

        <form className="space-y-6">
          <div className="relative">
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
            >
              <option value="">Select Crop Type</option>
              <option value="wheat">Wheat</option>
              <option value="corn">Corn</option>
              <option value="rice">Rice</option>
            </select>
            <label
              htmlFor="cropType"
              className="
                absolute left-2 -top-4 
                bg-white bg-opacity-75 backdrop-blur-md 
                px-1 text-sm font-semibold 
                text-green-500 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600 
                rounded-lg
              "
            >
              Type of Crop
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              value={fieldArea}
              onChange={(e) => setFieldArea(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
              placeholder=""
            />
            <label
              className="text-green-500 absolute font-semibold left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 rounded-lg text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600"
            >
              Field Area (hectares)
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              value={fertilizerCostPerKg}
              onChange={(e) => setFertilizerCostPerKg(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
              placeholder=""
            />
            <label
              className="text-green-500 absolute font-semibold left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 rounded-lg text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600"
            >
              Fertilizer Cost per Kg
            </label>
          </div>

          <button
            onClick={calculateFertilizer}
            type="button"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200 shadow"
          >
            Calculate Fertilizer and Cost
          </button>
        </form>

        {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}
        {totalFertilizer !== null && !error && (
          <div className="mt-6 p-4 bg-green-200 rounded-md">
            <p className="text-green-800 font-semibold">
              Total Fertilizer Required: <span className="text-green-600">{totalFertilizer} kg</span>
            </p>
          </div>
        )}
        {totalCost !== null && !error && (
          <div className="mt-2 p-4 bg-green-200 rounded-md">
            <p className="text-green-800 font-semibold">
              Total Cost: <span className="text-green-600">${totalCost}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerRequirementsCalculator;