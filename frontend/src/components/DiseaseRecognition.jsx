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
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
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
    <div className='max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8'>
      <h2>Disease Recognition</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      {selectedImage && (
        <div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            style={{ width: '300px', height: 'auto' }}
          />
        </div>
      )}
      <br />
      <button onClick={handlePredict} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>
      <br /><br />
      {prediction && (
        <div>
          <h3>Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseRecognition;

