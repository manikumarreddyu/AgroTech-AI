import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import '../styles/SoilTestingCenters.css'; // Import custom CSS

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function SoilTestingCenters() {
  const [location, setLocation] = useState('');
  const [labs, setLabs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const findSoilLabs = async () => {
    if (!location) {
      setError('Please enter a location');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://agro-tech-ai-soil-testing-labs-api.onrender.com/find_soil_labs', {
        location: location,
      });

      if (response.status === 200) {
        setLabs(response.data);
        setError('');
      } else {
        setError('Error fetching data');
      }
    } catch (err) {
      console.error(err);
      setError('API request failed. Please check your server.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">Soil Testing Centers Finder</h1>
        <div className="flex justify-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={findSoilLabs}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find Soil Labs'}
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {labs.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-blue-800">Nearby Soil Testing Labs</h2>
            <div className="map-container border-4 border-blue-200 rounded-lg overflow-hidden shadow-lg">
              <MapContainer 
                center={[labs[0].latitude, labs[0].longitude]} 
                zoom={10} 
                className="h-96 w-full"
                zoomControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ZoomControl position="bottomright" />
                {labs.map((lab, index) => (
                  <Marker key={index} position={[lab.latitude, lab.longitude]}>
                    <Popup>
                      <b>{lab.name}</b> <br />
                      <a href={lab.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Maps</a>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Lab List:</h3>
              <ul className="space-y-4">
                {labs.map((lab, index) => (
                  <li key={index} className="bg-white p-4 rounded-lg shadow">
                    <span className="font-semibold">{lab.name}</span> -{' '}
                    <a 
                      href={lab.link} 
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

        {labs.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600">No labs found. Try a different location.</p>
        )}
      </div>
    </div>
  );
}
