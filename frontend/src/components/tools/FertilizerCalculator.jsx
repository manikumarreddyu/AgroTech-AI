import React, { useEffect, useState } from "react";
import Spinner from "../Spinner.jsx";
import img1 from "../../assets/crops/test1.png";

const FertilizerCalculator = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);
  const [area, setArea] = useState("");
  const [age, setAge] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [results, setResults] = useState(null);

  const basePerAcre = {
    complexFertilizer: 41,
    urea: 25,
    mop: 38,
    magnesiumSulphate: 7,
    borax: 1,
  };

  const ageMultipliers = {
    0: 1,
    1: 1.2,
    2: 1.5,
  };

  const nitrogenFertilizers = {
    1: { name: "Urea", multiplier: 1 },
    5: { name: "Ammonium Sulphate Nitrate", multiplier: 0.8 },
    13: { name: "Ammonium Sulphate", multiplier: 0.9 },
  };

  const phosphorusFertilizers = {
    2: { name: "SSP", multiplier: 0.8 },
    3: { name: "DAP", multiplier: 1.1 },
    6: { name: "Complex Fertilizer 28:28:0", multiplier: 1 },
    7: { name: "Complex Fertilizer 14:35:14", multiplier: 0.9 },
    8: { name: "Complex Fertilizer 10:26:26", multiplier: 0.85 },
    9: { name: "Complex Fertilizer 20:20:0", multiplier: 1 },
    10: { name: "Complex Fertilizer 16:20:0", multiplier: 0.95 },
    11: { name: "Complex Fertilizer 17:17:17", multiplier: 1.05 },
    12: { name: "Complex Fertilizer 24:24:0", multiplier: 1.2 },
  };

  const potassiumFertilizers = {
    4: { name: "MOP", multiplier: 1 },
  };

  const handleSubmit = () => {
    if (!age || !area) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    if (area <= 0) {
      setErrorMessage("Please enter a valid area.");
      return;
    }
    setErrorMessage("");

    const totalArea = parseFloat(area);
    const ageMultiplier = ageMultipliers[age] || 1;
    const nitrogenFert = nitrogenFertilizers[nitrogen] || nitrogenFertilizers[1];
    const phosphorusFert = phosphorusFertilizers[phosphorus] || phosphorusFertilizers[6];
    const potassiumFert = potassiumFertilizers[potassium] || potassiumFertilizers[4];

    const perAcre = {
      complexFertilizer: basePerAcre.complexFertilizer * phosphorusFert.multiplier * ageMultiplier,
      urea: basePerAcre.urea * nitrogenFert.multiplier * ageMultiplier,
      mop: basePerAcre.mop * potassiumFert.multiplier * ageMultiplier,
      magnesiumSulphate: basePerAcre.magnesiumSulphate * ageMultiplier,
      borax: basePerAcre.borax * ageMultiplier,
    };

    const total = {
      complexFertilizer: perAcre.complexFertilizer * totalArea,
      urea: perAcre.urea * totalArea,
      mop: perAcre.mop * totalArea,
      magnesiumSulphate: perAcre.magnesiumSulphate * totalArea,
      borax: perAcre.borax * totalArea,
    };

    setResults(total);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="flex items-center justify-center min-h-screen p-24 pt-40"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Backdrop layer */}
          <div className="absolute inset-0 bg-black opacity-50" />
          
          {/* Glassmorphism effect on the form */}
          <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-3xl z-10">
            <h1 className="text-3xl font-bold text-center text-white mb-12">
              Fertilizer Calculator
            </h1>

            <div className="flex flex-col justify-center mb-8">
              <p className="text-lg text-white text-justify">
                🌱 The Fertilizer Calculator helps farmers estimate the precise quantities of nitrogen, phosphorus, and potassium fertilizers needed for their land, based on area size, land age, and fertilizer type. This tool ensures efficient fertilizer usage, optimizing crop growth while minimizing waste and costs for sustainable farming practices.
              </p>
              <p className="md:text-xl text-lg font-bold py-4 text-white">
                🤔 How it Works!
              </p>
              <p className="text-lg text-white text-left">
                🌍 Input details of the land, and your nitrogen, phosphorus, and potassium fertilizers.
                <br />
                📊 The calculator adjusts fertilizer quantities based on your data, using specific multipliers.
                <br />
                🌾 Make informed decisions on fertilizer management.
              </p>
            </div>

            <form className="space-y-6" name="fertilizercalculator">
              {errorMessage.length > 0 && (
                <span className="block text-red-400 font-bold mb-4 text-center">
                  {errorMessage}
                </span>
              )}
              <div className="relative">
                <label htmlFor="area" className="block text-gray-200 text-left font-bold">
                  Area (in acres):
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
                  step="any"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="age" className="block text-gray-200 text-left font-bold">
                  Age (in years):
                </label>
                <select
                  name="age"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
                  required
                >
                  <option value="">Select Age</option>
                  <option value="0">Less than 1 year</option>
                  <option value="1">1-2 years</option>
                  <option value="2">More than 2 years</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="nitrogen" className="block text-gray-200 text-left font-bold">
                  Nitrogen Fertilizer:
                </label>
                <select
                  name="nitrogen"
                  id="nitrogen"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
                  required
                >
                  <option value="">Select Fertilizer</option>
                  <option value="1">Urea</option>
                  <option value="5">Ammonium Sulphate Nitrate</option>
                  <option value="13">Ammonium Sulphate</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="phosphorus" className="block text-gray-200 text-left font-bold">
                  Phosphorus Fertilizer:
                </label>
                <select
                  name="phosphorus"
                  id="phosphorus"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
                  required
                >
                  <option value="">Select Fertilizer</option>
                  <option value="2">SSP</option>
                  <option value="3">DAP</option>
                  <option value="6">Complex Fertilizer 28:28:0</option>
                  <option value="7">Complex Fertilizer 14:35:14</option>
                  <option value="8">Complex Fertilizer 10:26:26</option>
                  <option value="9">Complex Fertilizer 20:20:0</option>
                  <option value="10">Complex Fertilizer 16:20:0</option>
                  <option value="11">Complex Fertilizer 17:17:17</option>
                  <option value="12">Complex Fertilizer 24:24:0</option>
                </select>
              </div>

              <div className="relative">
                <label htmlFor="potassium" className="block text-gray-200 text-left font-bold">
                  Potassium Fertilizer:
                </label>
                <select
                  name="potassium"
                  id="potassium"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
                  required
                >
                  <option value="">Select Fertilizer</option>
                  <option value="4">MOP</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60"
              >
                Calculate
              </button>
            </form>

            {results && (
              <div className="mt-8 p-4 bg-green-200 rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-green-800">
                  Recommended Fertilizer Amounts:
                </h2>
                <ul className="space-y-2 text-green-600">
                  <li>Complex Fertilizer: {results.complexFertilizer.toFixed(2)} kg</li>
                  <li>Urea: {results.urea.toFixed(2)} kg</li>
                  <li>MOP: {results.mop.toFixed(2)} kg</li>
                  <li>Magnesium Sulphate: {results.magnesiumSulphate.toFixed(2)} kg</li>
                  <li>Borax: {results.borax.toFixed(2)} kg</li>
                </ul>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default FertilizerCalculator;
