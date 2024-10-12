import React, { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/106.jpg";
import img2 from "../assets/101.jpg";
import img3 from "../assets/117.jpeg";
import img4 from "../assets/115.jpg";

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

  // Base amounts per acre
  const basePerAcre = {
    complexFertilizer: 41, // Complex Fertilizer 28:28:0
    urea: 25, // Urea
    mop: 38, // MOP
    magnesiumSulphate: 7, // Magnesium Sulphate
    borax: 1, // Borax
  };

  // Multipliers for age
  const ageMultipliers = {
    0: 1, // 1st Year
    1: 1.2, // 2nd Year
    2: 1.5, // 3rd Year and Above
  };

  // Fertilizer variations based on type
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
    const nitrogenFert =
      nitrogenFertilizers[nitrogen] || nitrogenFertilizers[1];
    const phosphorusFert =
      phosphorusFertilizers[phosphorus] || phosphorusFertilizers[6];
    const potassiumFert =
      potassiumFertilizers[potassium] || potassiumFertilizers[4];

    // Calculate total quantities per acre
    const perAcre = {
      complexFertilizer:
        basePerAcre.complexFertilizer *
        phosphorusFert.multiplier *
        ageMultiplier,
      urea: basePerAcre.urea * nitrogenFert.multiplier * ageMultiplier,
      mop: basePerAcre.mop * potassiumFert.multiplier * ageMultiplier,
      magnesiumSulphate: basePerAcre.magnesiumSulphate * ageMultiplier,
      borax: basePerAcre.borax * ageMultiplier,
    };

    // Calculate total quantities for the entire area
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
          className="max-w-full mx-auto pb-10 pt-5 px-4 sm:px-6 lg:px-8 mt-16  "
          style={{
            backgroundImage: `url(${bgHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl font-bold text-green-500  text-center">
            Fertilizer Calculation
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8  ">
            <div className="sm:w-2/3 p-4 items-center">
              <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-2xl font-bold py-1">
                About Our Fertilizer Calculator
              </p>
              {/* <h1 className="md:text-xl sm:text-xl text-xl font-bold py-4 text-green-700">
                Empowering Farmers with AI-Driven Fertilizer Insights
              </h1> */}
              <p className="text-lg text-[#000435] text-justify">
                🌱 The Fertilizer Calculator helps farmers estimate the precise
                quantities of nitrogen, phosphorus, and potassium fertilizers
                needed for their land, based on area size, land age, and
                fertilizer type. This tool ensures efficient fertilizer usage,
                optimizing crop growth while minimizing waste and costs for
                sustainable farming practices.
              </p>
              <p className="md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]">
                🤔 How it Works!
              </p>
              <p className="text-lg text-[#000435] text-left">
                <span>
                  🌍Input details of the land, and your nitrogen, phosphorus, and
                  potassium fertilizers.
                </span>
                <br />
                <span>
                  📊The calculator adjusts fertilizer quantities based on your
                  data, using specific multipliers.
                </span>
                <br />
                <span>🌾Make informed decisions on fertilizer management.</span>
                <br />
              </p>
            </div>

            <div className="sm:w-1/3 flex flex-wrap items-center md:pl-10 ">
              <div className="grid grid-flow-col alignitems-center  grid-cols-2 grid-rows-2 gap-3">
                <div className=" ">
                  <img
                    src={img1}
                    alt="Crop 1"
                    style={{ borderRadius: "50%" }}
                    className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4"
                  />
                </div>
                <div className="text-center">
                  <img
                    src={img3}
                    alt="Crop 1"
                    style={{ borderRadius: "50%" }}
                    className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4"
                  />
                </div>

                <div className="   row-span-2 ">
                  <img
                    src={img2}
                    style={{ borderRadius: "100%" }}
                    alt="Crop 1"
                    className=" w-40 h-40 p-2 rounded-lg border border-green-500 mb-4 my-20"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className=" mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md"
            style={{
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-2xl font-bold text-green-500 mb-8 text-center">
              Fertilizer Calculator
            </h1>
            <div className="flex flex-col sm:flex-row justify-around">
              <form
                className="w-full mx-auto sm:w-2/5"
                name="fertilizercalculator"
              >
                {errorMessage.length > 0 && (
                  <span className="block text-red-500 font-bold mb-4 text-center">
                    {errorMessage}
                  </span>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="area"
                    className="block text-gray-700 text-left font-bold"
                  >
                    Area (in acres):
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-green-500 focus:outline-none focus:ring-2 focus:ring-black"
                    step="any"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="age"
                    className="block text-gray-700 text-left font-bold"
                  >
                    Age (in years):
                  </label>
                  <select
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-green-500 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="0">1st Year</option>
                    <option value="1">2nd Year</option>
                    <option value="2">3rd Year and Above</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="nitrogen"
                    className="block text-gray-700 text-left font-bold"
                  >
                    Nitrogen Fertilizer:
                  </label>
                  <select
                    name="nitrogen"
                    id="nitrogen"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-green-500 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="1">Urea</option>
                    <option value="5">Ammonium Sulphate Nitrate</option>
                    <option value="13">Ammonium Sulphate</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phosphorus"
                    className="block text-gray-700 text-left font-bold"
                  >
                    Phosphorus Fertilizer:
                  </label>
                  <select
                    name="phosphorus"
                    id="phosphorus"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-green-500 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
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

                <div className="mb-4">
                  <label
                    htmlFor="potassium"
                    className="block text-gray-700 text-left font-bold"
                  >
                    Potassium Fertilizer:
                  </label>
                  <select
                    name="potassium"
                    id="potassium"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md border-green-500 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="4">MOP</option>
                  </select>
                </div>

                <div className="mb-4"></div>
              </form>
              <button
                onClick={handleSubmit}
                className="w-28 h-28 mx-auto my-auto font-bold rounded-full bg-green-500 text-white py-2 px-4 hover:bg-green-600 transition duration-300"
              >
                Calculate!
              </button>

              <div className="w-full sm:w-2/5 my-4 sm:my-auto h-full border mx-auto bg-white border-green-500">
                {!results && (
                  <h4 className="text-2xl italic font-semibold mb-2">
                    Results will appear here
                  </h4>
                )}
                {results && (
                  <div className="p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-green-500 mb-4">
                      Quantity for Total Area (in Kgs) Per Year
                    </h4>
                    <ul className="list-disc pl-6">
                      <li>
                        Complex Fertilizer 28:28:0 ={" "}
                        {results.complexFertilizer.toFixed(1)} kg
                      </li>
                      <li>Urea = {results.urea.toFixed(1)} kg</li>
                      <li>MOP = {results.mop.toFixed(1)} kg</li>
                      <li>
                        Magnesium Sulphate ={" "}
                        {results.magnesiumSulphate.toFixed(1)} kg
                      </li>
                      <li>Borax = {results.borax.toFixed(1)} kg</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col sm:flex-row items-center mt-20 justify-between  ">
              <div className="sm:w-1/2 flex flex-wrap px-10  rounded-md justify-center ">
                <img
                  src={img4}
                  alt="Crop 1"
                  style={{ borderRadius: "100%" }}
                  className="w-4/5 h px-2 "
                />
              </div>
              <div className="sm:w-2/3 p-4 items-center">
                <h1 className="md:text-xl sm:text-xl text-xl font-bold py-2 text-green-700">
                  🌱 Please Note:
                </h1>
                <p className="text-lg text-[#000435] text-justify">
                  The above recommendations may be applied in minimum FOUR
                  splits during the year.
                  Dosage may be applied in 12splits in a year at Equal Monthly intervals.
                </p>
                <p className="md:text-xl sm:text-xl text-lg font-semibold py-2 text-green-700">
                🌱 If fertilizers applied through
                  Fertigation following is the recommended dosage:
                </p>
                <p className="text-lg text-[#000435]">
                  <span>
                    📊 Urea - 5 Kgs Per Acre Per Month
                  </span>
                  <br />
                  <span>
                    🌍 DAP - 3 Kgs Per Acre Per Month
                  </span>
                  <br />
                  <span>
                    🧠 MOP - 5 Kgs Per Acre Per Month
                  </span>
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FertilizerCalculator;