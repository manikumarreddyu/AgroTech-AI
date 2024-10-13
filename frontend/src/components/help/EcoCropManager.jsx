import React, { useState } from 'react';
import img1 from "../../assets/tp.png"

// Crop data with categories
const cropData = {
  fruits: {
    alfalfa: {
      name: 'Alfalfa',
      soil: 'Fertile, well-drained soil',
      season: 'Spring',
      pesticide: 'None',
    },
    artichoke: {
      name: 'Artichoke',
      soil: 'Well-drained, fertile soil',
      season: 'Spring',
      pesticide: 'Insecticide',
    },
    basil: {
      name: 'Basil',
      soil: 'Rich, well-drained soil',
      season: 'Summer',
      pesticide: 'None',
    },
    blueberry: {
      name: 'Blueberry',
      soil: 'Acidic, well-drained soil',
      season: 'Spring/Summer',
      pesticide: 'None',
    },
    cantaloupe: {
      name: 'Cantaloupe',
      soil: 'Well-drained, sandy soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    chickpea: {
      name: 'Chickpea',
      soil: 'Loamy, well-drained soil',
      season: 'Spring',
      pesticide: 'Insecticide',
    },
    grapes: {
      name: 'Grapes',
      soil: 'Well-drained, fertile soil',
      season: 'Summer',
      pesticide: 'None',
    },
    kiwi: {
      name: 'Kiwi',
      soil: 'Well-drained, fertile soil',
      season: 'Spring/Summer',
      pesticide: 'None',
    },
    mango: {
      name: 'Mango',
      soil: 'Well-drained sandy soil',
      season: 'Summer',
      pesticide: 'None',
    },
    orange: {
      name: 'Orange',
      soil: 'Sandy, well-drained soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    papaya: {
      name: 'Papaya',
      soil: 'Fertile, well-drained soil',
      season: 'Summer',
      pesticide: 'None',
    },
    peach: {
      name: 'Peach',
      soil: 'Sandy loam soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    pear: {
      name: 'Pear',
      soil: 'Well-drained, sandy soil',
      season: 'Summer',
      pesticide: 'None',
    },
    pineapple: {
      name: 'Pineapple',
      soil: 'Well-drained, sandy soil',
      season: 'Summer',
      pesticide: 'None',
    },
    strawberry: {
      name: 'Strawberry',
      soil: 'Well-drained, fertile soil',
      season: 'Spring/Summer',
      pesticide: 'None',
    },
    watermelon: {
      name: 'Watermelon',
      soil: 'Well-drained, sandy soil',
      season: 'Summer',
      pesticide: 'Herbicide',
    },
  },
  vegetables: {
    asparagus: {
      name: 'Asparagus',
      soil: 'Sandy, well-drained soil',
      season: 'Spring',
      pesticide: 'Herbicide',
    },
    barley: {
      name: 'Barley',
      soil: 'Well-drained, light-textured soil',
      season: 'Fall/Spring',
      pesticide: 'Fungicide',
    },
    bellPepper: {
      name: 'Bell Pepper',
      soil: 'Sandy loam soil with good drainage',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    broccoli: {
      name: 'Broccoli',
      soil: 'Rich, well-drained soil',
      season: 'Fall/Spring',
      pesticide: 'Insecticide',
    },
    cabbage: {
      name: 'Cabbage',
      soil: 'Rich, well-drained soil',
      season: 'Fall',
      pesticide: 'Insecticide',
    },
    carrot: {
      name: 'Carrot',
      soil: 'Loose, well-drained soil',
      season: 'Spring',
      pesticide: 'None',
    },
    cauliflower: {
      name: 'Cauliflower',
      soil: 'Fertile, well-drained soil',
      season: 'Fall/Spring',
      pesticide: 'Insecticide',
    },
    cotton: {
      name: 'Cotton',
      soil: 'Well-drained, fertile soil',
      season: 'Spring/Summer',
      pesticide: 'Insecticide',
    },
    cucumber: {
      name: 'Cucumber',
      soil: 'Well-drained, fertile soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    eggplant: {
      name: 'Eggplant',
      soil: 'Well-drained, fertile soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    garlic: {
      name: 'Garlic',
      soil: 'Well-drained sandy soil',
      season: 'Spring',
      pesticide: 'None',
    },
    herbs: {
      name: 'Herbs',
      soil: 'Rich, well-drained soil with organic matter',
      season: 'Year-round',
      pesticide: 'None',
    },
    lettuce: {
      name: 'Lettuce',
      soil: 'Well-drained, fertile soil',
      season: 'Spring/Fall',
      pesticide: 'None',
    },
    millet: {
      name: 'Millet',
      soil: 'Drought-resistant soil',
      season: 'Summer',
      pesticide: 'Insecticide',
    },
    oat: {
      name: 'Oat',
      soil: 'Sandy or loamy soil',
      season: 'Spring',
      pesticide: 'Herbicide',
    },
    radish: {
      name: 'Radish',
      soil: 'Loose, well-drained soil',
      season: 'Spring/Fall',
      pesticide: 'None',
    },
    rice: {
      name: 'Rice',
      soil: 'Clayey soil with good water retention',
      season: 'Summer',
      pesticide: 'Carbofuran',
    },
    spinach: {
      name: 'Spinach',
      soil: 'Fertile, well-drained soil',
      season: 'Spring/Fall',
      pesticide: 'None',
    },
    tomato: {
      name: 'Tomato',
      soil: 'Well-drained, sandy soil',
      season: 'Spring/Summer',
      pesticide: 'Chlorantraniliprole',
    },
    sweetPotato: {
      name: 'Sweet Potato',
      soil: 'Loose, well-drained soil',
      season: 'Summer',
      pesticide: 'None',
    },
    zucchini: {
      name: 'Zucchini',
      soil: 'Rich, well-drained soil',
      season: 'Summer',
      pesticide: 'Herbicide',
    },
    wheat: {
      name: 'Wheat',
      soil: 'Well-drained loamy soil',
      season: 'Fall',
      pesticide: 'Glyphosate',
    },
  },
};

const EcoCropManager = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableCrops, setAvailableCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [result, setResult] = useState('');

  // Handle category selection
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedCrop('');
    setResult('');

    if (category) {
      const crops = Object.keys(cropData[category]);
      setAvailableCrops(crops);
    } else {
      setAvailableCrops([]);
    }
  };

  // Handle crop selection
  const handleCropChange = (e) => {
    const crop = e.target.value;
    setSelectedCrop(crop);
    setResult('');
  };

  // Handle Learn About button click
  const handleLearnAbout = () => {
    if (selectedCrop && selectedCategory) {
      const cropInfo = cropData[selectedCategory][selectedCrop];
      setResult(
        `**Crop:** ${cropInfo.name}\n**Ideal Soil:** ${cropInfo.soil}\n**Best Season:** ${cropInfo.season}\n**Common Pesticide:** ${cropInfo.pesticide}`
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-24 pt-40"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Glassmorphism effect */}
      <div className="relative bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md z-10 transition duration-300 ease-in-out">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Eco-Crop Manager
        </h1>

        <div className="mb-5">
          <label htmlFor="category-select" className="block text-left mb-2 font-semibold text-white">
            Select a Crop Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-md"
          >
            <option value="">Select a Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
        </div>

        <div className=" mb-5">
          <label htmlFor="crop-select" className="block text-left mb-2 font-semibold text-white">
            Select a Crop:
          </label>
          <select
            id="crop-select"
            value={selectedCrop}
            onChange={handleCropChange}
            disabled={!selectedCategory}
            className="w-full p-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 backdrop-blur-md disabled:opacity-50"
          >
            <option value="">Select a Crop</option>
            {availableCrops.map((crop) => (
              <option key={crop} value={crop}>
                {cropData[selectedCategory][crop].name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleLearnAbout}
          disabled={!selectedCrop}
          className={`w-full p-2 my-5 rounded-md text-white font-semibold transition duration-300 ${
            selectedCrop
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
              : 'bg-green-400 cursor-not-allowed'
          }`}
        >
          Learn About This Crop
        </button>

        {result && (
          <div className="mt-6 p-4 border border-green-600 rounded-md bg-blue-50 text-left whitespace-pre-wrap bg-gradient-to-r from-green-300 to-green-350">
            {result.split('\n').map((line, index) => (
              <p key={index} className="mb-2">
                {line.startsWith('**') ? (
                  <strong className="text-green-700">
                    {line.replace('**', '').replace('**', '')}
                  </strong>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoCropManager;
