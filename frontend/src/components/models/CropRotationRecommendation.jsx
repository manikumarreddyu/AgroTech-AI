import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/116.jpg";
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function Component() {
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    previousCrop: '',
    soilType: '',
    moistureLevel: '',
    N: '',
    P: '',
    K: '',
  })
  const [result, setResult] = useState("")
  const [showSpan, setShowSpan] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePredictClick = (e) => {
    e.preventDefault()
    const url = "https://crop-rotation-api.onrender.com/crop_recommendation"
    setIsLoading(true)

    const numericData = {
      "Previous Crop": formData.previousCrop,
      "Soil Type": formData.soilType,
      "Moisture Level": parseFloat(formData.moistureLevel),
      "Nitrogen (N)": parseFloat(formData.N),
      "Phosphorus (P)": parseFloat(formData.P),
      "Potassium (K)": parseFloat(formData.K),
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(numericData),
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response['Recommended Crop'])
        setIsLoading(false)
        setShowSpan(true)
      })
      .catch((error) => {
        console.error("There was an error making the recommendation request!", error)
        setResult("An error occurred while fetching the recommendation.")
        setIsLoading(false)
      })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-12">Crop Rotation-Based Recommendation</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-green-600">About the System</h2>
            <p className="text-lg text-gray-700">
              Our advanced system recommends the optimal crop for your next planting, taking into account your previous crop, soil characteristics, and nutrient levels. By leveraging crop rotation principles, we ensure sustainable farming practices and improved yields.
            </p>
            <h3 className="text-2xl font-semibold text-green-600 mt-8">How it Works</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Input details about your previous crop and soil conditions</li>
              <li>Provide information on soil nutrient levels (N, P, K) and moisture content</li>
              <li>Receive tailored recommendations for suitable rotation crops</li>
              <li>Implement sustainable and productive crop cycles</li>
            </ul>
          </div>
        <div className="grid grid-cols-2 gap-6 p-4">
        <div className="relative group">
            <img src={img1} alt="Crop 1" className="shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110 rounded-full group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0  transition-opacity duration-300 flex items-center justify-center rounded-full">
            <span className="text-white text-lg font-semibold">Sustainable Farming</span>
            </div>
        </div>

        <div className="relative group">
            <img src={img2} alt="Crop 2" className="shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-110 rounded-full group-hover:opacity-100" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 flex items-center justify-center rounded-full">
            <span className="text-white text-lg font-semibold">Soil Health</span>
            </div>
        </div>
        </div>
        </div>


        <div className="bg-white shadow-xl rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-green-600 mb-6">Advantages and Disadvantages of Crop Rotation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-green-500 mb-4">Advantages</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Improves soil structure and fertility</li>
                <li>Reduces soil erosion and increases organic matter</li>
                <li>Helps in pest and disease management</li>
                <li>Enhances biodiversity</li>
                <li>Increases crop yield and quality</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-500 mb-4">Disadvantages</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Requires more planning and management</li>
                <li>May need different equipment for various crops</li>
                <li>Potential short-term reduction in profits</li>
                <li>Learning curve for new crop management</li>
                <li>Market demand may not align with rotation schedule</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-green-600 mb-6">Crop Recommendation Form</h2>
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handlePredictClick}>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder={key === 'moistureLevel' ? '0 - 100%' : key === 'N' ? '0 to 400' : key === 'P' ? '0 to 150' : key === 'K' ? '0 to 900' : `Enter ${key.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Predicting...
                  </span>
                ) : (
                  "Predict Now!"
                )}
              </button>
            </div>
          </form>
          {showSpan && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">
                Recommended Crop: <span className="font-semibold">{result}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}