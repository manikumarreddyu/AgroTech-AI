import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import gain from '../assets/images/gain-icon.png';
import loss from '../assets/images/loss-icon.png';
import bgHero from "../assets/bgHero.png";

const Prices = () => {
    const commodityArray = ['arhar', 'bajra', 'barley', 'copra', 'urad', 'gram', 'groundnut', 'jowar', 'jute', 'maize', 'masoor', 'moong', 'niger', 'paddy', 'ragi', 'rape'];

    const initialData = {
        chunks: [
            ["arhar", "bajra", "barley", "copra", "urad", "gram", "groundnut", "jowar"],
            ["jute", "maize", "masoor", "moong", "niger", "paddy", "ragi", "rape"]
        ],
        commodities: ["arhar"],
        six_months_forecast: [
            ["Aug 24", "Copra", 5650.8, -0.36, "Barley", 1085.84, -0.36],
        ],
        top_gainers: [
            ["Gram", 3592.4, 5.51],
        ],
        top_losers: [
            ["Niger", 4648.0, -6.28],
        ]
    };

    const [receivedData, setReceivedData] = useState(initialData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/price_predict');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                setReceivedData(responseData);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4 py-6 mt-12">
            <h1 className="text-3xl font-bold text-center mb-6">Price Prediction</h1>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Top Gainers (Current trends)</h2>
                    <table className="min-w-full text-left border-collapse border border-gray-300 ">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">Item Name</th>
                                <th className="px-4 py-2 border border-gray-300">Price (per Qtl.)</th>
                                <th className="px-4 py-2 border border-gray-300">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receivedData.top_gainers.map((ele, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-300">{ele[0]}</td>
                                    <td className="px-4 py-2 border border-gray-300">{ele[1]}</td>
                                    <td className="px-4 py-2 border border-gray-300">{ele[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Top Losers (Current trends)</h2>
                    <table className="min-w-full text-left border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border border-gray-300">Item Name</th>
                                <th className="px-4 py-2 border border-gray-300">Price (per Qtl.)</th>
                                <th className="px-4 py-2 border border-gray-300">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receivedData.top_losers.map((ele, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-gray-300">{ele[0]}</td>
                                    <td className="px-4 py-2 border border-gray-300">{ele[1]}</td>
                                    <td className="px-4 py-2 border border-gray-300">{ele[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Star Commodity Prediction</h2>
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
                {commodityArray.map((commodity, index) => (
                    <Link key={index} to={`/reports?commodity=${commodity}`} className="block p-4 border border-gray-300 rounded-md hover:shadow-lg">
                        <div className="flex flex-col items-center">
                            <img
                                src={`src/assets/crops_images/${commodity}.png`}
                                alt={commodity}
                                className="h-12 w-12 mb-2"
                            />
                            <span className="font-medium">{commodity.charAt(0).toUpperCase() + commodity.slice(1)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Prices;
