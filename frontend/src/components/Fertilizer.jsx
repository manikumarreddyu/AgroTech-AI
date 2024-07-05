import  { useState } from "react";

const Fertilizer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        Temparature: '',
        Humidity: '',
        Moisture: '',
        Soil_Type: '',
        Crop_Type: '',
        Nitrogen: '',
        Potassium: '',
        Phosphorous: ''
    });
    const [result, setResult] = useState("");
    const [showSpan, setShowSpan] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePredictClick = (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/fertilizer_predict";
        setIsLoading(true);
        const jsonData = JSON.stringify(formData);
        console.log("Sending data:", jsonData); // Log the data being sent
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: jsonData,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((response) => {
            console.log("Received response:", response); // Log the response
            setResult(response.Prediction);
            setIsLoading(false);
            setShowSpan(true);
        })
        .catch((error) => {
            console.error("Error:", error);
            setIsLoading(false);
            setShowSpan(true);
            setResult("Error: Unable to predict fertilizer");
        });
    };

    return (
        <div className="container mx-auto text-center mt-4">
            <h1 className="text-2xl font-bold mb-4">Fertilizer Prediction</h1>
            <div className="max-w-lg mx-auto">
                <form method="post" acceptCharset="utf-8" name="Modelform">
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                            Temperature
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Temparature"
                            name="Temparature"
                            value={formData.Temparature}
                            onChange={handleChange}
                            placeholder="Enter temperature"
                        />
                    </div>
                    <div className="mb-4">
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
                            placeholder="Enter humidity"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                            Moisture
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Moisture"
                            name="Moisture"
                            value={formData.Moisture}
                            onChange={handleChange}
                            placeholder="Enter moisture"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                            Select the Soil Type:
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Soil_Type"
                            name="Soil_Type"
                            value={formData.Soil_Type}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option value="0">Black</option>
                            <option value="1">Clayey</option>
                            <option value="2">Loamy</option>
                            <option value="3">Red</option>
                            <option value="4">Sandy</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                            Select the Crop Type:
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Crop_Type"
                            name="Crop_Type"
                            value={formData.Crop_Type}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option value="0">Barley</option>
                            <option value="1">Cotton</option>
                            <option value="2">Ground Nuts</option>
                            <option value="3">Maize</option>
                            <option value="4">Millets</option>
                            <option value="5">Oil Seeds</option>
                            <option value="6">Paddy</option>
                            <option value="7">Pulses</option>
                            <option value="8">Sugarcane</option>
                            <option value="9">Tobacco</option>
                            <option value="10">Wheat</option>
                        </select>
                    </div>
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
                            placeholder="Enter nitrogen"
                        />
                    </div>
                    <div className="mb-4">
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
                            placeholder="Enter potassium"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-left font-semibold mb-2">
                        Phosphorous
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            id="Phosphorous"
                            name="Phosphorous"
                            value={formData.Phosphorous}
                            onChange={handleChange}
                            placeholder="Enter phosphorus"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="w-full px-3 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
                            disabled={isLoading}
                            onClick={!isLoading ? handlePredictClick : null}
                        >
                            {isLoading ? "Predicting..." : "Predict Fertilizer"}
                        </button>
                    </div>
                </form>
                {showSpan && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">
                            {result && result.length ? (
                                <p>The Predicted Fertilizer is {result} </p>
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

export default Fertilizer;


