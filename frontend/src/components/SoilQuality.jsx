import { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/103.jpg";
import img2 from "../assets/104.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/109.jpg";
import img5 from "../assets/105.jpg";

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
        const url = "https://agro-ai-1.onrender.com/soil_quality_predict";
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
        <div className="max-w-full mx-auto  mt-16  pb-10 pt-5 px-4 sm:px-6 lg:px-8 " style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-2xl text-center font-bold mb-4 text-green-500  text-center">Soil Quality Prediction</h1>
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
            <div className="max-w-lg mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md">
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
            <div className="">
                <div className="flex flex-col sm:flex-row items-center mt-20 justify-between  ">
                    <div className="sm:w-1/2 flex flex-wrap px-10  rounded-md justify-center ">
                        <img src={img4} alt="Crop 1" style={{ borderRadius: '100%' }} className="w-2/3 px-2 " />

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
                        <img src={img5} alt="Crop 1" style={{ borderRadius: '100%' }} className="w-2/3 p-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoilQuality;

