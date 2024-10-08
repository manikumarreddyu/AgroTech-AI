import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/116.jpg";
import img4 from "../assets/112.jpg";

const CropRotationRecommendation = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        previousCrop: '',
        soilType: '',
        moistureLevel: '',
        N: '',
        P: '',
        K: '',
    });
    const [result, setResult] = useState("");
    const [showSpan, setShowSpan] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePredictClick = (e) => {
        e.preventDefault();
        //const url = "http://127.0.0.1:5000/crop_recommendation";
        //https://crop-rotation-api.onrender.com
        const url = "https://crop-rotation-api.onrender.com/crop_recommendation";
        setIsLoading(true);
    
        const numericData = {
            "Previous Crop": formData.previousCrop,
            "Soil Type": formData.soilType,
            "Moisture Level": parseFloat(formData.moistureLevel), 
            "Nitrogen (N)": parseFloat(formData.N),
            "Phosphorus (P)": parseFloat(formData.P),
            "Potassium (K)": parseFloat(formData.K),
        };
    
        const jsonData = JSON.stringify(numericData);
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: jsonData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response); // Log the response for debugging
                setResult(response['Recommended Crop']); // Update this line
                setIsLoading(false);
                setShowSpan(true);
            })
            .catch((error) => {
                console.error("There was an error making the recommendation request!", error);
                setResult("An error occurred while fetching the recommendation."); // Display error message
                setIsLoading(false);
            });
    };    

    return (
        <>
            {loading ? <Spinner /> :
                <div className="max-w-full mx-auto mt-16 pb-10 pt-5 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <h1 className="text-2xl font-bold text-green-500 text-center">Crop Rotation-Based Crop Recommendation</h1>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                        <div className="sm:w-2/3 p-4 items-center">
                            <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-4 text-green-700">
                                🌱 About the Crop Recommendation System
                            </h1>
                            <p className="text-lg text-[#000435] text-justify">
                                🌍 This system recommends the best crop to plant next, considering the previous crop, soil type, and nutrient levels. The model leverages crop rotation principles to ensure sustainable farming and improved yields.
                            </p>
                            <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                🤔 How it Works!
                            </p>
                            <p className="text-lg text-[#000435]">
                                <span>🔍 Input details like the previous crop, soil type, and soil nutrients.</span><br />
                                <span>📈 Analyze nutrient levels (N, P, K) and moisture content.</span><br />
                                <span>🌾 Get recommendations for crops suitable for rotation based on soil health and previous crop.</span><br />
                                <span>✅ Ensure sustainable and productive crop cycles.</span><br />
                            </p>
                        </div>

                        <div className="sm:w-1/3 flex flex-wrap items-center md:pl-10">
                            <div className="grid grid-flow-col align-items-center grid-cols-2 grid-rows-2 gap-3">
                                <div><img src={img1} alt="Crop 1" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>
                                <div><img src={img3} alt="Crop 2" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>
                                <div className="row-span-2"><img src={img2} alt="Crop 3" style={{ borderRadius: '100%' }} className="w-40 h-40 p-2 rounded-lg border border-green-500 mb-4 my-20" /></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2 text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
                        <h1 className="text-2xl font-bold mb-4 text-green-500 text-center">Crop Recommendation Form</h1>
                        
                        <form className="grid grid-cols-2 gap-4" method="post" acceptCharset="utf-8" name="Modelform">
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Previous Crop</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="previousCrop"
                                    name="previousCrop"
                                    value={formData.previousCrop}
                                    onChange={handleChange}
                                    placeholder="Enter previous crop"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Soil Type</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="soilType"
                                    name="soilType"
                                    value={formData.soilType}
                                    onChange={handleChange}
                                    placeholder="Enter soil type"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Moisture Level</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="moistureLevel"
                                    name="moistureLevel"
                                    value={formData.moistureLevel}
                                    onChange={handleChange}
                                    placeholder="0 - 100%"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Nitrogen (N)</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="N"
                                    name="N"
                                    value={formData.N}
                                    onChange={handleChange}
                                    placeholder="0 to 400"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Phosphorus (P)</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="P"
                                    name="P"
                                    value={formData.P}
                                    onChange={handleChange}
                                    placeholder="0 to 150"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Potassium (K)</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="K"
                                    name="K"
                                    value={formData.K}
                                    onChange={handleChange}
                                    placeholder="0 to 900"
                                />
                            </div>

                            <div className="col-span-2 mt-5">
                                <button className="w-full px-3 py-2 relative rounded group overflow-hidden font-medium bg-green-50 text-green-500 border border-green-500 inline-block"
                                        disabled={isLoading}
                                        onClick={!isLoading ? handlePredictClick : null}
                                > 
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-green-500 group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-white flex items-center justify-center">
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                </svg>
                                                Predicting...
                                            </>
                                        ) : (
                                            "Predict Now!"
                                        )}
                                    </span>
                                </button>
                            </div>

                            <div className="col-span-2">
                                {showSpan && (
                                    <p className="bg-green-100 border text-green-600 border-green-400 px-4 py-3 rounded relative mt-5">
                                        Recommended Crop: <span className="font-semibold text-green-800">{result}</span>
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default CropRotationRecommendation;
