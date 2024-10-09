import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const Submit = () => {
  const location = useLocation();
  const result = location.state?.result;
  const id = location.state?.id;
  if (!result) {
    return <Navigate to="/engine" />;
  }
  if (id == 1)
    return (<div class="bg-white p-10 rounded-lg shadow-lg text-center mt-8">
      <h1 class="text-4xl font-bold text-green-600 mb-4">Sugarcane Disease Prediction</h1>
      <p class="text-lg text-gray-700">
        This page will display the results for the sugarcane disease prediction model.
      </p>
    </div>)
  const { title, desc, prevent, image_url, pred, sname, simage, buy_link } = result;

  return (
    <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800">{title}🍂</h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <img src={image_url} alt={title} className="w-full max-w-md h-auto" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">
            {pred === 3 || pred === 5 || pred === 7 || pred === 11 || pred === 15 || pred === 18 || pred === 20 || pred === 23 || pred === 24 || pred === 25 || pred === 28 || pred === 38
              ? 'Tips to Grow Healthy Plants:'
              : 'Brief Description:'}
          </h5>
          <p className="text-gray-700">{desc}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h5 className="font-bold text-xl mb-4">
            {pred === 3 || pred === 5 || pred === 7 || pred === 11 || pred === 15 || pred === 18 || pred === 20 || pred === 23 || pred === 24 || pred === 25 || pred === 28 || pred === 38
              ? 'Benefits:'
              : 'Prevent This Plant Disease By following these steps:'}
          </h5>
          <p className="text-gray-700">{prevent}</p>
        </div>

        {pred !== 4 && (
          <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4">
                {pred === 3 || pred === 5 || pred === 7 || pred === 11 || pred === 15 || pred === 18 || pred === 20 || pred === 23 || pred === 24 || pred === 25 || pred === 28 || pred === 38
                  ? 'Fertilizer:'
                  : 'Supplements:'}
              </h5>
              <img src={simage} alt={sname} className="w-64 h-64 object-cover mx-auto mb-4" />
              <h6 className="font-medium text-lg mb-4">{sname}</h6>
              <a
                href={buy_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Buy Product
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submit;
