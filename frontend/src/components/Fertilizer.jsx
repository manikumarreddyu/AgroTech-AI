import { useState } from "react";
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/106.jpg";
import img2 from "../assets/101.jpg";
import img3 from "../assets/117.jpeg";
import img4 from "../assets/115.jpg";
import img5 from "../assets/113.png";

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
        const url = "https://agro-ai-1.onrender.com/fertilizer_predict";
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
        <div className="max-w-full mx-auto pb-10 pt-5 px-4 sm:px-6 lg:px-8 mt-16  " style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">Fertilizer Prediction</h1>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8  ">
                <div className="sm:w-2/3 p-4  items-center">
                    <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
                        About Crop Recommendation
                    </p>
                    <h1 className="md:text-3xl sm:text-2xl font-bold py-4 text-green-700">
                        Empowering Farmers with AI-Driven Crop Insights
                    </h1>
                    <p className="text-lg text-[#000435]  text-justify">
                        🌱 The Crop Recommendation System revolutionizes how farmers choose crops. It takes into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall
                    </p>
                    <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] '>
                        🤔 How it Works!
                    </p>
                    <p className="text-lg text-[#000435] ">
                        <span> ☑ Analyze soil and environmental parameters.</span><br />
                        <span> ☑ Get precise crop recommendations based on data.</span><br />
                        <span> ☑ Make informed decisions on crop management.</span><br />
                    </p>
                </div>
                <div className="sm:w-1/3 flex flex-wrap items-center md:pl-10 ">
                    <div className="grid grid-flow-col alignitems-center  grid-cols-2 grid-rows-2 gap-3">
                        <div className="  "><img src={img1} alt="Crop 1" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>
                        <div className="   text-center"><img src={img3} alt="Crop 1" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>

                        <div className="   row-span-2 "><img src={img2} style={{ borderRadius: '100%' }} alt="Crop 1" className=" w-40 h-40 p-2 rounded-lg border border-green-500 mb-4 my-20" /></div>

                    </div>
                </div>
            </div>
            <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <form method="post" acceptCharset="utf-8" name="Modelform" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                        <label className="font-semibold mr-2">Temperature</label>
                        <input
                            type="text"
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Temparature"
                            name="Temparature"
                            value={formData.Temparature}
                            onChange={handleChange}
                            placeholder="1 to 50°C"
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
                        <label className="font-semibold mr-2">Moisture</label>
                        <input
                            type="text"
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Moisture"
                            name="Moisture"
                            value={formData.Moisture}
                            onChange={handleChange}
                            placeholder="1 to 100%"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="font-semibold mr-2">Soil Type</label>
                        <select
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Soil_Type"
                            name="Soil_Type"
                            value={formData.Soil_Type}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select</option>
                            <option value="0">Black</option>
                            <option value="1">Clayey</option>
                            <option value="2">Loamy</option>
                            <option value="3">Red</option>
                            <option value="4">Sandy</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="font-semibold mr-2">Crop Type</label>
                        <select
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Crop_Type"
                            name="Crop_Type"
                            value={formData.Crop_Type}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select</option>
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
                    <div className="flex justify-between items-center">
                        <label className="font-semibold mr-2">Nitrogen</label>
                        <input
                            type="text"
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Nitrogen"
                            name="Nitrogen"
                            value={formData.Nitrogen}
                            onChange={handleChange}
                            placeholder="1 to 50"
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
                            placeholder="1 to 50"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="font-semibold mr-2">Phosphorous</label>
                        <input
                            type="text"
                            className="w-1/2 px-3 py-2 border border-green-500 rounded"
                            id="Phosphorous"
                            name="Phosphorous"
                            value={formData.Phosphorous}
                            onChange={handleChange}
                            placeholder="1 to 50"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
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
            
            <div className="">
                <div className="flex flex-col sm:flex-row items-center mt-20 justify-between  ">
                    <div className="sm:w-1/2 flex flex-wrap px-10  rounded-md justify-center ">
                        <img src={img4} alt="Crop 1" style={{ borderRadius: '100%' }} className="w-2/3 h px-2 " />

                    </div>
                    <div className="sm:w-1/2 p-4  items-center  ">
                        <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
                            About Crop Recommendation
                        </p>
                        <h1 className="md:text-3xl sm:text-2xl font-bold py-4 text-green-700">
                            Empowering Farmers with AI-Driven Crop Insights
                        </h1>
                        <p className="text-lg text-[#000435]  text-justify">
                            🌱 The Crop Recommendation System revolutionizes how farmers choose crops. It takes into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall
                        </p>
                        <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] '>
                            🤔 How it Works!
                        </p>
                        <p className="text-lg text-[#000435] ">
                            <span> ☑ Analyze soil and environmental parameters.</span><br />
                            <span> ☑ Get precise crop recommendations based on data.</span><br />
                            <span> ☑ Make informed decisions on crop management.</span><br />
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between ">
                    <div className="sm:w-1/2 p-4  items-center ">
                        <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-4xl font-bold py-1">
                            About Crop Recommendation
                        </p>
                        <h1 className="md:text-3xl sm:text-2xl font-bold py-4 text-green-700">
                            Empowering Farmers with AI-Driven Crop Insights
                        </h1>
                        <p className="text-lg text-[#000435]  text-justify">
                            🌱 The Crop Recommendation System revolutionizes how farmers choose crops. It takes into account the mineral composition of the soil, including potassium, nitrogen, and phosphorous, as well as factors like humidity, temperature, and rainfall
                        </p>
                        <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] '>
                            🤔 How it Works!
                        </p>
                        <p className="text-lg text-[#000435] ">
                            <span> ☑ Analyze soil and environmental parameters.</span><br />
                            <span> ☑ Get precise crop recommendations based on data.</span><br />
                            <span> ☑ Make informed decisions on crop management.</span><br />
                        </p>
                    </div>
                    <div className="sm:w-1/2 flex flex-wrap px-10 my-10 rounded-md justify-center">
                        <img src={img5} alt="Crop 1" style={{ borderRadius: '1%' }} className="w-2/3 p-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fertilizer;
