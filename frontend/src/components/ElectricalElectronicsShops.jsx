import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import '../styles/ElectricalElectronicsShops.css';
import BgImg from '../assets/crop_monitor.jpg';

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ElectricalElectronicsShops() {
  const [location, setLocation] = useState('');
  const [shops, setShops] = useState([]);  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const findShops = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/find_ee_shops", {
        location: location,
      });
      
      if (response.status === 200) {
        setShops(response.data); 
        setError('');
      } else {
        setError('Error fetching data');
      }
    } catch (err) {
      console.error('API request failed:', err);
      setError('API request failed. Please check your server.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10"
          style={{ 
        backgroundImage: `url(${BgImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}>
      <div className="glassmorphic-container max-w-4xl w-full space-y-8 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800">Electrical and Electronics Shop Finder</h1>
        <div className="flex justify-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={findShops} 
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="loader mx-auto"></div>
            ) : (
              'Find Shops'
            )}
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {shops.length > 0 && ( 
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-blue-800">Nearby Electrical and Electronics Shops</h2>
            <div className="map-container border-4 border-blue-200 rounded-lg overflow-hidden shadow-lg">
              <MapContainer 
                center={[shops[0].latitude, shops[0].longitude]}
                zoom={10} 
                className="h-96 w-full"
                zoomControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="bottomright" />
                {shops.map((shop, index) => ( 
                  <Marker key={index} position={[shop.latitude, shop.longitude]}>
                    <Popup>
                      <b>{shop.name}</b> <br />
                      <a href={shop.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Maps</a>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Shop List:</h3>
              <ul className="space-y-4 map-container">
                {shops.map((shop, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow">
                    <span className="font-semibold">{shop.name}</span> -{' '}
                    <a 
                      href={shop.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google Maps Link
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {shops.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No shops found. Try a different location.</p>
        )}
      </div>
    </div>
  );
}
