import React, { useState } from 'react';

const CropYieldCalculator = () => {
  const [fieldSize, setFieldSize] = useState(0);
  const [plantPopulation, setPlantPopulation] = useState(0);
  const [yieldPerPlant, setYieldPerPlant] = useState(0);
  const [totalYield, setTotalYield] = useState(null);

  const calculateYield = () => {
    const result = fieldSize * plantPopulation * yieldPerPlant;
    setTotalYield(result);
  };

  const calculatorStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const inputStyle = {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  return (
    <div style={calculatorStyle}>
      <h2>Crop Yield Calculator</h2>
      <label>Field Size (hectares):</label>
      <input
        type="number"
        value={fieldSize}
        onChange={(e) => setFieldSize(e.target.value)}
        style={inputStyle}
      /><br />

      <label>Plant Population per Hectare:</label>
      <input
        type="number"
        value={plantPopulation}
        onChange={(e) => setPlantPopulation(e.target.value)}
        style={inputStyle}
      /><br />

      <label>Expected Yield per Plant (kg):</label>
      <input
        type="number"
        value={yieldPerPlant}
        onChange={(e) => setYieldPerPlant(e.target.value)}
        style={inputStyle}
      /><br />

      <button onClick={calculateYield} style={buttonStyle}>Calculate Yield</button>

      {totalYield !== null && <p>Estimated Yield: {totalYield} tons</p>}
    </div>
  );
};

export default CropYieldCalculator;

