import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [soilCenters, setSoilCenters] = useState([]);

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const defaultCenter = {
    lat: currentPosition.lat,
    lng: currentPosition.lng
  };

  // Load user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude
        });

        // Fetch nearby soil testing centers (mock data here, replace with real API call)
        setSoilCenters([
          { id: 1, name: 'Soil Center 1', location: { lat: latitude + 0.01, lng: longitude + 0.01 } },
          { id: 2, name: 'Soil Center 2', location: { lat: latitude - 0.01, lng: longitude - 0.01 } },
        ]);
      },
      () => {
        console.error("Geolocation not supported or permission denied.");
      }
    );
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      >
        {soilCenters.map(center => (
          <Marker
            key={center.id}
            position={center.location}
            title={center.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map ;
