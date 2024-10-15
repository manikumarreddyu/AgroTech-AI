import React, { useEffect, useState } from "react";
import Spinner from "../Spinner.jsx";
import img2 from "../../assets/images/mushroom_bg.jpg";

const MushroomEdibility = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join(' ');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    'cap-shape': "",
    'cap-surface': "",
    'cap-color': "",
    'bruises': "",
    'odor': "",
    'gill-attachment': "",
    'gill-spacing': "",
    'gill-size': "",
    'gill-color': "",
    'stalk-shape': "",
    'stalk-root': "",
    'stalk-surface-above-ring': "",
    'stalk-surface-below-ring': "",
    'stalk-color-above-ring': "",
    'stalk-color-below-ring': "",
    'veil-type': "",
    'veil-color': "",
    'ring-number': "",
    'ring-type': "",
    'spore-print-color': "",
    'population': "",
    'habitat': ""
  });


  const options = {
    "cap_shape": ["bell", "conical", "convex", "flat", "knobbed", "sunken"],
    "cap_surface": ["fibrous", "grooves", "scaly", "smooth"],
    "cap_color": ["brown", "buff", "cinnamon", "gray", "green", "pink", "purple", "red", "white", "yellow"],
    "bruises": ["bruises", "no bruises"],
    "odor": ["almond", "anise", "creosote", "fishy", "foul", "musty", "none", "pungent", "spicy"],
    "gill_attachment": ["attached", "free"],
    "gill_spacing": ["close", "crowded"],
    "gill_size": ["broad", "narrow"],
    "gill_color": ["black", "brown", "buff", "chocolate", "gray", "green", "orange", "pink", "purple", "red", "white", "yellow"],
    "stalk_shape": ["enlarging", "tapering"],
    "stalk_root": ["bulbous", "club", "equal", "rooted", "missing"],
    "stalk_surface_above_ring": ["fibrous", "scaly", "silky", "smooth"],
    "stalk_surface_below_ring": ["fibrous", "scaly", "silky", "smooth"],
    "stalk_color_above_ring": ["brown", "buff", "cinnamon", "gray", "orange", "pink", "red", "white", "yellow"],
    "stalk_color_below_ring": ["brown", "buff", "cinnamon", "gray", "orange", "pink", "red", "white", "yellow"],
    "veil_type": ["partial"],
    "veil_color": ["brown", "orange", "white", "yellow"],
    "ring_number": ["none", "one", "two"],
    "ring_type": ["evanescent", "flaring", "large", "none", "pendant"],
    "spore_print_color": ["black", "brown", "buff", "chocolate", "green", "orange", "purple", "white", "yellow"],
    "population": ["abundant", "clustered", "numerous", "scattered", "several", "solitary"],
    "habitat": ["grasses", "leaves", "meadows", "paths", "urban", "waste", "woods"]
  };


  const keyMapping = {
    'cap-shape': 'cap_shape',
    'cap-surface': 'cap_surface',
    'cap-color': 'cap_color',
    'gill-attachment': 'gill_attachment',
    'gill-spacing': 'gill_spacing',
    'gill-size': 'gill_size',
    'gill-color': 'gill_color',
    'stalk-shape': 'stalk_shape',
    'stalk-root': 'stalk_root',
    'stalk-surface-above-ring': 'stalk_surface_above_ring',
    'stalk-surface-below-ring': 'stalk_surface_below_ring',
    'stalk-color-above-ring': 'stalk_color_above_ring',
    'stalk-color-below-ring': 'stalk_color_below_ring',
    'veil-type': 'veil_type',
    'veil-color': 'veil_color',
    'ring-number': 'ring_number',
    'ring-type': 'ring_type',
    'spore-print-color': 'spore_print_color',
    'population': 'population',
    'habitat': 'habitat',
    'bruises': 'bruises',
    'odor': 'odor'
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (Object.values(formData).some((field) => field === "")) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/mushroom_edibility", {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
      } else {
        setResult(data.edibility);
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setResult(null);
    setErrorMessage("");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="flex items-center justify-center min-h-screen p-24 pt-40"
          style={{
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >

          <div className="absolute inset-0 bg-black opacity-50" />
          
          <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-3xl z-10">
            <h1 className="text-3xl font-bold text-center text-white mb-12">
              Mushroom Edibility Prediction
            </h1>

            <div className="flex flex-col justify-center mb-8">
              <p className="text-lg text-white text-justify">
                🍄 Enter mushroom characteristics to predict whether it is edible or poisonous.
              </p>
              <p className="md:text-xl text-lg font-bold py-4 text-white">
                🤔 How it Works!
              </p>
              <p className="text-lg text-white text-left">
                🌱 Input various mushroom features, such as cap shape, color, bruising, and more.
                <br />
                📊 The system predicts the edibility based on the data.
              </p>
            </div>

            <form className="space-y-6" name="mushroomEdibility">
  <div className="flex flex-wrap -mx-2 justify-center">
    {Object.keys(formData).map((field) => (
      <div className="relative w-1/3 px-2 mb-4" key={field}> {/* Adjusted width to 1/3 */}
        <label htmlFor={field} className="block text-gray-200 text-left font-bold capitalize">
          {field.replace(/-/g, " ")}:
        </label>
        <select
          name={field}
          id={field}
          value={formData[field]}
          onChange={handleChange}
          className="peer w-full p-4 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md mt-2"
          required
        >
          <option value="" selected disabled style={{ color: 'lightgray' }}>
            Select {toPascalCase(field.replace(/-/g, " "))}
          </option>
          {options[keyMapping[field]].map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    ))}
  </div>

  <button
    type="button"
    onClick={handleSubmit}
    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60"
  >
    Predict
  </button>
</form>

            

            {result && (
            <div className={`mt-8 p-4 rounded-md ${result === "Edible" ? "bg-green-200" : "bg-red-200"}`}>
                <h2 className={`text-2xl font-bold mb-4 ${result === "Edible" ? "text-green-800" : "text-red-800"}`}>
                Prediction:
                </h2>
                <p className={`text-lg ${result === "Edible" ? "text-green-600" : "text-red-600"}`}>
                    The mushroom is <span className="font-bold">{result.toLowerCase()}</span>.
                </p>
            </div>
            )}

            {errorMessage && (
              <div
                className={`mt-6 bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-center transition-opacity duration-1000 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}
              >
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MushroomEdibility;
