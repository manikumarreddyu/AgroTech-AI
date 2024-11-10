import React, { useState } from 'react';
import axios from 'axios';

const DiseaseRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setPrediction('');
  };

  const handlePredict = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    try {
      const response = await axios.post('https://agrotech-api.onrender.com/disease_predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting disease:", error.response ? error.response.data : error.message);
      alert("An error occurred while predicting.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400 p-4 mt-10">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Disease Recognition</h2>
        <p className="mb-6 text-gray-700">Upload an image of your plant to identify potential diseases.</p>
        
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-green-500 file:text-white
                       hover:file:bg-green-600 transition
                       cursor-pointer"
          />
        </div>

        {selectedImage && (
          <div className="mb-6">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              className="mx-auto rounded-md shadow-md max-w-xs"
            />
          </div>
        )}

        <button
          onClick={handlePredict}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-semibold
                      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}
                      transition duration-300`}
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {prediction && (
          <div className="mt-6 p-4 border border-green-500 rounded-md bg-green-50 text-left">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Prediction:</h3>
            <p className="text-gray-800">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseRecognition;
