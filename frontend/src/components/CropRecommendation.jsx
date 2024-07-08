// import  { useState } from "react";
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
//         <div className="max-w-full  mt-16 mx-auto px-4 sm:px-6 lg:px-8 bg-green-300 "style={{ backgroundImage: `url(${bgHero})` }}>
//             <h1 className="text-2xl  text-center text-green-700 font-bold mb-4 ">Crop Recommendation</h1>
//             <div className="mx-auto px-3 md:ml-10 ">
//             <p> In the realm of agriculture, where traditional knowledge meets cutting-edge technology, the Crop Recommendation System is revolutionizing how farmers choose crops. By taking into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall, this data-driven project is empowering farmers with precise recommendations. In this blog, we will delve deeper into how these critical factors play a pivotal role in the decision-making process.</p>
//             </div>
//             <div className="max-w-lg mx-auto mt-10  text-center p-5 border-2 bg-green-300 text-green-900 border-green-500 shadow-md rounded-md">

//                 <form method="post" acceptCharset="utf-8" name="Modelform"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                     <div className="mb-4">
//                         <label className="block text-left font-semibold mb-2">
//                             Nitrogen
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Nitrogen"
//                             name="Nitrogen"
//                             value={formData.Nitrogen}
//                             onChange={handleChange}
//                             placeholder="Enter Nitrogen "
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                             Phosphorus
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Phosphorus"
//                             name="Phosphorus"
//                             value={formData.Phosphorus}
//                             onChange={handleChange}
//                             placeholder="Enter Phosphorus "
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                             Potassium
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Potassium"
//                             name="Potassium"
//                             value={formData.Potassium}
//                             onChange={handleChange}
//                             placeholder="Enter Potassium "
//                         />
//                     </div>




//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                             Temperature
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Temperature"
//                             name="Temperature"
//                             value={formData.Temperature}
//                             onChange={handleChange}
//                             placeholder="Enter Temperature "
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                         Humidity
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Humidity"
//                             name="Humidity"
//                             value={formData.Humidity}
//                             onChange={handleChange}
//                             placeholder="Enter Humidity "
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                         PH-value
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="ph"
//                             name="ph"
//                             value={formData.ph}
//                             onChange={handleChange}
//                             placeholder="Enter ph "
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-left font-semibold mb-2">
//                         Rainfall
//                         </label>
//                         <input
//                             type="text"
//                             className="w-full px-3 py-2 border border-gray-300 rounded"
//                             id="Rainfall"
//                             name="Rainfall"
//                             value={formData.Rainfall}
//                             onChange={handleChange}
//                             placeholder="Enter Rainfall "
//                         />
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
//                         <h4 className="text-lg font-semibold text-white">
//                             {result && Object.keys(result).length !== 0 ? (
//                                 <p>The Predicted crop  is <span className="  text-2xl ">{result} </span> </p>
//                             ) : (
//                                 <p>Please fill out each field in the form completely</p>
//                             )}
//                         </h4>
//                     </div>
//                 )}
//             </div>
//             <div className="mx-auto px-3 mt-5 ">
//                 <h1 className="text-3xl md:ml-10    font-bold mb-4">The Role of Soil Minerals:</h1>
//                 <dl className=" ml-0 md:ml-10">
//                     <dt className="font-bold text-xl">Potassium:</dt>
//                         <dd>Potassium is a vital nutrient for plant growth, contributing to root development, disease resistance, and overall plant health. Soil tests reveal potassium levels, helping the system suggest crops that thrive in either high or low potassium conditions.</dd>
//                     <dt className="font-bold text-xl">Nitrogen:</dt>
//                         <dd>Nitrogen is essential for chlorophyll production and overall plant growth. Soil nitrogen content influences crop recommendations, as different crops have varying nitrogen requirements.</dd>
//                     <dt className="font-bold text-xl">Phosphorous:</dt>
//                         <dd>Phosphorous is crucial for root development and flowering. Soil phosphorous levels guide the system in suggesting crops that can optimize the available phosphorous.</dd>
//                 </dl>
//             </div>
//             <div className="mx-auto px-3 mt-5 ">
//                 <h1 className="text-3xl md:ml-10    font-bold mb-4">Environmental Variables:</h1>
//                 <dl className=" ml-0 md:ml-10">
//                     <dt className="font-bold text-xl">Humidity:</dt>
//                         <dd>Crop success is closely tied to humidity levels. High humidity can lead to moisture-related diseases, while low humidity can result in stress for certain crops. The Crop Recommendation System factors in local humidity conditions to make precise recommendations.</dd>
//                     <dt className="font-bold text-xl">Temperature:</dt>
//                         <dd>Temperature affects the rate of plant growth and flowering. Some crops thrive in cooler conditions, while others prefer warmer climates. The system considers local temperature data for tailored suggestions</dd>
//                     <dt className="font-bold text-xl">Rainfall:</dt>
//                         <dd> Rainfall during the growing season is essential for crop success. The Crop Recommendation System accounts for historical rainfall patterns and monsoon data to provide recommendations that align with local water availability.</dd>
//                 </dl>
//             </div>
//             <div className="mx-auto px-3 mt-5 md:ml-10 ">
//             <h3 className="text-3xl      font-bold "> Conclusion:</h3>
//             <p> The Crop Recommendation System represents the pinnacle of data-driven agriculture. By accounting for soil minerals, humidity, temperature, and rainfall, it empowers farmers to make informed decisions about crop selection. This approach not only boosts productivity but also contributes to more sustainable and resilient farming practices, which are essential for the future of agriculture in an ever-changing world. As technology continues to advance, projects like these demonstrate the transformative power of data in agriculture.</p> 
//             </div>
//         </div>
//     );
// };

