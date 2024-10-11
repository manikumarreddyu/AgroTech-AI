import React, { useState } from 'react';

const WaterRequirementCalculator = () => {
  const [soilType, setSoilType] = useState('');
  const [area, setArea] = useState('');
  const [temperature, setTemperature] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [cropType, setCropType] = useState('');
  const [waterRequirement, setWaterRequirement] = useState(null);
  const [error, setError] = useState(null);

  const calculateWaterRequirement = () => {
    const fieldArea = parseFloat(area);
    const temp = parseFloat(temperature);
    const rain = parseFloat(rainfall);

    // Basic validation for inputs
    if (!fieldArea || fieldArea <= 0 || !temp || temp < 0 || !rain || rain < 0) {
      setError("Please enter valid positive values for area, temperature, and rainfall.");
      setWaterRequirement(null);
      return;
    }

    // Basic validation for soil type and crop type
    if (!soilType || !cropType) {
      setError("Please select valid soil type and crop type.");
      setWaterRequirement(null);
      return;
    }

    setError(null);

    // Base water requirement per hectare based on crop type
    let baseWaterRequirement = 0;

    if (cropType === 'Wheat') {
      baseWaterRequirement = 500; // Example value in liters per hectare
    } else if (cropType === 'Corn') {
      baseWaterRequirement = 600; // Example value in liters per hectare
    } else if (cropType === 'Rice') {
      baseWaterRequirement = 700; // Example value in liters per hectare
    }

    // Adjust the base water requirement based on soil type
    if (soilType === 'clay') {
      baseWaterRequirement *= 1.2; // Example adjustment for clay soil
    } else if (soilType === 'loam') {
      baseWaterRequirement *= 1.0; // No adjustment for loam soil
    } else if (soilType === 'sandy') {
      baseWaterRequirement *= 0.8; // Example adjustment for sandy soil
    }

    // Calculate additional water needed based on temperature and rainfall
    const moistureAdjustment = rain > 50 ? -0.1 * baseWaterRequirement : 0; // Reduce requirement if rainfall is high
    const temperatureAdjustment = temp > 30 ? 0.2 * baseWaterRequirement : 0; // Increase requirement if temp is high

    // Final water requirement calculation
    const finalWaterRequirement = (baseWaterRequirement + temperatureAdjustment - moistureAdjustment) * fieldArea;

    setWaterRequirement(finalWaterRequirement.toFixed(2)); // Round to 2 decimal places
  };

  const calculatorStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '20px auto',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle = {
    width: '90%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border-color 0.2s',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  };

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  const outputStyle = {
    fontSize: '18px',
    marginTop: '20px',
    fontWeight: 'bold',
    color: '#333',
  };

  const labelStyle = {
    display: 'block',
    margin: '10px 0 5px',
    fontWeight: '600',
    color: '#555',
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#4CAF50';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = '#ddd';
  };

  return (
    <div style={calculatorStyle}>
      <h2 style={{ color: '#4CAF50' }}>Water Requirement Calculator</h2>

      <label style={labelStyle}>Soil Type:</label>
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

      <label style={labelStyle}>Crop Type:</label>
      <select
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Crop Type</option>
        <option value="Wheat">Wheat</option>
        <option value="Corn">Corn</option>
        <option value="Rice">Rice</option>
      </select>

      <label style={labelStyle}>Field Area (hectares):</label>
      <input
        type="number"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={inputStyle}
        placeholder="Enter Field Area (hectares)"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <label style={labelStyle}>Temperature (°C):</label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        style={inputStyle}
        placeholder="Enter Temperature (°C)"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <label style={labelStyle}>Rainfall (mm):</label>
      <input
        type="number"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
        style={inputStyle}
        placeholder="Enter Rainfall (mm)"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <button onClick={calculateWaterRequirement} style={buttonStyle}>
        Calculate Water Requirement
      </button>

      {error && <p style={errorStyle}>{error}</p>}
      {waterRequirement !== null && !error && (
        <p style={outputStyle}>Water Required: {waterRequirement} liters</p>
      )}
    </div>
  );
};

export default WaterRequirementCalculator;
