import  { useState } from 'react';
import bgHero from "../assets/bgHero.png";

const PlantDiseaseClassifier = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/crop_disease', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred while predicting.');
    }
  };

  return (
    <div className="max-w-full mt-20 mx-auto px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-2xl text-center text-green-600 font-bold mb-4">Plant Disease Classifier</h1>
      <div className="max-w-lg mx-auto mt-10 bg-green-300 text-center p-5 border-2 text-green-900 border-green-500 shadow-md rounded-md">
        <form id="uploadForm" encType="multipart/form-data" className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              name="file"
              id="fileInput"
              className="form-control-file w-full px-3 py-2 border border-gray-300 rounded"
              accept="image/*"
              required
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="w-full px-3 py-2 bg-orange-500 text-white rounded">
            Predict
          </button>
        </form>
        {result && (
          <div className="result mt-4 text-center font-bold">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDiseaseClassifier;
