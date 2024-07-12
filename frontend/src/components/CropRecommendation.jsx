// import { useState } from "react";
// import bgHero from "../assets/bgHero.png";

// const CropRecommendation = () => {
//     const [isLoading, setIsloading] = useState(false);
//     const [formData, setFormData] = useState({
//         Nitrogen: '',
//         Phosphorus: '',
//         Potassium: '',
//         Temperature: '',
//         Humidity: '',
//         ph: '',
//         Rainfall: ''
//     });
//     const [result, setResult] = useState("");
//     const [showSpan, setShowSpan] = useState(false);

//     const handleChange = (event) => {
//         const value = event.target.value;
//         const name = event.target.name;
//         let inputData = { ...formData };
//         inputData[name] = value;
//         setFormData(inputData);
//     };

//     const handlePredictClick = (e) => {
//         e.preventDefault();
//         const url = "https://agro-ai-1.onrender.com/crop_predict";
//         setIsloading(true);
//         const jsonData = JSON.stringify(formData);
//         fetch(url, {
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//             method: "POST",
//             body: jsonData,
//         })
//             .then((response) => response.json())
//             .then((response) => {
//                 setResult(response.Prediction);
//                 setIsloading(false);
//                 setShowSpan(true);
//             });
//     };

//     return (
//         <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8 " style={{ backgroundImage: `url(${bgHero})` }}>
//             <h1 className="text-2xl text-center text-green-500 font-bold mb-4">Crop Recommendation</h1>
//             {/* <div className="mx-auto px-3 md:ml-10">
//                 <p> The Crop Recommendation System is revolutionizing how farmers choose crops. By taking into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall, this data-driven project is empowering farmers with precise recommendations</p>
//             </div> */}
//             <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
//                 <form method="post" acceptCharset="utf-8" name="Modelform" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                         <div className="flex justify-between items-center">
//                             <label className="font-semibold mr-2">Nitrogen</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="Nitrogen"
//                                 name="Nitrogen"
//                                 value={formData.Nitrogen}
//                                 onChange={handleChange}
//                                 placeholder="1 to 150"
//                             />
//                         </div>
//                         <div className="flex  justify-between items-center">
//                             <label className="font-semibold mr-2">Phosphorus</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="Phosphorus"
//                                 name="Phosphorus"
//                                 value={formData.Phosphorus}
//                                 onChange={handleChange}
//                                 placeholder="1 to 150"
//                             />
//                         </div>
//                         <div className="flex 
//                         justify-between items-center">
//                             <label className="font-semibold mr-2">Potassium</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="Potassium"
//                                 name="Potassium"
//                                 value={formData.Potassium}
//                                 onChange={handleChange}
//                                 placeholder="1 to 205"
//                             />
//                         </div>
//                         <div className="flex  justify-between items-center">
//                             <label className="font-semibold mr-2">Temperature</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="Temperature"
//                                 name="Temperature"
//                                 value={formData.Temperature}
//                                 onChange={handleChange}
//                                 placeholder="1 to 45&deg;C"
//                             />
//                         </div>
//                         <div className="flex 
//                         justify-between items-center">
//                             <label className="font-semibold mr-2">Humidity</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="Humidity"
//                                 name="Humidity"
//                                 value={formData.Humidity}
//                                 onChange={handleChange}
//                                 placeholder="1 to 100%"
//                             />
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <label className="font-semibold mr-2">PH-value</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-3 py-2 border border-green-500 rounded"
//                                 id="ph"
//                                 name="ph"
//                                 value={formData.ph}
//                                 onChange={handleChange}
//                                 placeholder="1 to 14"
//                             />
//                         </div>
//                         <div className="flex 
//                         justify-between items-center">
//                             <label className="font-semibold mr-2">Rainfall</label>
//                             <input
//                                 type="text"
//                                 className="w-1/2 px-2 py-2 border border-green-500 rounded"
//                                 id="Rainfall"
//                                 name="Rainfall"
//                                 value={formData.Rainfall}
//                                 onChange={handleChange}
//                                 placeholder="1 to 300 mm"
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-4 mt-5">
//                         <button
//                             className="w-full px-3 py-2 bg-rose-500 text-white rounded disabled:bg-blue-300"
//                             disabled={isLoading}
//                             onClick={!isLoading ? handlePredictClick : null}
//                         >
//                             {isLoading ? "Predicting..." : "Predict Crop that suitable"}
//                         </button>
//                     </div>
//                 </form>
//                 {showSpan && (
//                     <div className="mt-4">
//                         <h4 className="text-lg font-semibold">
//                             {result && Object.keys(result).length !== 0 ? (
//                                 <p>The Predicted crop is <span className="text-2xl">{result}</span></p>
//                             ) : (
//                                 <p>Please fill out each field in the form completely</p>
//                             )}
//                         </h4>
//                     </div>
//                 )}
//                 {showSpan && result && (
//                     <div className="mt-6">
//                         <h4 className="text-lg font-semibold">Next Steps:</h4>
//                         <ul className="list-disc list-inside">
//                             <li>
//                                 Learn more about <span className="font-bold">{result}</span> crop cultivation techniques <a href="https://example.com" className="text-blue-500">here</a>.
//                             </li>
//                             <li>
//                                 Find suitable fertilizers and soil treatments for <span className="font-bold">{result}</span>.
//                             </li>
//                             <li>
//                                 Explore market prices and demand for <span className="font-bold">{result}</span>.
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CropRecommendation;

