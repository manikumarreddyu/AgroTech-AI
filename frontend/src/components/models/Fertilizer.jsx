'use client'

import React, { useState, useEffect } from 'react'

export default function Component() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showSpan, setShowSpan] = useState(false);
  const [formData, setFormData] = useState({
    Temparature: "",
    Humidity: "",
    Moisture: "",
    Soil_Type: "",
    Crop_Type: "",
    Nitrogen: "",
    Potassium: "",
    Phosphorous: "",
  })
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePredictClick = (e) => {
    e.preventDefault();
    // const url = "https://agro-ai-1.onrender.com/fertilizer_predict";
    // https://agro-kdxo.onrender.com/
    const url = "https://agro-kdxo.onrender.com/fertilizer_predict";
    //  const url = "http://127.0.0.1:5000/fertilizer_predict";
    setIsLoading(true);
    const jsonData = JSON.stringify(formData);
    console.log("Sending data:", jsonData); // Log the data being sent
    fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: jsonData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((response) => {
            console.log("Received response:", response); // Log the response
            setResult(response.Prediction);
            setIsLoading(false);
            setShowSpan(true);
        })
        .catch((error) => {
            console.error("Error:", error);
            setIsLoading(false);
            setShowSpan(true);
            setResult("Error: Unable to predict fertilizer");
        });
};

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-green-50 to-green-100'} py-20`}>
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-green-600 mb-3">Fertilizer Prediction</h1>
        <p className="text-2xl text-green-500">Growing Season: Spring - Summer</p>
        <img src="/placeholder.svg?height=120&width=120" alt="Wheat" className="mx-auto mt-4 rounded-full" />
      </header>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full lg:w-2/3 px-2 mb-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-6`}>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Soil Analysis</h2>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div>
                  <p className="font-semibold">pH Level: 6.5</p>
                  <p className="font-semibold">Moisture: {formData.Moisture}%</p>
                </div>
                <div>
                  <p className="font-semibold">N: {formData.Nitrogen}</p>
                  <p className="font-semibold">P: {formData.Phosphorous}</p>
                  <p className="font-semibold">K: {formData.Potassium}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {['Nitrogen', 'Phosphorus', 'Potassium'].map((nutrient) => (
                <div key={nutrient} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-4`}>
                  <h3 className={`text-xl font-bold mb-2 ${nutrient === 'Nitrogen' ? 'text-green-500' : nutrient === 'Phosphorus' ? 'text-blue-500' : 'text-orange-500'}`}>
                    {nutrient}
                  </h3>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-3 mb-2 text-xs flex rounded bg-gray-200">
                      <div style={{ width: `${(formData[nutrient] / 50) * 100}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${nutrient === 'Nitrogen' ? 'bg-green-500' : nutrient === 'Phosphorus' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                    </div>
                  </div>
                  <p className="text-sm">Current: {formData[nutrient]}, Optimal: 30-40</p>
                </div>
              ))}
            </div>

            <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-6`}>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Crop Growth Stage</h2>
              <div className="flex justify-between items-center mb-4">
                <div className="w-1/6 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm mt-2">Germination</p>
                </div>
                <div className="w-1/6 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                  </div>
                  <p className="text-sm mt-2">Seedling</p>
                </div>
                <div className="w-1/6 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${darkMode ? 'bg-green-600' : 'bg-green-500'} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm mt-2">Tillering</p>
                </div>
                <div className="w-1/6 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full bg-gray-300 flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm mt-2">Heading</p>
                </div>
                <div className="w-1/6 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full bg-gray-300 flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm mt-2">Ripening</p>
                </div>
              </div>
              <div className="text-lg">
                <p><span className="font-semibold">Current Stage:</span> Tillering</p>
                <p><span className="font-semibold">Days Since Planting:</span> 45</p>
                <p><span className="font-semibold">Estimated Days to Harvest:</span> 75</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-2">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden mb-6 p-6`}>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Weather</h2>
              <div className="flex items-center justify-between text-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{formData.Temparature}°C</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  <span>{formData.Humidity}%</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415  3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span>{formData.Moisture}%</span>
                </div>
              </div>
            </div>

            <form onSubmit={handlePredictClick} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-6`}>
                <h2 className="text-2xl font-bold text-green-600 mb-4">Predict Fertilizer</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Inputs for Temparature, Humidity, and Moisture */}
                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Temparature">Temparature</label>
                    <input
                        type="text"
                        id="Temparature"
                        name="Temparature"
                        value={formData.Temparature}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 50°C"
                        required
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Humidity">Humidity</label>
                    <input
                        type="text"
                        id="Humidity"
                        name="Humidity"
                        value={formData.Humidity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 100%"
                        required
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Moisture">Moisture</label>
                    <input
                        type="text"
                        id="Moisture"
                        name="Moisture"
                        value={formData.Moisture}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 100%"
                        required
                    />
                    </div>

                    {/* Dropdowns for Soil Type and Crop Type */}
                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Soil_Type">Soil Type</label>
                    <select
                        className= {`w-full px-3 py-2 border rounded-md ${darkMode ? 'text-black' : 'text-black'}`}
                        id="Soil_Type"
                        name="Soil_Type"
                        value={formData.Soil_Type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select</option>
                        <option value="0">Black</option>
                        <option value="1">Clayey</option>
                        <option value="2">Loamy</option>
                        <option value="3">Red</option>
                        <option value="4">Sandy</option>
                    </select>
                    </div>

                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Crop_Type">Crop Type</label>
                    <select
                        className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'text-black' : 'text-black'}`}
                        id="Crop_Type"
                        name="Crop_Type"
                        value={formData.Crop_Type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select</option>
                        <option value="0">Barley</option>
                        <option value="1">Cotton</option>
                        <option value="2">Ground Nuts</option>
                        <option value="3">Maize</option>
                        <option value="4">Millets</option>
                        <option value="5">Oil Seeds</option>
                        <option value="6">Paddy</option>
                        <option value="7">Pulses</option>
                        <option value="8">Sugarcane</option>
                        <option value="9">Tobacco</option>
                        <option value="10">Wheat</option>
                    </select>
                    </div>

                    {/* Inputs for Nitrogen, Potassium, and Phosphorous */}
                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2 " htmlFor="Nitrogen">Nitrogen</label>
                    <input
                        type="text"
                        id="Nitrogen"
                        name="Nitrogen"
                        value={formData.Nitrogen}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 50"
                        required
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Potassium">Potassium</label>
                    <input
                        type="text"
                        id="Potassium"
                        name="Potassium"
                        value={formData.Potassium}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 50"
                        required
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-base font-medium mb-2" htmlFor="Phosphorous">Phosphorous</label>
                    <input
                        type="text"
                        id="Phosphorous"
                        name="Phosphorous"
                        value={formData.Phosphorous}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-base border rounded-md text-black"
                        placeholder="1 to 50"
                        required
                    />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-4 px-6 py-3 text-lg text-white font-semibold rounded-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                >
                    {isLoading ? 'Predicting...' : 'Predict Fertilizer'}
                </button>
                </form>


                {(result || isLoading) && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden mt-6 p-6`}>
                <h2 className="text-2xl font-bold text-green-600 mb-4">Prediction Result</h2>
                {isLoading ? (
                  <p className="text-lg">Predicting...</p>
                ) : (
                  <p className="text-lg">{result}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center space-x-4">
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg shadow hover:bg-green-50 text-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Report
          </button>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg shadow hover:bg-green-50 text-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Compare Options
          </button>
          <button className="bg-white text-green-600 px-6 py-2 rounded-lg shadow hover:bg-green-50 text-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-6`}>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Smart Suggestions</h2>
            <p className="text-lg">Based on current weather patterns and market prices, we recommend considering these alternative fertilizers...</p>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden p-6`}>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Nutrient History</h2>
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-lg text-gray-600">Interactive Nutrient History Graph</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button className="bg-white p-3 rounded-full shadow-lg hover:bg-green-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>

      <div className="fixed bottom-6 left-6 flex items-center space-x-3">
        <div className="relative inline-block w-12 mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="dark-mode"
            className="toggle-checkbox absolute block w-7 h-7 rounded-full bg-white border-4 appearance-none cursor-pointer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <label
            htmlFor="dark-mode"
            className="toggle-label block overflow-hidden h-7 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <label htmlFor="dark-mode" className="text-lg">
          Dark Mode
        </label>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #68D391;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #68D391;
        }
      `}</style>
    </div>
  )
}