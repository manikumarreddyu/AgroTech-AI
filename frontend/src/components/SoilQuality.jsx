import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bgHero from "../assets/bgHero.png";
import img1 from "../assets/103.jpg";
import img2 from "../assets/104.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/109.jpg";
import img5 from "../assets/105.jpg";
import AdvantagesDisadvantages from "../components/AdvantagesDisadvantages";

const items = [
    { type: 'advantage', text: 'Enhances crop productivity by informing soil management decisions.' },
    { type: 'disadvantage', text: 'Requires access to technology and data for accurate predictions.' },
    { type: 'advantage', text: 'Facilitates efficient resource allocation and planning.' },
    { type: 'disadvantage', text: 'Initial costs for implementing soil testing and modeling can be high.' },
    { type: 'advantage', text: 'Enables early detection of nutrient deficiencies and soil issues.' },
    { type: 'disadvantage', text: 'Predictions may vary based on environmental changes and model accuracy.' },
    { type: 'advantage', text: 'Supports better water management and conservation efforts.' },
    { type: 'disadvantage', text: 'Complexity of soil science may lead to misinterpretations of data.' },
];

const SoilQuality = () => {
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loading) {
            // Set your Mapbox access token here
            mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRoYSIsImEiOiJjbTIwN29haWEwYzVrMmpzZ25yeTF4MmN4In0.3fHnwKMxxXNy9pM-Vcn9gw'; // Replace with your Mapbox Access Token

            const map = new mapboxgl.Map({
                container: 'map', // Container ID
                style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
                center: [78.9629, 20.5937], // Starting position [lng, lat] centered on India
                zoom: 5 // Starting zoom level
            });

            const soilTestingCenters = [
                // Andhra Pradesh
                { name: "Visakhapatnam Soil Testing Laboratory", coordinates: [83.3182, 17.6868], contact: "0891-2700400", services: "Soil Testing, Nutrient Analysis" },
                { name: "Vijayawada Soil Testing Center", coordinates: [80.6456, 16.5062], contact: "0866-2573401", services: "Soil Testing, pH Testing" },
                { name: "Guntur Soil Testing Laboratory", coordinates: [80.4545, 16.3064], contact: "0863-2225555", services: "Soil Testing, Fertilizer Recommendation" },

                // Arunachal Pradesh
                { name: "Itanagar Soil Testing Laboratory", coordinates: [93.6162, 27.1027], contact: "0360-2212437", services: "Soil Testing, Nutrient Analysis" },

                // Assam
                { name: "Assam Agricultural University Soil Testing Lab", coordinates: [91.5868, 26.1445], contact: "0361-2360512", services: "Soil Testing, Fertilizer Recommendation" },

                // Bihar
                { name: "Bihar Soil Testing Laboratory", coordinates: [85.324, 25.5948], contact: "0612-2540994", services: "Soil Testing, Nutrient Analysis" },
                { name: "Bhagalpur Soil Testing Center", coordinates: [87.0054, 25.2500], contact: "0641-2403903", services: "Soil Testing, pH Testing" },

                // Chhattisgarh
                { name: "Raipur Soil Testing Laboratory", coordinates: [81.6337, 21.2514], contact: "0771-2239208", services: "Soil Testing, Fertilizer Recommendation" },

                // Goa
                { name: "Goa Soil Testing Laboratory", coordinates: [73.8143, 15.4909], contact: "0832-2422051", services: "Soil Testing, Nutrient Analysis" },

                // Gujarat
                { name: "Gujarat Agricultural University Soil Testing Laboratory", coordinates: [72.5714, 23.0225], contact: "079-26301347", services: "Soil Testing, Fertilizer Recommendation" },
                { name: "Surat Soil Testing Center", coordinates: [72.8311, 21.1702], contact: "0261-2412170", services: "Soil Testing, Micro Nutrient Analysis" },
                { name: "Rajkot Soil Testing Laboratory", coordinates: [70.7483, 22.3039], contact: "0281-2463073", services: "Soil Testing, pH Testing" },

                // Haryana
                { name: "Chandigarh Soil Testing Laboratory", coordinates: [76.8324, 30.7333], contact: "0172-2742002", services: "Soil Testing, Nutrient Analysis" },
                { name: "Hisar Soil Testing Center", coordinates: [75.5705, 29.1498], contact: "01662-263588", services: "Soil Testing, Fertilizer Recommendation" },

                // Jharkhand
                { name: "Ranchi Soil Testing Laboratory", coordinates: [85.3380, 23.3441], contact: "0651-2481582", services: "Soil Testing, Micro Nutrient Analysis" },

                // Karnataka
                { name: "Karnataka Soil Testing Laboratory", coordinates: [77.5946, 12.9716], contact: "080-23346053", services: "Soil Testing, Nutrient Analysis" },
                { name: "Mysore Soil Testing Laboratory", coordinates: [76.6383, 12.2958], contact: "0821-2412990", services: "Soil Testing, pH Testing" },
                { name: "Hubli Soil Testing Laboratory", coordinates: [75.1299, 15.3644], contact: "0836-2264468", services: "Soil Testing, Fertilizer Recommendation" },

                // Kerala
                { name: "Kerala Agricultural University Soil Testing Lab", coordinates: [76.9493, 8.5241], contact: "0471-2301605", services: "Soil Testing, Nutrient Analysis" },
                { name: "Kochi Soil Testing Laboratory", coordinates: [76.2673, 9.9816], contact: "0484-2368447", services: "Soil Testing, pH Testing" },

                // Madhya Pradesh
                { name: "Bhopal Soil Testing Laboratory", coordinates: [77.4126, 23.2599], contact: "0755-2451640", services: "Soil Testing, Fertilizer Recommendation" },
                { name: "Indore Soil Testing Center", coordinates: [75.8760, 22.7196], contact: "0731-2438020", services: "Soil Testing, Micro Nutrient Analysis" },

                // Maharashtra
                { name: "Mumbai Soil Testing Center", coordinates: [72.8777, 19.0760], contact: "022-22164278", services: "Soil Testing, Organic Matter Analysis" },
                { name: "Pune Soil Testing Laboratory", coordinates: [73.8567, 18.5204], contact: "020-25512023", services: "Soil Testing, Micro Nutrient Analysis" },

                // Manipur
                { name: "Imphal Soil Testing Laboratory", coordinates: [93.6151, 24.8170], contact: "0385-2454466", services: "Soil Testing, Nutrient Analysis" },

                // Meghalaya
                { name: "Shillong Soil Testing Laboratory", coordinates: [91.5822, 25.5788], contact: "0364-2225714", services: "Soil Testing, pH Testing" },

                // Mizoram
                { name: "Aizawl Soil Testing Laboratory", coordinates: [92.7274, 23.1645], contact: "0389-2315554", services: "Soil Testing, Nutrient Analysis" },

                // Nagaland
                { name: "Kohima Soil Testing Laboratory", coordinates: [94.1126, 25.6742], contact: "0370-2270678", services: "Soil Testing, Fertilizer Recommendation" },

                // Odisha
                { name: "Odisha Soil Testing Laboratory", coordinates: [85.8314, 20.2961], contact: "0674-2391653", services: "Soil Testing, Nutrient Analysis" },
                { name: "Cuttack Soil Testing Center", coordinates: [86.9987, 20.4625], contact: "0671-2410418", services: "Soil Testing, pH Testing" },

                // Punjab
                { name: "Amritsar Soil Testing Laboratory", coordinates: [74.9438, 31.6340], contact: "0183-2251236", services: "Soil Testing, Nutrient Analysis" },
                { name: "Ludhiana Soil Testing Center", coordinates: [75.7804, 30.9009], contact: "0161-2405590", services: "Soil Testing, Fertilizer Recommendation" },

                // Rajasthan
                { name: "Jaipur Soil Testing Laboratory", coordinates: [75.7885, 26.9124], contact: "0141-2202731", services: "Soil Testing, Nutrient Analysis" },
                { name: "Jodhpur Soil Testing Center", coordinates: [73.0243, 26.2389], contact: "0291-2632300", services: "Soil Testing, pH Testing" },

                // Tamil Nadu
                { name: "Chennai Soil Testing Laboratory", coordinates: [80.2785, 13.0827], contact: "044-25384111", services: "Soil Testing, Organic Matter Analysis" },
                { name: "Coimbatore Soil Testing Laboratory", coordinates: [77.0073, 11.0168], contact: "0422-2555514", services: "Soil Testing, Micro Nutrient Analysis" },

                // Telangana
                { name: "Hyderabad Soil Testing Laboratory", coordinates: [78.4744, 17.3850], contact: "040-24511544", services: "Soil Testing, Nutrient Analysis" },
                { name: "Warangal Soil Testing Center", coordinates: [79.5941, 17.9784], contact: "0870-2564892", services: "Soil Testing, Fertilizer Recommendation" },

                // Tripura
                { name: "Agartala Soil Testing Laboratory", coordinates: [91.2863, 23.8315], contact: "0381-2321028", services: "Soil Testing, Nutrient Analysis" },

                // Uttar Pradesh
                { name: "Lucknow Soil Testing Laboratory", coordinates: [80.9462, 26.8468], contact: "0522-2622100", services: "Soil Testing, pH Testing" },
                { name: "Agra Soil Testing Center", coordinates: [78.0081, 27.1767], contact: "0562-2288893", services: "Soil Testing, Fertilizer Recommendation" },

                // Uttarakhand
                { name: "Dehradun Soil Testing Laboratory", coordinates: [78.0480, 30.3165], contact: "0135-2652447", services: "Soil Testing, Nutrient Analysis" },

                // West Bengal
                { name: "Kolkata Soil Testing Laboratory", coordinates: [88.3639, 22.5726], contact: "033-22412894", services: "Soil Testing, Organic Matter Analysis" },
                { name: "Darjeeling Soil Testing Center", coordinates: [88.2622, 27.0369], contact: "0354-2255000", services: "Soil Testing, pH Testing" },

                // Jammu and Kashmir
                { name: "Srinagar Soil Testing Laboratory", coordinates: [74.7794, 34.0837], contact: "0194-2452715", services: "Soil Testing, Nutrient Analysis" },

                // Ladakh
                { name: "Leh Soil Testing Laboratory", coordinates: [77.5828, 34.1526], contact: "01982-252234", services: "Soil Testing, Fertilizer Recommendation" }
            ];

            // Add markers to the map
            soilTestingCenters.forEach(center => {
                new mapboxgl.Marker({ color: 'green' })
                    .setLngLat(center.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<strong>${center.name}</strong><br/>Contact: ${center.contact}<br/>Services: ${center.services}`
                            )
                    )
                    .addTo(map);
            });

            // Clean up on unmount
            return () => map.remove();
        }
    }, [loading]);

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

                <div
                    className="max-w-full mx-auto mt-16 pb-10 pt-5 px-4 sm:px-6 lg:px-8"
                    style={{
                        backgroundImage: `url(${bgHero})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <h1 className="text-2xl font-bold text-green-500 text-center">Soil Quality Prediction</h1>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                        <div className="sm:w-2/3 p-4">
                            <h1 className="md:text-2xl sm:text-2xl text-2xl font-bold py-4 text-green-700">
                                🌱 About Soil Quality Prediction Model
                            </h1>
                            <p className="text-lg text-[#000435] text-justify">
                                🌍 The Soil Quality Prediction Model leverages Machine Learning to provide accurate insights into soil health. By analyzing various parameters such as nutrient levels, pH balance, and moisture content, the model helps farmers make informed decisions.
                            </p>
                            <p className='md:text-xl sm:text-xl text-xl font-bold py-4 text-[#000435]'>
                                🤔 How it Works!
                            </p>
                            <p className="text-lg text-[#000435]">
                                <span>🔍 Analyze key soil parameters like nitrogen, phosphorous, and potassium.</span><br />
                                <span>📈 Assess pH level, electrical conductivity, and organic carbon.</span><br />
                                <span>💧 Evaluate additional nutrients such as sulphur, zinc, and iron.</span><br />
                                <span>✅ Check for copper, manganese, and boron.</span><br />
                                <span>✅ Provide actionable insights for soil management and crop planning.</span><br />
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

                    <h2 className="mt-10 text-xl font-semibold text-[#000435] text-center">
                        View Soil Testing Centers Map:
                    </h2>
                    <div
                        id="map"
                        className="w-full max-w-4xl h-64 sm:h-80 md:h-100 mt-4 mx-auto rounded-lg border-2 border-green-500"
                    ></div>
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
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="w-full sm:w-2/3 p-4 flex items-center justify-center">
                            <p className="text-lg text-[#000435]">
                            <AdvantagesDisadvantages items={items} />
                            </p>
                        </div>

                        </div>

                    </div>
                </div>

            }
        </>


    );
};

export default SoilQuality;

