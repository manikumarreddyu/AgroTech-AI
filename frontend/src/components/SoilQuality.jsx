import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/103.jpg";
import img2 from "../assets/104.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/109.jpg";
import img5 from "../assets/105.jpg";

const SoilQuality = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
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
        const url = "https://agro-kdxo.onrender.com/soil_quality_predict";
        // const url = "http://127.0.0.1:5000/soil_quality_predict";
        setIsLoading(true);

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
        <>
            {loading ? <Spinner /> :

                <div className="max-w-full mx-auto  mt-16  pb-10 pt-5 px-4 sm:px-6 lg:px-8 " style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h1 className="text-2xl  font-bold  text-green-500  text-center">Soil Quality Prediction</h1>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8  ">
                        <div className="sm:w-2/3 p-4 items-center">
                            <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-4 text-green-700">
                                🌱About Soil Quality Prediction Model
                            </h1>
                            <p className="text-lg text-[#000435] text-justify">
                                🌍The Soil Quality Prediction Model leverages Machine Learning to provide accurate insights into soil health.By analyzing various parameters such as nutrient levels,pH balance,and moisture content,the model helps farmers make informed decisions.
                            </p>
                            <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                🤔 How it Works!
                            </p>
                            <p className="text-lg text-[#000435]">
                                <span>🔍Analyze key soil parameters like nitrogen,phosphorous,and potassium.</span><br />
                                <span>📈Assess pH level, electrical conductivity, and organic carbon.</span><br />
                                <span>💧Evaluate additional nutrients such as sulphur, zinc, and iron.</span><br />
                                <span>✅ Check for copper, manganese, and boron.</span><br />
                                <span>✅Provide actionable insights for soil management and crop planning.</span><br />
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
                    <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
                        <h1 className="text-2xl  font-bold mb-4 text-green-500  text-center">Soil Quality Prediction</h1>

                        <form method="post" acceptCharset="utf-8" name="Modelform" className="grid grid-cols-2 gap-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Nitrogen</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="N"
                                    name="N"
                                    value={formData.N}
                                    onChange={handleChange}
                                    placeholder="0 to 400"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Phosphorus</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="P"
                                    name="P"
                                    value={formData.P}
                                    onChange={handleChange}
                                    placeholder="0 to 150"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Potassium</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="K"
                                    name="K"
                                    value={formData.K}
                                    onChange={handleChange}
                                    placeholder="0 to 900"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">pH Level</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="pH"
                                    name="pH"
                                    value={formData.pH}
                                    onChange={handleChange}
                                    placeholder="1 to 14"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Electrical Conductivity</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="EC"
                                    name="EC"
                                    value={formData.EC}
                                    onChange={handleChange}
                                    placeholder="0 to 1"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Organic Carbon</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="OC"
                                    name="OC"
                                    value={formData.OC}
                                    onChange={handleChange}
                                    placeholder="0 to 2"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Sulphur</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="S"
                                    name="S"
                                    value={formData.S}
                                    onChange={handleChange}
                                    placeholder="0 to 30"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Zinc</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="Zn"
                                    name="Zn"
                                    value={formData.Zn}
                                    onChange={handleChange}
                                    placeholder="0 to 1"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Iron</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="Fe"
                                    name="Fe"
                                    value={formData.Fe}
                                    onChange={handleChange}
                                    placeholder="0 to 50"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Copper</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="Cu"
                                    name="Cu"
                                    value={formData.Cu}
                                    onChange={handleChange}
                                    placeholder="0 to 3"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Manganese</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="Mn"
                                    name="Mn"
                                    value={formData.Mn}
                                    onChange={handleChange}
                                    placeholder="0 to 30"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="block text-left ml-2 text-black font-semibold w-1/3">Boron</label>
                                <input
                                    type="text"
                                    className="w-1/2 px-3 py-2 border border-green-500 rounded"
                                    id="B"
                                    name="B"
                                    value={formData.B}
                                    onChange={handleChange}
                                    placeholder="0 to 3"
                                />
                            </div>
                            <div className="col-span-2 mt-5">
                                <button className="w-full px-3 py-2 relative rounded group overflow-hidden font-medium bg-rose-50 text-rose-500 border border-rose-500 inline-block"
                                        disabled={isLoading}
                                        onClick={!isLoading ? handlePredictClick : null}
                                > 
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-500 ease-out transform translate-y-0 bg-rose-500 group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-white">{isLoading ? "Predicting..." : "Predict Soil Quality"}</span>
                               </button>
                            </div>
                        </form>
                        {showSpan && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold ">
                                    {result ? (
                                        <p>The predicted output is <br></br><span className="text-2xl text-red-600">{result}</span></p>
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
                                <img src={img4} alt="Crop 1" style={{ borderRadius: '100%' }} className="w-4/5 px-2 " />

                            </div>
                            <div className="sm:w-2/3 p-4 items-center">
                                <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-4 text-green-700">
                                    🌱 Need for Soil Quality Prediction
                                </h1>
                                <p className="text-lg text-[#000435] text-justify">
                                    🌍Soil quality prediction is essential for sustainable agriculture.It enables farmers to understand soil health and make informed decisions about crop selection.By predicting soil quality,farmers can optimize their practices,improve yields,and ensure the long-term fertility of their land.
                                </p>
                                <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                    🤔 Why It Matters!
                                </p>
                                <p className="text-lg text-[#000435]">
                                    <span>✅ Enhances crop productivity through informed soil management.</span><br />
                                    <span>✅ Helps in efficient resource allocation and planning.</span><br />
                                    <span>✅ Promotes sustainable farming practices and environmental health.</span><br />
                                    <span>🔍 Enables early detection of nutrient deficiencies and soil issues.</span><br />
                                    <span>💧 Supports better water management and conservation efforts.</span><br />
                                </p>
                            </div>

                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between ">
                            <div className="sm:w-2/3 p-4 items-center">
                                <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-4 text-green-700">
                                    🌱 Advantages and Disadvantages of Soil Quality Prediction
                                </h1>

                                <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                    ✅ Advantages
                                </p>
                                <p className="text-lg text-[#000435]">
                                    <span>🌾 Enhances crop productivity by informing soil management decisions.</span><br />
                                    <span>📊 Facilitates efficient resource allocation and planning.</span><br />
                                    <span>🌍 Promotes sustainable practices and environmental health.</span><br />
                                    <span>🔍 Enables early detection of nutrient deficiencies and soil issues.</span><br />
                                    <span>💧 Supports better water management and conservation efforts .</span><br />
                                </p>

                                <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                    ❌ Disadvantages
                                </p>
                                <p className="text-lg text-[#000435]">
                                    <span>⚙️ Requires access to technology and data for accurate predictions .</span><br />
                                    <span>💰 Initial costs for implementing soil testing and modeling can be high.</span><br />
                                    <span>🔄Predictions may vary based on environmental changes and model accuracy.</span><br />
                                    <span>🧪 Complexity of soil science may lead to misinterpretations of data.</span><br />
                                </p>
                            </div>

                            <div className="sm:w-1/2 flex flex-wrap px-10 my-10 rounded-md justify-center">
                                <img src={img5} alt="Crop 1" style={{ borderRadius: '10%' }} className="w-full p-2" />
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>


    );
};

export default SoilQuality;

