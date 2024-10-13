import React, { useState } from 'react';
import img1 from "../../assets/crops/test1.png";

const CropYieldCalculator = () => {
  const [fieldSize, setFieldSize] = useState(0);
  const [plantPopulation, setPlantPopulation] = useState(0);
  const [yieldPerPlant, setYieldPerPlant] = useState(0);
  const [totalYield, setTotalYield] = useState(null);

  const calculateYield = () => {
    const result = fieldSize * plantPopulation * yieldPerPlant;
    setTotalYield(result);
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen p-24 pt-40"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',       // Ensures the image covers the entire container
        backgroundPosition: 'center',   // Centers the image
        backgroundRepeat: 'no-repeat',  // Prevents tiling of the image
      }}
    >
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black opacity-40" />
      
      {/* Glassmorphism effect on the form */}
      <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Crop Yield Calculator
        </h2>

        <form className="space-y-6">
          <div className="relative">
            <input
              type="number"
              id="fieldSize"
              value={fieldSize}
              onChange={(e) => setFieldSize(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
              placeholder="Field Size"
            />
            <label
              htmlFor="fieldSize"
              className="text-green-500 font-semibold absolute left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 text-sm  transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg"
            >
              Field Size (hectares)
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              id="plantPopulation"
              value={plantPopulation}
              onChange={(e) => setPlantPopulation(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
              placeholder="Plant Population"
            />
            <label
              htmlFor="plantPopulation"
              className="text-green-500 absolute font-semibold left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 text-sm  transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600 rounded-lg"
            >
              Plant Population per Hectare
            </label>
          </div>


          <div className="relative">
            <input
              type="number"
              id="yieldPerPlant"
              value={yieldPerPlant}
              onChange={(e) => setYieldPerPlant(e.target.value)}
              className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
              placeholder="Expected Yield per Plant"
            />
            <label
              htmlFor="yieldPerPlant"
              className="text-green-500 absolute font-semibold left-2 -top-2.5 bg-white bg-opacity-50 backdrop-blur-md px-1 rounded-lg text-sm  transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-green-600"
            >
              Expected Yield per Plant (kg)
            </label>
          </div>

          <button
            onClick={calculateYield}
            type="button"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
          >
            Calculate Yield
          </button>
        </form>

        {totalYield !== null && (
          <div className="mt-6 p-4 bg-green-200 rounded-md">
            <p className="text-green-800 font-semibold">
              Estimated Yield: <span className="text-green-600">{totalYield} tons</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropYieldCalculator;