// export default CropRecommendation;


import { useState } from "react";
import bgHero from "../assets/bgHero.png";

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
        <div className="max-w-full mt-16 mx-auto px-4 sm:px-6 lg:px-8 bg-green-300" style={{ backgroundImage: `url(${bgHero})` }}>
            <h1 className="text-2xl text-center text-green-700 font-bold mb-4">Crop Recommendation</h1>
            <div className="mx-auto px-3 md:ml-10">
                <p> In the realm of agriculture, where traditional knowledge meets cutting-edge technology, the Crop Recommendation System is revolutionizing how farmers choose crops. By taking into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall, this data-driven project is empowering farmers with precise recommendations. In this blog, we will delve deeper into how these critical factors play a pivotal role in the decision-making process.</p>
            </div>
            <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2 bg-green-300 text-green-900 border-green-500 shadow-md rounded-md">
                <form method="post" acceptCharset="utf-8" name="Modelform" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Nitrogen</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
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
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                                id="Phosphorus"
                                name="Phosphorus"
                                value={formData.Phosphorus}
                                onChange={handleChange}
                                placeholder="1 to 150"
                            />
                        </div>
                        <div className="flex 
                        justify-between items-center">
                            <label className="font-semibold mr-2">Potassium</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
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
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                                id="Temperature"
                                name="Temperature"
                                value={formData.Temperature}
                                onChange={handleChange}
                                placeholder="1 to 45&deg;C"
                            />
                        </div>
                        <div className="flex 
                        justify-between items-center">
                            <label className="font-semibold mr-2">Humidity</label>
                            <input
                                type="text"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
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
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                                id="ph"
                                name="ph"
                                value={formData.ph}
                                onChange={handleChange}
                                placeholder="1 to 14"
                            />
                        </div>
                        <div className="flex 
                        justify-between items-center">
                            <label className="font-semibold mr-2">Rainfall</label>
                            <input
                                type="text"
                                className="w-1/2 px-2 py-2 border border-gray-300 rounded"
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
                            {isLoading ? "Predicting..." : "Predict Crop that suitable"}
                        </button>
                    </div>
                </form>
                {showSpan && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-white">
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
            <div className="mx-auto px-3 mt-5">
                <h1 className="text-3xl md:ml-10 font-bold mb-4">The Role of Soil Minerals:</h1>
                <dl className="ml-0 md:ml-10">
                    <dt className="font-bold text-xl">Potassium:</dt>
                    <dd>Potassium is a vital nutrient for plant growth, contributing to root development, disease resistance, and overall plant health. Soil tests reveal potassium levels, helping the system suggest crops that thrive in either high or low potassium conditions.</dd>
                    <dt className="font-bold text-xl">Nitrogen:</dt>
                    <dd>Nitrogen is essential for chlorophyll production and overall plant growth. Soil nitrogen content influences crop recommendations, as different crops have varying nitrogen requirements.</dd>
                    <dt className="font-bold text-xl">Phosphorous:</dt>
                    <dd>Phosphorous is crucial for root development and flowering. Soil phosphorous levels guide the system in suggesting crops that can optimize the available phosphorous.</dd>
                </dl>
            </div>
            <div className="mx-auto px-3 mt-5">
                <h1 className="text-3xl md:ml-10 font-bold mb-4">Environmental Variables:</h1>
                <dl className="ml-0 md:ml-10">
                    <dt className="font-bold text-xl">Humidity:</dt>
                    <dd>Crop success is closely tied to humidity levels. High humidity can lead to moisture-related diseases, while low humidity can result in stress for certain crops. The Crop Recommendation System factors in local humidity conditions to make precise recommendations.</dd>
                    <dt className="font-bold text-xl">Temperature:</dt>
                    <dd>Temperature affects the rate of plant growth and flowering. Some crops thrive in cooler conditions, while others prefer warmer climates. The system considers local temperature data for tailored suggestions.</dd>
                    <dt className="font-bold text-xl">Rainfall:</dt>
                    <dd>Rainfall during the growing season is essential for crop success. The Crop Recommendation System accounts for historical rainfall patterns and monsoon data to provide recommendations that align with local water availability.</dd>
                </dl>
            </div>
            <div className="mx-auto px-3 mt-5 md:ml-10">
                <h3 className="text-3xl font-bold">Conclusion:</h3>
                <p>The Crop Recommendation System represents the pinnacle of data-driven agriculture. By accounting for soil minerals, humidity, temperature, and rainfall, it empowers farmers to make informed decisions about crop selection. This approach not only boosts productivity but also contributes to more sustainable and resilient farming practices, which are essential for the future of agriculture in an ever-changing world. As technology continues to advance, projects like these demonstrate the transformative power of data in agriculture.</p>
            </div>
        </div>
    );
};

export default CropRecommendation;
