import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIEngine = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [previewUrl, setPreviewUrl] = useState(null); // To store the image preview URL
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : 'No file chosen');

    // Set image preview
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('https://disease-prediction-api-2.onrender.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/submit', { state: { result } });
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-500">🍀AI Engine🍀</h1>
        <p className="text-xl text-gray-700 mt-2">Let AI Engine Help You To Detect Disease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Why is it necessary to detect disease in plants?</h5>
          <p className="text-gray-700">
            Plant diseases affect the growth of their respective species...
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <img
            src="https://www.pngjoy.com/pngl/250/4840262_plants-png-indoors-tropical-plant-png-hd-png.png"
            alt="Plant"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image preview */}
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Selected file preview"
                  className="w-96 h-96 object-contain rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-center mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <span className="ml-3 text-gray-700">{fileName}</span>
            </div>

            <p className="text-center text-gray-600">
              Simply upload your plant's leaf image and then see the magic of AI.
            </p>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Prevent Plant Disease by following these steps:</h5>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Follow Good Sanitation Practices.</li>
            <li>Fertilize to Keep Your Plants Healthy.</li>
            <li>Inspect Plants for Diseases Before You Bring Them Home.</li>
            <li>Allow the Soil to Warm Before Planting.</li>
            <li>Ensure a Healthy Vegetable Garden By Rotating Crops.</li>
            <li>Provide Good Air Circulation.</li>
            <li>Remove Diseased Stems and Foliage.</li>
          </ol>
          <a
            href="/article"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIEngine;


{/*}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AIEngine = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : 'No file chosen');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
     // const response = await fetch('http://127.0.0.1:5000/submit', {
       const response = await fetch('https://disease-prediction-api-2.onrender.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/submit', { state: { result } });
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-500">🍀AI Engine🍀</h1>
        <p className="text-xl text-gray-700 mt-2">Let AI Engine Help You To Detect Disease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Why is it necessary to detect disease in plants?</h5>
          <p className="text-gray-700">
            Plant diseases affect the growth of their respective species. In addition, some research gaps are
            identified from which to obtain greater transparency for detecting diseases in plants, even
            before their symptoms appear clearly. Diagnosis is one of the most important aspects of a plant pathologist's training. Without proper
            identification of the disease and the disease-causing agent, disease control measures can be a
            waste of time and money and can lead to further plant losses. Proper disease diagnosis is
            necessary.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <img
            src="https://www.pngjoy.com/pngl/250/4840262_plants-png-indoors-tropical-plant-png-hd-png.png"
            alt="Plant"
            className="w-48 h-48 object-cover rounded-full mx-auto mb-6"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-center">
              <label htmlFor="file-upload" className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <span className="ml-3 text-gray-700">{fileName}</span>
            </div>

            <p className="text-center text-gray-600">
              Simply upload your plant's leaf image and then see the magic of AI.
            </p>

            <div className="text-center">
              <button 
                type="submit" 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">Prevent Plant Disease by following these steps:</h5>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Follow Good Sanitation Practices.</li>
            <li>Fertilize to Keep Your Plants Healthy.</li>
            <li>Inspect Plants for Diseases Before You Bring Them Home.</li>
            <li>Allow the Soil to Warm Before Planting.</li>
            <li>Ensure a Healthy Vegetable Garden By Rotating Crops.</li>
            <li>Provide Good Air Circulation</li>
            <li>Remove Diseased Stems and Foliage</li>
          </ol>
          <a
            href="/article"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIEngine;
*/}