import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import gain from '../../assets/images/gain-icon.png';
import loss from '../../assets/images/loss-icon.png';
import CropImages from "././CropImages";

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
            {
                crop: "Gram",
                high: 3592.4,
                low: 3550.0,
                lastPrice: 3580.0,
                prevChange: 5.51,
                change: 2.34,
                percentageGain: 0.66,
            },
            {
                crop: "Arhar",
                high: 4850.2,
                low: 4800.0,
                lastPrice: 4840.0,
                prevChange: 7.23,
                change: 3.10,
                percentageGain: 0.64,
            },
            {
                crop: "Bajra",
                high: 1102.6,
                low: 1080.0,
                lastPrice: 1095.0,
                prevChange: 4.87,
                change: 2.23,
                percentageGain: 0.20,
            },
            {
                crop: "Wheat",
                high: 2200.5,
                low: 2150.0,
                lastPrice: 2180.0,
                prevChange: 6.10,
                change: 2.00,
                percentageGain: 0.92,
            },
            {
                crop: "Soybean",
                high: 4500.0,
                low: 4450.0,
                lastPrice: 4480.0,
                prevChange: 5.00,
                change: 1.50,
                percentageGain: 0.67,
            },
        ],
        top_losers: [
            {
                crop: "Niger",
                high: 4648.0,
                low: 4600.0,
                lastPrice: 4620.0,
                prevChange: -6.28,
                change: -2.51,
                percentageGain: -0.54,
            },
            {
                crop: "Barley",
                high: 1850.2,
                low: 1800.0,
                lastPrice: 1820.0,
                prevChange: -4.12,
                change: -1.80,
                percentageGain: -0.41,
            },
            {
                crop: "Maize",
                high: 990.6,
                low: 970.0,
                lastPrice: 980.0,
                prevChange: -3.56,
                change: -2.13,
                percentageGain: -0.33,
            },
            {
                crop: "Rice",
                high: 2000.0,
                low: 1950.0,
                lastPrice: 1980.0,
                prevChange: -5.20,
                change: -1.50,
                percentageGain: -0.75,
            },
            {
                crop: "Sugarcane",
                high: 3500.0,
                low: 3450.0,
                lastPrice: 3480.0,
                prevChange: -2.00,
                change: -1.20,
                percentageGain: -0.34,
            },
        ],
    };

    const guidelines = [
        {
            title: "Understanding Market Trends",
            description: "Stay updated with the latest market trends to make informed decisions.",
            icon: "📈",
        },
        {
            title: "Analyzing Historical Data",
            description: "Review historical price data to predict future movements.",
            icon: "📊",
        },
        {
            title: "Risk Assessment",
            description: "Evaluate the risk factors associated with each crop before investing.",
            icon: "⚖️",
        },
        {
            title: "Consult Expert Opinions",
            description: "Seek advice from agricultural experts and analysts for better insights.",
            icon: "👨‍🌾",
        },
        {
            title: "Diversification",
            description: "Diversify your investment across multiple crops to minimize risks.",
            icon: "🌱",
        },
    ];

    const renderCandles = (change) => {
        // Create candle representation
        return (
            <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-6 rounded ${change > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    ></div>
                ))}
            </div>
        );
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
                    <h1 className="text-5xl font-bold text-green-500 text-center mb-6 mt-10">Price Prediction</h1>

                    <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guidelines.map((guideline, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-green-500 hover:shadow-md transition-shadow duration-500"
                                >
                                    <div className="flex items-center mb-4">
                                        <span className="text-4xl mr-4">{guideline.icon}</span>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {guideline.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600">{guideline.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="gap-6 mb-6">
                    <div className="mb-6 md:p-6 md:bg-gradient-to-r from-green-100 to-green-300 rounded-lg shadow-lg mx-10 my-16 transition-transform transform hover:scale-105">
                        <h2 className="text-4xl sm:text-3xl md:text-4xl text-green-800 text-center font-bold mb-6">Top Gainers</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-green-600 text-white">
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Crop</th>
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">High</th>
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Low</th>
                                        <th className="hidden sm:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Last Price</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Prev Change</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Change</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">% Gain</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">5-Day Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {initialData.top_gainers.map((gainer, index) => (
                                        <tr key={index} className="hover:bg-green-200 transition duration-300 ease-in-out">
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">{gainer.crop}</td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{gainer.high}</td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{gainer.low}</td>
                                            <td className="hidden sm:table-cell py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{gainer.lastPrice}</td>
                                            <td className={`hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${gainer.prevChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {gainer.prevChange}%
                                            </td>
                                            <td className={`hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${gainer.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {gainer.change}%
                                            </td>
                                            <td className={`hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${gainer.percentageGain > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {gainer.percentageGain}%
                                            </td>
                                            <td className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">
                                                {renderCandles(gainer.change)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>




                    <div className="mb-6 md:p-6 md:bg-gradient-to-r from-red-100 to-red-300 rounded-lg shadow-lg mx-10 my-16 transition-transform transform hover:scale-105">
                        <h2 className="text-4xl sm:text-3xl md:text-4xl text-red-800 text-center font-bold mb-6">Top Losers</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                <thead>
                                    <tr className="bg-red-600 text-white">
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Crop</th>
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">High</th>
                                        <th className="py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Low</th>
                                        <th className="hidden sm:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Last Price</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Prev Change</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">Change</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">% Loss</th>
                                        <th className="hidden lg:table-cell py-4 px-2 sm:px-4 md:px-6 text-left text-lg sm:text-base md:text-lg font-semibold">5-Day Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {initialData.top_losers.map((loser, index) => (
                                        <tr key={index} className="hover:bg-red-50 transition duration-300 ease-in-out">
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">{loser.crop}</td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{loser.high}</td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{loser.low}</td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">₹{loser.lastPrice}</td>
                                            <td className={`py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${loser.prevChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {loser.prevChange}%
                                            </td>
                                            <td className={`py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${loser.change < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {loser.change}%
                                            </td>
                                            <td className={`py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg ${loser.percentageLoss < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {loser.percentageLoss}%
                                            </td>
                                            <td className="py-4 px-2 sm:px-4 md:px-6 border-b text-lg sm:text-base md:text-lg text-gray-800">
                                                {renderCandles(loser.change)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

                    <div className="mb-6 my-5">
                        <h2 className="text-3xl font-bold text-green-500 text-center mb-4 py-10">Star Crop Prediction</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-r from-green-200 to-green-300 rounded-lg shadow-lg p-6 border border-gray-200 hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 transition-all duration-300">
                                <h5 className="text-lg font-semibold text-gray-800">{receivedData?.six_months_forecast?.[0]?.[1] || 'N/A'}</h5>
                                <h4 className="text-2xl font-bold text-green-600">₹{receivedData?.six_months_forecast?.[0]?.[2] || 'N/A'}</h4>
                                <p className="flex items-center mt-2">
                                    {receivedData?.six_months_forecast?.[0]?.[3] || 'N/A'}%
                                    <img src={gain} alt="Gain Icon" className="ml-2 h-4 w-4" />
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-red-300 to-red-200 rounded-lg shadow-lg p-6 border border-gray-200 hover:bg-gradient-to-r hover:from-red-300 hover:to-red-500 transition-all duration-300">
                                <h5 className="text-lg font-semibold text-gray-800">{receivedData.six_months_forecast?.[0]?.[4] || 'N/A'}</h5>
                                <h4 className="text-2xl font-bold text-red-600">₹{receivedData.six_months_forecast?.[0]?.[5] || 'N/A'}</h4>
                                <p className="flex items-center mt-2">
                                    {receivedData.six_months_forecast?.[0]?.[6] || 'N/A'}%
                                    <img src={loss} alt="Loss Icon" className="ml-2 h-4 w-4" />
                                </p>
                            </div>
                        </div>
                    </div>


                    <h2 className="text-3xl font-bold text-green-500 text-center mb-4 py-10">All Crops</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                        
                        {CropImages.map((crop, index) => (
                            <Link
                                key={index}
                                to={`/reports?crop=${crop.crop_name}`}
                                className="block p-6 border hover:shadow-green-300   rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={crop.crop_image}
                                        alt={crop.crop_name}
                                        className="rounded-lg h-20 w-20 mb-4"
                                    />
                                    <span className="text-lg font-semibold text-green-800">
                                        {crop.crop_name.charAt(0).toUpperCase() + crop.crop_name.slice(1)}
                                    </span>
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
