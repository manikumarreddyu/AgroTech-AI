import React, { useState } from 'react';

const FertilizerRequirementsCalculator = () => {
  const [cropType, setCropType] = useState('');
  const [fieldArea, setFieldArea] = useState('');
  const [fertilizerCostPerKg, setFertilizerCostPerKg] = useState('');
  const [totalFertilizer, setTotalFertilizer] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [error, setError] = useState(null);

  // Fertilizer rate per hectare based on crop type
  const fertilizerRates = {
    wheat: 100, // kg per hectare
    corn: 120,  // kg per hectare
    rice: 150,  // kg per hectare
  };

  const calculateFertilizer = () => {
    const areaVal = parseFloat(fieldArea);
    const costPerKg = parseFloat(fertilizerCostPerKg);
    const rate = fertilizerRates[cropType];

    if (!areaVal || !costPerKg || areaVal <= 0 || costPerKg <= 0 || !rate) {
      setError("Please enter valid positive values for all fields.");
      setTotalFertilizer(null);
      setTotalCost(null);
      return;
    }

    setError(null);
    const fertilizerAmount = areaVal * rate;
    setTotalFertilizer(fertilizerAmount.toFixed(2));
    const cost = fertilizerAmount * costPerKg;
    setTotalCost(cost.toFixed(2));
  };

  const calculatorStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '450px',
    margin: '80px auto',
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

  const labelStyle = {
    display: 'block',
    margin: '10px 0 5px',
    fontWeight: '600',
    color: '#555',
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
      <div className="max-w-full mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8  " style={calculatorStyle}>
      <h2 className="text-xl font-bold text-green-500 mb-4">Fertilizer Requirements Calculator</h2>

      <label style={labelStyle}>Type of Crop:</label>
      <select
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Crop Type</option>
        <option value="wheat">Wheat</option>
        <option value="corn">Corn</option>
        <option value="rice">Rice</option>
      </select>

      <label style={labelStyle}>Field Area (hectares):</label>
      <input
        type="number"
        value={fieldArea}
        onChange={(e) => setFieldArea(e.target.value)}
        style={inputStyle}
        placeholder="Enter Field Area"
      />

      <label style={labelStyle}>Fertilizer Cost per Kg:</label>
      <input
        type="number"
        value={fertilizerCostPerKg}
        onChange={(e) => setFertilizerCostPerKg(e.target.value)}
        style={inputStyle}
        placeholder="Enter Fertilizer Cost per Kg"
      />

      <button onClick={calculateFertilizer} style={buttonStyle}>
        Calculate Fertilizer and Cost
      </button>

      {error && <p style={errorStyle}>{error}</p>}
      {totalFertilizer !== null && !error && (
        <p>Total Fertilizer Required: {totalFertilizer} kg</p>
      )}
      {totalCost !== null && !error && (
        <p>Total Cost: ${totalCost}</p>
      )}
    </div>
  );
};

export default FertilizerRequirementsCalculator;
