import  { useState } from 'react';

const SoilQuality = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        N: '',
        P: '',
        K: '',
        pH: '',
        EC: '',
        OC: '',
        S: '',
        Zn: '',
        Fe: '',
        Cu: '',
        Mn: '',
        B: ''
    });
    const [result, setResult] = useState("");
    const [showSpan, setShowSpan] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePredictClick = (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/soil_quality_predict";
        setIsLoading(true);

        // Convert form data values to floats
        const numericData = {
            N: parseFloat(formData.N),
            P: parseFloat(formData.P),
            K: parseFloat(formData.K),
            pH: parseFloat(formData.pH),
            EC: parseFloat(formData.EC),
            OC: parseFloat(formData.OC),
            S: parseFloat(formData.S),
            Zn: parseFloat(formData.Zn),
            Fe: parseFloat(formData.Fe),
            Cu: parseFloat(formData.Cu),
            Mn: parseFloat(formData.Mn),
            B: parseFloat(formData.B),
        };

        const jsonData = JSON.stringify(numericData);
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
                setResult(response.prediction);
                setIsLoading(false);
                setShowSpan(true);
            })
            .catch((error) => {
                console.error("There was an error making the prediction request!", error);
                setIsLoading(false);
            });
    };

    return (
        <div className="container mx-auto mt-4 fs-10 text-xl">
            <h1 className="text-3xl text-center font-bold mb-4">Soil Quality Prediction</h1>
            <div className="max-w-lg mx-auto mt-10 bg-blue-600 text-center p-5">
                <form method="post" acceptCharset="utf-8" name="Modelform">
                    {Object.keys(formData).map((key, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-left font-semibold mb-2">
                                {key}
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                id={key}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                placeholder={`Enter ${key}`}
                            />
                        </div>
                    ))}
                    <div className="mb-4 mt-5">
                        <button
                            className="w-full px-3 py-2 bg-rose-500 text-white rounded disabled:bg-blue-300"
                            disabled={isLoading}
                            onClick={!isLoading ? handlePredictClick : null}
                        >
                            {isLoading ? "Predicting..." : "Predict Soil Quality"}
                        </button>
                    </div>
                </form>
                {showSpan && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-white">
                            {result ? (
                                <p>The predicted output is <span className="text-2xl">{result}</span></p>
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

export default SoilQuality;