import { useState } from "react";
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

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
        const url = "https://agro-ai-1.onrender.com/crop_predict";
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
        <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8 " style={{ backgroundImage: `url(${bgHero})` }}>
            <h1 className="text-2xl text-center text-green-500 font-bold mb-4">Crop Recommendation</h1>
            <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2 text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
                <form method="post" acceptCharset="utf-8" name="Modelform" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Nitrogen</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="Nitrogen"
                                name="Nitrogen"
                                value={formData.Nitrogen}
                                onChange={handleChange}
                                placeholder="1 to 150"
                            />
                        </div>
                        <div className="flex  justify-between items-center">
                            <label className="font-semibold mr-2">Phosphorus</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="Phosphorus"
                                name="Phosphorus"
                                value={formData.Phosphorus}
                                onChange={handleChange}
                                placeholder="1 to 150"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Potassium</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="Potassium"
                                name="Potassium"
                                value={formData.Potassium}
                                onChange={handleChange}
                                placeholder="1 to 205"
                            />
                        </div>
                        <div className="flex  justify-between items-center">
                            <label className="font-semibold mr-2">Temperature</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="Temperature"
                                name="Temperature"
                                value={formData.Temperature}
                                onChange={handleChange}
                                placeholder="1 to 45°C"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Humidity</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="Humidity"
                                name="Humidity"
                                value={formData.Humidity}
                                onChange={handleChange}
                                placeholder="1 to 100%"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">PH-value</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                id="ph"
                                name="ph"
                                value={formData.ph}
                                onChange={handleChange}
                                placeholder="1 to 14"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Rainfall</label>
                            <input
                                type="text"
                                className="w-1/2 px-2 py-2 border border-green-500 rounded"
                                id="Rainfall"
                                name="Rainfall"
                                value={formData.Rainfall}
                                onChange={handleChange}
                                placeholder="1 to 300 mm"
                            />
                        </div>
                    </div>
                    <div className="mb-4 mt-5">
                        <button
                            className="w-full px-3 py-2 bg-rose-500 text-white rounded disabled:bg-blue-300"
                            disabled={isLoading}
                            onClick={!isLoading ? handlePredictClick : null}
                        >
                            {isLoading ? "Predicting..." : "Predict Crop that is suitable"}
                        </button>
                    </div>
                </form>
                {showSpan && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">
                            {result && Object.keys(result).length !== 0 ? (
                                <p>The Predicted crop is <span className="text-2xl">{result}</span></p>
                            ) : (
                                <p>Please fill out each field in the form completely</p>
                            )}
                        </h4>
                    </div>
                )}
                {showSpan && result && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold">Next Steps:</h4>
                        <ul className="list-disc list-inside">
                            <li>
                                Learn more about <span className="font-bold">{result}</span> crop cultivation techniques <a href="https://example.com" className="text-blue-500">here</a>.
                            </li>
                            <li>
                                Find suitable fertilizers and soil treatments for <span className="font-bold">{result}</span>.
                            </li>
                            <li>
                                Explore market prices and demand for <span className="font-bold">{result}</span>.
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <div className="sm:w-1/2 p-4">
                        <h2 className="text-xl font-semibold text-green-600">About Crop Recommendation</h2>
                        <p className="mt-2 text-green-900">
                            The Crop Recommendation System is revolutionizing how farmers choose crops. By taking into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall, this data-driven project is empowering farmers with precise recommendations.
                        </p>
                    </div>
                    <div className="sm:w-1/2 flex flex-wrap justify-center">
                        <img src={img1} alt="Crop 1" className="w-1/3 p-2" />
                        <img src={img2} alt="Crop 2" className="w-1/3 p-2" />
                        <img src={img3} alt="Crop 3" className="w-1/3 p-2" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <div className="sm:w-1/2 flex flex-wrap justify-center order-2 sm:order-1">
                        <img src={img1} alt="Crop 1" className="w-1/3 p-2" />
                        <img src={img2} alt="Crop 2" className="w-1/3 p-2" />
                        <img src={img3} alt="Crop 3" className="w-1/3 p-2" />
                    </div>
                    <div className="sm:w-1/2 p-4 order-1 sm:order-2">
                        <h2 className="text-xl font-semibold text-green-600">Why Crop Recommendation Matters</h2>
                        <p className="mt-2 text-green-900">
                            Effective crop recommendation helps in optimizing the use of resources, increasing yield, and ensuring sustainable farming practices. It assists farmers in making informed decisions based on scientific data, leading to better crop management and increased profitability.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <div className="sm:w-1/2 p-4">
                        <h2 className="text-xl font-semibold text-green-600">How It Works</h2>
                        <p className="mt-2 text-green-900">
                            The system analyzes soil and environmental parameters provided by the farmer. Using advanced machine learning algorithms, it predicts the most suitable crops for the given conditions. This ensures that the recommendations are tailored to the specific needs of each farm.
                        </p>
                    </div>
                    <div className="sm:w-1/2 flex flex-wrap justify-center">
                        <img src={img1} alt="Crop 1" className="w-1/3 p-2" />
                        <img src={img2} alt="Crop 2" className="w-1/3 p-2" />
                        <img src={img3} alt="Crop 3" className="w-1/3 p-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropRecommendation;

