import React from 'react';

const DiseasePrediction = ({ title, imageUrl, pred, desc, prevent, simage, sname, buyLink }) => {
  const isHealthy = [3, 5, 7, 11, 15, 18, 20, 23, 24, 25, 28, 38].includes(pred);

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mt-8">{title}🍂</h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-lg rounded-lg p-3 w-full max-w-md">
          <img src={imageUrl} alt={title} className="w-full h-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h5 className="font-bold text-xl mb-4">
            {isHealthy ? "Tips to Grow Healthy Plants :" : "Brief Description :"}
          </h5>
          <p>{desc}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-5">
          <h5 className="font-bold text-xl mb-4">
            {isHealthy ? "Benefits :" : "Prevent This Plant Disease By following below steps :"}
          </h5>
          <p>{prevent}</p>
        </div>

        {pred !== 4 && (
          <div className="bg-white shadow-lg rounded-lg p-5 text-center">
            <h5 className="font-bold text-xl mb-4">
              {isHealthy ? "Fertilizer :" : "Supplements :"}
            </h5>
            <img src={simage} alt={sname} className="mx-auto w-64 h-auto mb-4" />
            <h6 className="text-lg mb-4">{sname}</h6>
            <a 
              href={buyLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Buy Product
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePrediction;