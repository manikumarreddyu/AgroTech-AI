import React, { useState } from 'react';

const DiseaseImage = () => {
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mt-8">🍀AI Engine🍀</h1>
        <p className="text-xl text-gray-700">Let AI Engine Help You To Detect Disease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h5 className="font-bold text-xl mb-4">Why is it necessary to detect disease in plant?</h5>
          <p className="text-gray-700">
            Plant diseases affect the growth of their respective species. In addition, some research gaps are
            identified from which to obtain greater transparency for detecting diseases in plants, even
            before their symptoms appear clearly.
            Diagnosis is one of the most important aspects of a plant pathologist's training. Without proper
            identification of the disease and the disease-causing agent, disease control measures can be a
            waste of time and money and can lead to further plant losses. Proper disease diagnosis is
            necessary.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
          <img
            src="https://www.pngjoy.com/pngl/250/4840262_plants-png-indoors-tropical-plant-png-hd-png.png"
            alt="Plant"
            className="w-48 h-auto mb-6 rounded-full"
          />

          <form action="/submit" method="POST" encType="multipart/form-data" className="w-full">
            <div className="mb-4">
              <input 
                type="file" 
                id="actual-btn" 
                hidden 
                name="image" 
                onChange={handleFileChange}
              />
              <label 
                htmlFor="actual-btn"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-3 text-gray-700">{fileName}</span>
            </div>

            <p className="text-center mb-4 text-gray-600">
              Simply upload your plant's leaf image and then see the magic of AI.
            </p>

            <button 
              type="submit" 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5">
          <h5 className="font-bold text-xl mb-4">Prevent Plant Disease follow below steps:</h5>
          <ol className="list-decimal pl-5 mb-4">
            <li>Follow Good Sanitation Practices.</li>
            <li>Fertilize to Keep Your Plants Healthy.</li>
            <li>Inspect Plants for Diseases Before You Bring Them Home.</li>
            <li>Allow the Soil to Warm Before Planting.</li>
            <li>Ensure a Healthy Vegetable Garden By Rotating Crops.</li>
            <li>Provide Good Air Circulation</li>
            <li>Remove Diseased Stems and Foliage</li>
          </ol>
          <a 
            href="https://www.thespruce.com/prevent-plant-diseases-in-your-garden-2539511" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            More info
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiseaseImage;