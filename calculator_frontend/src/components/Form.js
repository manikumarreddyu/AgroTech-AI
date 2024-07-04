import React, { useState } from "react";

const Form = () => {
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    Year: "",
    Present_Price: "",
    Kms_Driven: "",
    Fuel_Type: "",
    Seller_Type: "",
    Transmission: "",
    Owner: "",
  });
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    let inputData = { ...formData };
    inputData[name] = value;
    setFormData(inputData);
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/predict";
    setIsloading(true);
    const jsonData = JSON.stringify(formData);
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Prediction);
        setIsloading(false);
        setShowSpan(true);
      });
  };

  return (
    <div className="container mx-auto text-center mt-4">
      <h1 className="text-2xl font-bold mb-4">Car Price Prediction</h1>
      <div className="max-w-lg mx-auto">
        <form method="post" acceptCharset="utf-8" name="Modelform">
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Enter Year of Purchase:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Year"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter Year of Purchase "
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Enter Present Price(in Lakhs):
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Present_Price"
              name="Present_Price"
              value={formData.Present_Price}
              onChange={handleChange}
              placeholder="Enter Present Price(in Lakhs)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Enter the Number of Kilometres that the car has travelled:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Kms_Driven"
              name="Kms_Driven"
              value={formData.Kms_Driven}
              onChange={handleChange}
              placeholder="Enter the kilometres driven "
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Select the Fuel Type:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Fuel_Type"
              name="Fuel_Type"
              value={formData.Fuel_Type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Petrol</option>
              <option value="1">Diesel</option>
              <option value="2">CNG</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Select the Seller Type:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Seller_Type"
              name="Seller_Type"
              value={formData.Seller_Type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Dealer</option>
              <option value="1">Individual</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Select the Transmission Type:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Transmission"
              name="Transmission"
              value={formData.Transmission}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="0">Manual</option>
              <option value="1">Automatic</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold mb-2">
              Enter the Number of Owners:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              id="Owner"
              name="Owner"
              value={formData.Owner}
              onChange={handleChange}
              placeholder="Enter the number of Owner "
            />
          </div>
          <div className="mb-4">
            <button
              className="w-full px-3 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
              disabled={isLoading}
              onClick={!isLoading ? handlePredictClick : null}
            >
              {isLoading ? "Predicting..." : "Predict Selling Price"}
            </button>
          </div>
        </form>
        {showSpan && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">
              {result && Object.keys(result).length !== 0 ? (
                <p>The Predicted Price is {result} Lakhs</p>
              ) : (
                <p>Please fill out each field in the form completely</p>
              )}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
