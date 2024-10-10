import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/116.jpg";
import img4 from "../assets/112.jpg";
import img5 from "../assets/111.jpeg";
import img7 from "../assets/cropinspection.png";
import AdvantagesDisadvantages from './AdvantagesDisadvantages';

const items = [
    { type: 'advantage', text: 'Helps farmers make data-driven decisions.' },
    { type: 'disadvantage', text: 'Requires accurate and up-to-date data for best results.' },
    { type: 'advantage', text: 'Increases crop yield by selecting the most suitable crops.' },
    { type: 'disadvantage', text: 'May involve initial costs for data collection and analysis tools.' },
    { type: 'advantage', text: 'Reduces the risk of crop failure by considering environmental factors.' },
    { type: 'disadvantage', text: 'Dependent on technology, which can be a barrier for some farmers.' },
    { type: 'advantage', text: 'Optimizes resource use like water and fertilizers.' },
    { type: 'disadvantage', text: 'May need ongoing support and updates to stay effective.' },
  ];

const CropRecommendation = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

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
        const url = "https://agro-kdxo.onrender.com/crop_predict";
        // const url = "http://127.0.0.1:5000/crop_predict";
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

        <>
            {loading ? <Spinner /> :

                <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8 " style={{ backgroundImage: `url(${bgHero})` }}>
                    <h1 className="text-2xl text-center text-green-500 font-bold ">Crop Recommendation</h1>

                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8  ">
                        <div className="sm:w-2/3 p-4  items-center">
                            <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-2xl font-bold py-1">
                                About Crop Recommendation Model
                            </p>
                            <h1 className="md:text-xl sm:text-xl text-xl font-bold py-4 text-green-700">
                                Empowering Farmers with AI-Driven Crop Insights
                            </h1>
                            <p className="text-lg text-[#000435]  text-justify">
                                🌱 The Crop Recommendation System revolutionizes how farmers choose crops.It takes into account the mineral composition of the soil,including potassium , nitrogen and phosphorous,as well as factors like humidity,temperature and rainfall.By analyzing these factors,farmers can ensure optimal crop selection,leading to higher yields and sustainable farming practices.
                            </p>
                            <p className='md:text-3xl sm:text-3xl text-2xl font-bold py-4 text-[#000435] '>
                                🤔 How it Works!
                            </p>
                            <p className="text-lg text-[#000435]">
                                <span>🌍 Analyze soil and environmental parameters.</span><br />
                                <span>📊 Get precise crop recommendations based on data.</span><br />
                                <span>🌾 Make informed decisions on crop management.</span><br />
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


                    <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2 text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
                        <h1 className="text-2xl text-center text-green-500 font-bold mb-4">Crop Recommendation</h1>
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
                                <button className="w-full px-3 py-2 relative rounded group overflow-hidden font-medium bg-rose-50 text-rose-500 border border-rose-500 inline-block"
                                    disabled={isLoading}
                                    onClick={!isLoading ? handlePredictClick : null}
                                >
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-rose-500 group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-white">{isLoading ? "Predicting..." : "Predict Crop that is suitable"}</span>
                                </button>
                            </div>
                        </form>
                        {showSpan && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold">
                                    {result && Object.keys(result).length !== 0 ? (
                                        <p>The Predicted crop is <br></br><span className="text-2xl text-red-600">{result}</span></p>
                                    ) : (
                                        <p>Please fill out each field in the form completely</p>
                                    )}
                                </h4>
                            </div>
                        )}
                        {showSpan && result && (
                            <div className="mt-2 text-left">
                                <h4 className="text-lg font-semibold text-green-500">Next Steps:</h4>
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
                    <div className="">
                        <div className="flex flex-col sm:flex-row items-center mt-20 justify-between  ">
                            <div className="sm:w-1/2 flex flex-wrap px-10  rounded-md justify-center ">
                                <img src={img5} alt="Crop 1" style={{ borderRadius: '10%' }} className="w-4/5 px-2 " />

                            </div>
                            <div className="sm:w-1/2 p-4 items-center">
                                <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-2xl font-bold py-1 text-justify">
                                    Need for Crop Recommendation
                                </p>
                                <p className="text-lg text-[#000435] text-justify">
                                    🌱 The Crop Recommendation System revolutionizes how farmers choose crops. It takes into account the mineral composition of the soil, including potassium , nitrogen , and phosphorous , as well as factors like humidity , temperature , and rainfall.
                                </p>
                                <p className='md:text-xl sm:text-xl text-xl font-bold py-2 text-[#000435]'>
                                    🤔 How it Works!
                                </p>
                                <p className="text-lg text-[#000435] text-justify">
                                    <span>🌍 Analyze soil and environmental parameters.</span><br />
                                    <span>📊 Get precise crop recommendations based on data.</span><br />
                                    <span>🌾 Make informed decisions on crop management.</span><br />
                                </p>
                            </div>


                        </div>
                        <div className="flex flex-row sm:flex-row items-center justify-between rounded-3xl">
                            <div className="w-full p-4 items-center rounded-3xl">
                                <p className="text-lg text-[#000435] justify-center">
                                    <AdvantagesDisadvantages items={items} />
                                </p>
                            </div>

                            {/* <div className='mx-auto my-auto'>
                                <img src={img7} alt="" className=' rounded-2xl hidden md:inline' />
                            </div> */}
                        </div>

                    </div>
                </div>

            }
        </>


    );
};

export default CropRecommendation;

