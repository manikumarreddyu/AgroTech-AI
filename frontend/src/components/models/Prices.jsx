import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import gain from '../../assets/images/gain-icon.png';
import loss from '../../assets/images/loss-icon.png';
import CropImages from "./CropImages";

const Prices = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const initialData = {
        chunks: [["arhar", "bajra", "barley", "copra", "urad", "gram", "groundnut", "jowar"]],
        commodities: ["arhar"],
        six_months_forecast: [["Aug 24", "Copra", 5650.8, -0.36, "Barley", 1085.84, -0.36]],
        top_gainers: [["Gram", 3592.4, 5.51]],
        top_losers: [["Niger", 4648.0, -6.28]]
    };

    const [receivedData, setReceivedData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://agrotech-api.onrender.com/price_predict');
                if (!response.ok) throw new Error('Network response was not ok');
                const responseData = await response.json();
                setReceivedData(responseData);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="container mx-auto px-6 py-8 mt-12 space-y-8 bg-gray-50 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-green-700 text-center mb-8">
                        Price Prediction
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Top Gainers */}
                        <div className="p-4 rounded-lg shadow-md border border-green-200 bg-white">
                            <h2 className="text-2xl text-green-600 font-bold text-center mb-4">Top Gainers</h2>
                            <table className="w-full text-left border-collapse border border-gray-200">
                                <thead className="text-lg font-semibold text-green-600 bg-green-50">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200">Item</th>
                                        <th className="px-6 py-3 border-b border-gray-200">Price (₹/Qtl)</th>
                                        <th className="px-6 py-3 border-b border-gray-200">Change</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 text-base">
                                    {receivedData.top_gainers.map((ele, index) => (
                                        <tr key={index} className="hover:bg-green-50">
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[0]}</td>
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[1]}</td>
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Top Losers */}
                        <div className="p-4 rounded-lg shadow-md border border-red-200 bg-white">
                            <h2 className="text-2xl text-red-600 font-bold text-center mb-4">Top Losers</h2>
                            <table className="w-full text-left border-collapse border border-gray-200">
                                <thead className="text-lg font-semibold text-red-600 bg-red-50">
                                    <tr>
                                        <th className="px-6 py-3 border-b border-gray-200">Item</th>
                                        <th className="px-6 py-3 border-b border-gray-200">Price (₹/Qtl)</th>
                                        <th className="px-6 py-3 border-b border-gray-200">Change</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 text-base">
                                    {receivedData.top_losers.map((ele, index) => (
                                        <tr key={index} className="hover:bg-red-50">
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[0]}</td>
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[1]}</td>
                                            <td className="px-6 py-3 border-b border-gray-200">{ele[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Star Crop Prediction */}
                    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
                            Star Crop Prediction
                        </h2>
                        <table className="w-full border-collapse border border-gray-300 text-center">
                            <tbody>
                                <tr className="bg-green-50">
                                    <td className="px-6 py-4 border border-gray-300">
                                        <h4 className="text-lg font-semibold">{receivedData.six_months_forecast[0][1]}</h4>
                                        <p className="text-2xl font-bold text-gray-700">₹{receivedData.six_months_forecast[0][2]}</p>
                                        <span className="text-green-500 flex items-center justify-center">
                                            {receivedData.six_months_forecast[0][3]}%
                                            <img src={gain} alt="Gain Icon" className="ml-2 h-5 w-5" />
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        <h4 className="text-lg font-semibold">{receivedData.six_months_forecast[0][4]}</h4>
                                        <p className="text-2xl font-bold text-gray-700">₹{receivedData.six_months_forecast[0][5]}</p>
                                        <span className="text-red-500 flex items-center justify-center">
                                            {receivedData.six_months_forecast[0][6]}%
                                            <img src={loss} alt="Loss Icon" className="ml-2 h-5 w-5" />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Crop Images Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                        {CropImages.map((crop, index) => (
                            <Link key={index} to={`/reports?crop=${crop.crop_name}`} className="block p-4 border border-green-200 bg-white rounded-lg shadow hover:bg-green-100">
                                <div className="flex flex-col items-center">
                                    <img src={crop.crop_image} alt={crop.crop_name} className="rounded-full h-16 w-16 mb-2" />
                                    <span className="text-lg font-medium text-gray-700">{crop.crop_name.charAt(0).toUpperCase() + crop.crop_name.slice(1)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Prices;
``