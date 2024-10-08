import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import gain from '../assets/images/gain-icon.png';
import loss from '../assets/images/loss-icon.png';
import CropImages from "./CropImages";

const Prices = () => {
    const [loading, setLoading] = useState(true);
    const [viewCount, setViewCount] = useState(3);
    const [sortOrder, setSortOrder] = useState('desc');
    const [error, setError] = useState(null); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const initialData = {
        top_gainers: [
            ["Gram", 3592.4, 5.51],
            ["Arhar", 4850.2, 7.23],
            ["Bajra", 1102.6, 4.87]
        ],
        top_losers: [
            ["Niger", 4648.0, -6.28],
            ["Barley", 1850.2, -4.12],
            ["Maize", 990.6, -3.56]
        ]
    };

    const [receivedData, setReceivedData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://agro-kdxo.onrender.com/price_predict');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setReceivedData(responseData);
            } catch (error) {
                setError('Failed to fetch data. Please try again later.'); 
                console.log('Error:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    const sortData = (data) => {
        return [...data].sort((a, b) => {
            return sortOrder === 'desc' ? b[2] - a[2] : a[2] - b[2];
        });
    };

    const renderCards = (data, isGainer) => {
        return data.slice(0, viewCount).map((ele, index) => {
            const bgColor = isGainer
                ? `rgba(0, 255, 0, ${0.2 + Math.min(ele[2] / 10, 0.8)})`
                : `rgba(255, 0, 0, ${0.2 + Math.min(Math.abs(ele[2]) / 10, 0.8)})`;

            return (
                <div
                    key={index}
                    className="p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out"
                    style={{ backgroundColor: bgColor }}
                >
                    <h4 className="text-lg font-semibold">
                        {ele[0]}
                        <img
                            src={isGainer ? gain : loss}
                            alt={isGainer ? "Gain Icon" : "Loss Icon"}
                            className="inline-block ml-2 h-5 w-5"
                        />
                    </h4>
                    <p className="text-xl font-bold">₹{ele[1]}</p>
                    <p className={`text-lg ${isGainer ? 'text-white' : 'text-white'}`}>
                        {ele[2]}%
                    </p>
                </div>
            );
        });
    };

    return (
        <>
            {loading ? <Spinner /> : error ? ( 
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            ) : (
                <div className="container mx-auto px-4 py-6 mt-12">
                    <h1 className="text-3xl font-bold text-green-500 text-center mb-6">Price Prediction</h1>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h2 className="text-xl text-green-600 text-center font-bold mb-4">Top Gainers</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {renderCards(sortData(receivedData.top_gainers), true)}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl text-red-600 text-center font-bold mb-4">Top Losers</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {renderCards(sortData(receivedData.top_losers), false)}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            onClick={() => setViewCount(1)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            View 1
                        </button>
                        <button
                            onClick={() => setViewCount(3)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            View 3
                        </button>
                        <button
                            onClick={() => setViewCount(5)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            View 5
                        </button>
                    </div>

                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            onClick={() => setSortOrder('asc')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Sort Ascending
                        </button>
                        <button
                            onClick={() => setSortOrder('desc')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Sort Descending
                        </button>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-green-500 text-center mb-4">Star Crop Prediction</h2>
                        <table className="min-w-full border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <h5>{receivedData.six_months_forecast[0][1]}</h5>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <h4>₹{receivedData.six_months_forecast[0][2]}</h4>
                                        <p className="flex items-center">
                                            {receivedData.six_months_forecast[0][3]}%
                                            <img src={gain} alt="Gain Icon" className="ml-2 h-4 w-4" />
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <h5>{receivedData.six_months_forecast[0][4]}</h5>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <h4>₹{receivedData.six_months_forecast[0][5]}</h4>
                                        <p className="flex items-center">
                                            {receivedData.six_months_forecast[0][6]}%
                                            <img src={loss} alt="Loss Icon" className="ml-2 h-4 w-4" />
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                        {CropImages.map((crop, index) => (
                            <Link key={index} to={`/reports?crop=${crop.crop_name}`} className="block p-4 border border-green-500 bg-green-100 rounded-md hover:shadow-lg">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={crop.crop_image}
                                        alt={crop.crop_name}
                                        className="rounded-md h-12 w-12 mb-2"
                                    />
                                    <span className="font-medium">{crop.crop_name.charAt(0).toUpperCase() + crop.crop_name.slice(1)}</span>
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
