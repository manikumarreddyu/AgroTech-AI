import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChartComponent from "./Chart";


const Report = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const crop = searchParams.get('commodity');

  const [CData, setCData] = useState(null);

  const initialData = {
    "current_price": 1862.6,
    "export": "JOrdan, United Arab Emirates, Taiwan",
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
    "image_url": "src/assets/crops_images/jute.png",
    "max_crop": ["Dec 24", 2075.32],
    "min_crop": ["Oct 24", 1832.45],
    "name": "jute",
    "previous_values": [
      ["Jul 23", 1951.38],
      ["Aug 23", 1954.72],
      ["Sep 23", 1963.1],
      ["Oct 23", 1983.2],
      ["Nov 23", 1993.25],
      ["Dec 23", 1983.2],
      ["Jan 24", 1827.42],
      ["Feb 24", 1852.55],
      ["Mar 24", 1948.02],
      ["Apr 24", 1978.18],
      ["May 24", 1979.85],
      ["Jun 24", 1971.48]
    ],
    "previous_x": [
      "Jul 23", "Aug 23", "Sep 23", "Oct 23", "Nov 23", "Dec 23", "Jan 24", "Feb 24", "Mar 24", "Apr 24", "May 24", "Jun 24"
    ],
    "previous_y": [
      1951.38, 1954.72, 1963.1, 1983.2, 1993.25, 1983.2, 1827.42, 1852.55, 1948.02, 1978.18, 1979.85, 1971.48
    ],
    "prime_loc": " West Bengal , Assam , Orissa , Bihar , Uttar Pradesh",
    "type_c": "kharif"
  };
  const [receivedData, setReceivedData] = useState(initialData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:5000/commodity_predict";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ crop }), // Adjust 'jute' as needed
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log(responseData);
        setReceivedData(responseData);
      } catch (error) {
        console.log('Error:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [CData]); // Only run effect when CData changes or on mount

  console.log(receivedData);

  return (
    <div className="container mx-auto px-4 py-6 mt-5">
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold">Report of crop</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold capitalize mb-4">{receivedData.name}</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="border rounded-lg overflow-hidden">
              <img
                src={receivedData.image_url}
                alt="Crop"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 p-4">
            <table className="table-auto w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Current Price</td>
                  <td className="py-2"><b>₹ {receivedData.current_price} / ql</b></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Prime Location</td>
                  <td className="py-2"><b>{receivedData.prime_loc}</b></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Crop Type</td>
                  <td className="py-2"><b>{receivedData.type_c}</b></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Export</td>
                  <td className="py-2"><b>{receivedData.export}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <h3 className="text-xl font-semibold">Brief Forecast</h3>
          <table className="table-auto w-full mt-2">
            <tbody>
              <tr className="border-b">
                <td className="py-2">Min. crop price time</td>
                <td className="py-2">{receivedData.min_crop[0]}</td>
                <td className="py-2">₹{receivedData.min_crop[1]}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Max. crop price time</td>
                <td className="py-2">{receivedData.max_crop[0]}</td>
                <td className="py-2">₹{receivedData.max_crop[1]}</td>
              </tr>
            </tbody>
          </table>
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
          <Link to="/price">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Report;
