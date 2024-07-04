import React, { useState } from "react";

const CropRecommendation = () => {
    const [isLoading, setIsloading] = useState(false);
    const [formData, setFormData] = useState({
        Nitrogen: '',
        Phosphorus: '',
        Potassium: '',
        Temperature: '',
        Humidity: '',
        ph: '',
        Rainfall: ''
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
        const url = "http://localhost:5000/crop_predict";
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
            <h1 className="text-2xl font-bold mb-4">crop recommendation</h1>
            <div className="max-w-lg mx-auto">
                <form method="post" acceptCharset="utf-8" name="Modelform">
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                            Nitrogen
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Nitrogen"
                            name="Nitrogen"
                            value={formData.Nitrogen}
                            onChange={handleChange}
                            placeholder="Enter Nitrogen "
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold mb-2">
                            Phosphorus
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Phosphorus"
                            name="Phosphorus"
                            value={formData.Phosphorus}
                            onChange={handleChange}
                            placeholder="Enter Phosphorus "
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold mb-2">
                            Potassium
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Potassium"
                            name="Potassium"
                            value={formData.Potassium}
                            onChange={handleChange}
                            placeholder="Enter Potassium "
                        />
                    </div>




                    <div>
                        <label className="block text-left font-semibold mb-2">
                            Temperature
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Temperature"
                            name="Temperature"
                            value={formData.Temperature}
                            onChange={handleChange}
                            placeholder="Enter Temperature "
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold mb-2">
                        Humidity
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Humidity"
                            name="Humidity"
                            value={formData.Humidity}
                            onChange={handleChange}
                            placeholder="Enter Humidity "
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold mb-2">
                        ph
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="ph"
                            name="ph"
                            value={formData.ph}
                            onChange={handleChange}
                            placeholder="Enter ph "
                        />
                    </div>
                    <div>
                        <label className="block text-left font-semibold mb-2">
                        Rainfall
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Rainfall"
                            name="Rainfall"
                            value={formData.Rainfall}
                            onChange={handleChange}
                            placeholder="Enter Rainfall "
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
                                <p>The Predicted crop  is <h1 className="text-red-900">{result} </h1> </p>
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

export default CropRecommendation;
