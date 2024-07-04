import  { useState } from 'react';
import axios from 'axios';

function CropForm() {
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    ph: '',
    Rainfall: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/form', formData);
    // handle the response as needed
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {Object.keys(formData).map((key) => (
        <div key={key} className="mb-4">
          <label htmlFor={key} className="block text-gray-700">
            {key}:
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>
      ))}
      <input type="submit" className="bg-blue-500 text-white px-4 py-2" value="Predict Your Crop" />
    </form>
  );
}

export default CropForm;
