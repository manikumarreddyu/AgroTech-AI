import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/img10.jpg";
import img2 from "../assets/img11.jpg";
import img3 from "../assets/img12.jpg";
import img4 from "../assets/img13.jpg";
import img5 from "../assets/img14.png";
import AdvantagesDisadvantages from "../components/AdvantagesDisadvantages"

const items = [
    { type: 'advantage', text: 'Increases crop yield and quality.' },
    { type: 'disadvantage', text: 'Can be costly for small-scale farmers.' },
    { type: 'advantage', text: 'Optimizes water use and minimizes wastage.' },
    { type: 'disadvantage', text: 'Risk of over-irrigation leading to environmental issues.' },
    { type: 'advantage', text: 'Tailors Predictions to specific soil and crop needs.' },
    { type: 'disadvantage', text: 'Dependence on Predictions may reduce traditional knowledge.' },
    { type: 'advantage', text: 'Enhances farmer knowledge and decision-making.' },
    { type: 'disadvantage', text: 'Requires ongoing monitoring and adjustments to be effective.' },
];

const IrrigationSystem = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        Soil_Type: '',
        Crop_Type: '',
        Avg_Temperature: '',
        Geographical_Location: '',
        Moisture_Level: ''
    });
    const [result, setResult] = useState("");
    const [showSpan, setShowSpan] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
  }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePredictClick = async (e) => {
      e.preventDefault();
      const url = `http://127.0.0.1:5000/irrigation`;
      setIsLoading(true); // Set loading state to true
      const jsonData = JSON.stringify(formData);
      console.log("Sending data:", jsonData); 

      try {
          const response = await fetch(url, {
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              method: "POST",
              body: jsonData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Received response:", responseData);
        setResult(responseData.Prediction);
        setShowSpan(true);
    } catch (error) {
        console.error("Error:", error);
        setResult("Error: Unable to predict irrigation");
        setShowSpan(true);
    } finally {
        setIsLoading(false); // Set loading state to false in all cases
    }
};

    return (
        <>
            {loading ? <Spinner /> : <div className="max-w-full mx-auto pb-10 pt-5 px-4 sm:px-6 lg:px-8 mt-16  " style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <h1 className="text-2xl font-bold text-green-500  text-center">Irrigation System</h1>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8  ">
                    <div className="sm:w-2/3 p-4 items-center">
                        <p className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 inline-block text-transparent bg-clip-text text-2xl font-bold py-1">
                            About Irrigation System
                        </p>
                        <h1 className="md:text-xl sm:text-xl text-xl font-bold py-4 text-green-700">
                            Optimizing Crop Water Intake with AI-Driven Insights
                        </h1>
                        <p className="text-lg text-[#000435] text-justify">
                            🌱 The Irrigation System transforms how farmers manage water application. It considers essential parameters like soil type, weather data, geographical location, and moisture levels. By analyzing these factors, farmers can ensure optimal water usage, leading to higher yields and sustainable farming practices.
                        </p>
                        <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                            🤔 How it Works!
                        </p>
                        <p className="text-lg text-[#000435] text-left">
                            <span>🌍Analyze soil and environmental parameters for water needs.</span><br />
                            <span>📊Get precise irrigation Predictions based on data.</span><br />
                            <span>🌾Make informed decisions on water management.</span><br />
                        </p>
                    </div>

                    <div className="sm:w-1/3 flex flex-wrap items-center md:pl-10 ">
                        <div className="grid grid-flow-col alignitems-center  grid-cols-2 grid-rows-2 gap-3">
                            <div className="  "><img src={img1} alt="Crop 1" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>
                            <div className="   text -center"><img src={img3} alt="Crop 1" style={{ borderRadius: '50%' }} className="float-right w-40 h-40 p-2 rounded-lg border border-green-500 mb-4" /></div>

                            <div className="   row-span-2 "><img src={img2} style={{ borderRadius: '100%' }} alt="Crop 1" className=" w-40 h-40 p-2 rounded-lg border border-green-500 mb-4 my-20" /></div>

                        </div>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto mt-10 text-center p-5 border-2  text-green-900 border-green-500 shadow-2xl shadow-green-200 rounded-md" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">Irrigation System</h1>

                    <form method="post" acceptCharset="utf-8" name="Modelform" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Soil Type</label>
                            <select
                                className="w-2/3 px-3 py-2 border border-green-500 rounded"
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
                                className="w-2/3 px-3 py-2 border border-green-500 rounded"
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
                            <label className="font-semibold mr-2">Average Temperature</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-green-500 rounded text-sm"
                                id="Avg_Temperature"
                                name="Avg_Temperature"
                                value={formData.Average_Temperature}
                                onChange={handleChange}
                                placeholder="Enter Average Temperature"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Geographical Location</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-green-500 rounded text-sm"
                                id="Geographical_Location"
                                name="Geographical_Location"
                                value={formData.Geographical_Location}
                                onChange={handleChange}
                                placeholder="Enter geographical location"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="font-semibold mr-2">Moisture Level</label>
                            <input
                                type="text"
                                className="w-2/3 px-3 py-2 border border-green-500 rounded text-sm
                                "
                                id="Moisture_Level"
                                name="Moisture_Level"
                                value={formData.Moisture_Level}
                                onChange={handleChange}
                                placeholder="Enter moisture level"
                            />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <button
                                className="w-full px-3 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
                                disabled={isLoading}data
                                onClick={!isLoading ? handlePredictClick : null}
                            >
                                {isLoading ? "Predicting..." : "Predict Irrigation"}
                            </ button>
                        </div>
                    </form>
                    {showSpan && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold">
                                {result && result.length ? (
                                    <p>The Predicted Irrigation is <br></br><span className="text-xl text-sky-600">{result}</span> </p>
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
                            <img src={img4} alt="Crop 1" style={{ borderRadius: '100%' }} className="w-4/5 h px-2 " />

                        </div>
                        <div className="sm:w-2/3 p-4 items-center">
                            <h1 className="md:text-xl sm:text-xl text-xl font-bold py-2 text-green-700">
                                🌱 Need for Irrigation System
                            </h1>
                            <p className="text-lg text-[#000435] text-justify">
                                🌾 The Irrigation System helps farmers optimize crop water intake by providing tailored irrigation suggestions based on soil quality. By analyzing essential parameters such as weather data, geographical location, and moisture levels, farmers can ensure their crops receive the right amount of water for healthy growth.
                            </p>
                            <p className='md:text-xl sm:text-xl text-xl font-bold py-2 text-[#000435]'>
                                🤔 How it Works!
                            </p>
                            <p className="text-lg text-[#000435]">
                                <span>📊 Assess soil water requirements based on crop type and growth stage.</span><br />
                                <span>🌍 Analyze environmental factors like weather data and geographical location.</span><br />
                                <span>🧠 Provide precise irrigation Predictions for optimal growth.</span><br />
                                <span>🌟 Enhance crop yield and sustainability through informed decision-making.</span><br />
                                <span>🔄 Continuously update Predictions based on real-time data.</span><br />
                            </p>
                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between ">
                        <div className="sm:w-2/3 p-4 items-center">
                            <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-2 text-green-700 text-center">
                                ⚖️ Advantages and Disadvantages of Irrigation System
                            </h1>
                            <p className="text-lg text-[#000435] text-justify">
                                🌿 Irrigation Systems play a crucial role in enhancing agricultural productivity. However, they come with both benefits and drawbacks that farmers must consider for effective crop management.
                            </p>
                            <p className="text-lg text-[#000435] justify-center">
                                    <AdvantagesDisadvantages items={items} />
                            </p>
                        </div>

                    </div>
                </div>
                </div>}
        </>
    );
};

export default IrrigationSystem;
