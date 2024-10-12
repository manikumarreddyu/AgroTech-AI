import React, { useState } from 'react';

const SoilMoistureCalculator = () => {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [soilType, setSoilType] = useState('');
  const [calculatedMoisture, setCalculatedMoisture] = useState(null);
  const [error, setError] = useState(null);

  const calculateSoilMoisture = () => {
    const rain = parseFloat(rainfall);
    const temp = parseFloat(temperature);

    // Basic validation for inputs
    if (!rain || !temp || rain < 0 || temp < 0) {
      setError("Please enter valid positive values for rainfall and temperature.");
      setCalculatedMoisture(null);
      return;
    }

    // Basic validation for soil type
    if (!soilType) {
      setError("Please select a valid soil type.");
      setCalculatedMoisture(null);
      return;
    }

    setError(null);

    // Example calculation logic based on rainfall, temperature, and soil type
    let baseMoisture;

    // Base moisture level based on soil type
    if (soilType === 'clay') {
      baseMoisture = 30; // Example base moisture for clay soil
    } else if (soilType === 'loam') {
      baseMoisture = 25; // Example base moisture for loam soil
    } else if (soilType === 'sandy') {
      baseMoisture = 20; // Example base moisture for sandy soil
    }

    // Adjust the base moisture based on rainfall and temperature
    const moistureFromRain = rain * 0.5; // Assuming rainfall contributes directly to moisture
    const moistureLossFromTemperature = temp * 0.2; // Assuming temperature affects moisture loss

    // Calculate final soil moisture
    const finalMoisture = baseMoisture + moistureFromRain - moistureLossFromTemperature;

    // Ensure moisture does not exceed 100%
    const adjustedMoisture = Math.min(100, Math.max(0, finalMoisture));
    
    setCalculatedMoisture(adjustedMoisture.toFixed(2));
  };

  const calculatorStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '450px',
    margin: '20px auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle = {
    width: '90%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return (
    <div style={calculatorStyle}>
      <h2>Soil Moisture Calculator</h2>

      <label>Rainfall (mm):</label>
      <input
        type="number"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
        style={inputStyle}
        placeholder="Enter Rainfall (mm)"
      />

      <label>Temperature (°C):</label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        style={inputStyle}
        placeholder="Enter Temperature (°C)"
      />

      <label>Soil Type:</label>
      <select
        value={soilType}
        onChange={(e) => setSoilType(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Soil Type</option>
        <option value="clay">Clay</option>
        <option value="loam">Loam</option>
        <option value="sandy">Sandy</option>
      </select>

      <button onClick={calculateSoilMoisture} style={buttonStyle}>
        Calculate Soil Moisture
      </button>

      {error && <p style={errorStyle}>{error}</p>}
      {calculatedMoisture !== null && !error && (
        <p>Calculated Soil Moisture: {calculatedMoisture}%</p>
      )}
    </div>
  );
};

export default SoilMoistureCalculator;
