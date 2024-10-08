import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ChartComponent from "./Chart";
import CropImages from './CropImages';
import Spinner from './Spinner';
import { FaChartLine, FaMapMarkerAlt, FaRegEye, FaExchangeAlt } from 'react-icons/fa';

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cropName = searchParams.get('crop');
  const cropimg = CropImages.find(crop => crop.crop_name === cropName);

  const initialData = {
    "current_price": 1862.6,
    "export": "Jordan, United Arab Emirates, Taiwan",
    "forecast_values": [
      ["Aug 24", 1855.9, -0.36],
      ["Sep 24", 1855.9, -0.36],
      ["Oct 24", 1832.45, -1.62],
      ["Nov 24", 1909.5, 2.52],
      ["Dec 24", 2075.32, 11.42],
      ["Jan 25", 1953.05, 4.86],
      ["Feb 25", 1951.38, 4.77],
      ["Mar 25", 1953.05, 4.86],
      ["Apr 25", 1931.28, 3.69],
      ["May 25", 1941.32, 4.23],
      ["Jun 25", 1896.1, 1.8],
      ["Jul 25", 1862.6, 0.0]
    ],
    "forecast_x": [
      'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25'
    ],
    "forecast_y": [
      1855.9, 1855.9, 1832.45, 1909.5, 2075.32, 1953.05, 1951.38, 1953.05, 1931.28, 1941.32, 1896.1, 1862.6
    ],
    "image_url": "src/assets/crops/jute.png",
    "max_crop": ["Dec 24", 2075.32],
    "min_crop": ["Oct 24", 1832.45],
    "name": "jute",
    "prime_loc": "West Bengal, Assam, Orissa, Bihar, Uttar Pradesh",
    "type_c": "kharif"
  };
  
  const [receivedData, setReceivedData] = useState(initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://agro-ai-1.onrender.com/commodity_predict";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cropName }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setReceivedData(responseData);
      } catch (error) {
        console.log('Error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [cropName]);

  return (
    <>
      {loading ? <Spinner /> : (
        <div className="container mx-auto px-4 py-6 mt-5">
          <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-green-600">Crop Report</h1>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-green-200">
            <h2 className="text-3xl font-bold capitalize mb-4 text-center text-green-700">{receivedData.name}</h2>
            <div className="flex flex-wrap">
              {/* Image Section */}
              <div className="w-full md:w-1/2 p-4">
                <div className="border rounded-lg overflow-hidden shadow-md">
                  <img
                    src={cropimg?.crop_image}
                    alt="Crop"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Cards Section */}
              <div className="w-full md:w-1/2 p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Card for Current Price */}
                  <div>
                    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                      <FaRegEye className="text-2xl mb-2" />
                      <h3 className="text-xl font-semibold">Current Price</h3>
                      <p className="text-2xl">₹ {receivedData.current_price} / ql</p>
                    </div>
                  </div>
                  {/* Card for Prime Location */}
                  <div>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                      <FaMapMarkerAlt className="text-2xl mb-2" />
                      <h3 className="text-xl font-semibold">Prime Location</h3>
                      <p className="text-xl">{receivedData.prime_loc}</p>
                    </div>
                  </div>
                  {/* Card for Crop Type */}
                  <div>
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                      <FaChartLine className="text-2xl mb-2" />
                      <h3 className="text-xl font-semibold">Crop Type</h3>
                      <p className="text-xl">{receivedData.type_c}</p>
                    </div>
                  </div>
                  {/* Card for Export */}
                  <div>
                    <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                      <FaExchangeAlt className="text-2xl mb-2" />
                      <h3 className="text-xl font-semibold">Export</h3>
                      <p className="text-xl">{receivedData.export}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <h3 className="text-xl font-semibold text-green-600">Brief Forecast</h3>
              <div className="flex flex-wrap justify-center">
                {/* Min Crop Card */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h4 className="text-lg font-semibold">Min. Crop Price</h4>
                    <p>{receivedData.min_crop[0]}</p>
                    <p>₹ {receivedData.min_crop[1]}</p>
                  </div>
                </div>
                {/* Max Crop Card */}
                <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                  <div className="bg-gradient-to-r from-teal-400 to-teal-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h4 className="text-lg font-semibold">Max. Crop Price</h4>
                    <p>{receivedData.max_crop[0]}</p>
                    <p>₹ {receivedData.max_crop[1]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <ChartComponent
                forecastX={receivedData.forecast_x}
                forecastY={receivedData.forecast_y}
                previousX={receivedData.previous_x}
                previousY={receivedData.previous_y}
              />
            </div>
            <div className="mt-6">
              <Link to="/prices">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 shadow-md">
                  Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
