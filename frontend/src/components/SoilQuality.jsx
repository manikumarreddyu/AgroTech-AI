import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/103.jpg";
import img2 from "../assets/104.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/109.jpg";
import img5 from "../assets/105.jpg";
import AdvantagesDisadvantages from "./AdvantagesDisadvantages";

const items = [
    { type: 'advantage', text: 'Enhances crop productivity by informing soil management decisions.' },
    { type: 'disadvantage', text: 'Requires access to technology and data for accurate predictions.' },
    { type: 'advantage', text: 'Facilitates efficient resource allocation and planning.' },
    { type: 'disadvantage', text: 'Initial costs for implementing soil testing and modeling can be high.' },
    { type: 'advantage', text: 'Enables early detection of nutrient deficiencies and soil issues.' },
    { type: 'disadvantage', text: 'Predictions may vary based on environmental changes and model accuracy.' },
    { type: 'advantage', text: 'Supports better water management and conservation efforts.' },
    { type: 'disadvantage', text: 'Complexity of soil science may lead to misinterpretations of data.' },
];

const SoilQuality = () => {
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        N: '', P: '', K: '', pH: '', EC: '', OC: '', S: '', Zn: '', Fe: '', Cu: '', Mn: '', B: ''
    });
    const [result, setResult] = useState("");
    const [showSpan, setShowSpan] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRoYSIsImEiOiJjbTIwN29haWEwYzVrMmpzZ25yeTF4MmN4In0.3fHnwKMxxXNy9pM-Vcn9gw';

            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [78.9629, 20.5937],
                zoom: 5
            });

            const soilTestingCenters = [
                // ... (soil testing centers data)
            ];

            soilTestingCenters.forEach(center => {
                new mapboxgl.Marker({ color: 'green' })
                    .setLngLat(center.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(
                                `<strong>${center.name}</strong><br/>Contact: ${center.contact}<br/>Services: ${center.services}`
                            )
                    )
                    .addTo(map);
            });

            return () => map.remove();
        }
    }, [loading]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePredictClick = (e) => {
        e.preventDefault();
        const url = "https://agro-kdxo.onrender.com/soil_quality_predict";
        setIsLoading(true);

        const numericData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
        );

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
                setResult(response.prediction);
                setIsLoading(false);
                setShowSpan(true);
            })
            .catch((error) => {
                console.error("There was an error making the prediction request!", error);
                setIsLoading(false);
            });
    };

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="px-10 mx-auto mt-16 pb-10 pt-5 bg-gradient-to-b from-green-50 to-white">
                    <h1 className="text-4xl font-bold text-green-600 text-center mb-8">Soil Quality Prediction</h1>
                    
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
                        <div className="lg:w-2/3 p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-3xl font-semibold text-green-700 mb-4">
                                🌱 About Soil Quality Prediction Model
                            </h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Our Soil Quality Prediction Model uses advanced Machine Learning to provide accurate insights into soil health. By analyzing various parameters such as nutrient levels, pH balance, and moisture content, we help farmers make informed decisions.
                            </p>
                            <h3 className='text-2xl font-semibold text-green-600 mb-2'>
                                🤔 How it Works
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Analyze key soil parameters (nitrogen, phosphorous, potassium)</li>
                                <li>Assess pH level, electrical conductivity, and organic carbon</li>
                                <li>Evaluate additional nutrients (sulphur, zinc, iron)</li>
                                <li>Check for copper, manganese, and boron</li>
                                <li>Provide actionable insights for soil management</li>
                            </ul>
                        </div>

                        <div className="lg:w-1/3 mt-8 lg:mt-0 lg:pl-10">
                            <div className="grid grid-cols-2 gap-4">
                                <img src={img1} alt="Soil Sample" className="w-full h-40 object-cover rounded-lg shadow-md" />
                                <img src={img3} alt="Field Analysis" className="w-full h-40 object-cover rounded-lg shadow-md" />
                                <img src={img2} alt="Soil Testing" className="w-full h-40 object-cover rounded-lg shadow-md col-span-2" />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Predict Soil Quality</h2>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(formData).map(([key, value]) => (
                                <div key={key} className="flex flex-col">
                                    <label htmlFor={key} className="mb-2 font-semibold text-gray-700">{key}</label>
                                    <input
                                        type="text"
                                        id={key}
                                        name={key}
                                        value={value}
                                        onChange={handleChange}
                                        placeholder={`Enter ${key}`}
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>
                            ))}
                            
                            <div className="col-span-full mt-6">
                                <button
                                    className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                    disabled={isLoading}
                                    onClick={!isLoading ? handlePredictClick : null}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Predicting...
                                        </span>
                                    ) : "Predict Soil Quality"}
                                </button>
                            </div>
                        </form>
                        
                        {showSpan && (
                            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                                <h4 className="text-xl font-semibold text-center">
                                    {result ? (
                                        <p>The predicted soil quality is: <span className="text-2xl text-green-600 font-bold">{result}</span></p>
                                    ) : (
                                        <p className="text-red-600">Please fill out all fields in the form</p>
                                    )}
                                </h4>
                            </div>
                        )}
                    </div>

                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold text-green-700 text-center mb-6">
                            Soil Testing Centers Map
                        </h2>
                        <div
                            id="map"
                            className="w-full h-96 rounded-xl shadow-lg border-4 border-green-500"
                        ></div>
                    </div>

                    <div className="mt-16 flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 mb-8 lg:mb-0">
                            <img src={img4} alt="Soil Analysis" className="w-full rounded-xl shadow-lg" />
                        </div>
                        <div className="lg:w-1/2 lg:pl-12">
                            <h2 className="text-3xl font-semibold text-green-700 mb-4">
                                🌱 Need for Soil Quality Prediction
                            </h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Soil quality prediction is essential for sustainable agriculture. It enables farmers to understand soil health and make informed decisions about crop selection. By predicting soil quality, farmers can optimize their practices, improve yields, and ensure the long-term fertility of their land.
                            </p>
                            <h3 className='text-2xl font-semibold text-green-600 mb-2'>
                                🤔 Why It Matters
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Enhances crop productivity through informed soil management</li>
                                <li>Helps in efficient resource allocation and planning</li>
                                <li>Promotes sustainable farming practices and environmental health</li>
                                <li>Enables early detection of nutrient deficiencies and soil issues</li>
                                <li>Supports better water management and conservation efforts</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16">
                        <AdvantagesDisadvantages items={items} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SoilQuality;