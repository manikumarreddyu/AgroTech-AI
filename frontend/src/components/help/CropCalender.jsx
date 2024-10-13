import React, { useState, useEffect } from 'react';
import img1 from "../../assets/tp.png"

const CropCalendar = () => {
  // Crop data
  const cropCalendar = {
    Spring: {
      March: {
        'Early Potatoes': ['Plant', 'N/A'],
        Peas: ['Plant', 'N/A'],
        Lettuce: ['Sow indoors', 'N/A'],
        Onions: ['Set out', 'N/A'],
      },
      April: {
        Carrots: ['Plant', 'June - October'],
        Spinach: ['Sow', 'May - June'],
        Beets: ['Sow', 'June - September'],
        Cabbage: ['Transplant seedlings outdoors', 'July - October'],
      },
      May: {
        Tomatoes: ['Transplant outdoors', 'July - September'],
        Cucumbers: ['Plant', 'July - August'],
        Beans: ['Plant', 'July - September'],
        Corn: ['Plant', 'August - October'],
      },
    },
    Summer: {
      June: {
        Squash: ['Plant', 'July - September'],
        Melons: ['Plant', 'August - September'],
        Basil: ['Sow', 'July - September'],
        Peppers: ['Transplant outdoors', 'July - September'],
      },
      July: {
        'Late-season Carrots': ['Sow', 'September - November'],
        'Second crop of Beans': ['Sow', 'September - October'],
      },
      August: {
        Pumpkins: ['Plant', 'September - October'],
        Spinach: ['Plant for fall harvest', 'October - December'],
        Broccoli: ['Sow for fall harvest', 'October - December'],
      },
    },
    Fall: {
      September: {
        Garlic: ['Plant', 'July - August'],
        Onions: ['Sow seeds for overwintering', 'May - June'],
        'Cover crops': ['Sow', 'N/A'],
      },
      October: {
        Kale: ['Harvesting', 'N/A'],
        'Brussels Sprouts': ['Harvesting', 'N/A'],
        'Fall Lettuce': ['Harvesting', 'N/A'],
      },
      November: {
        'Root crops': ['Harvest remaining', 'N/A'],
        Mulching: ['Prepare for winter', 'N/A'],
      },
    },
    Winter: {
      'December & January': {
        'Indoor Herbs': ['Plant indoors', 'N/A'],
      },
      February: {
        'Early seeds': ['Starting indoors', 'N/A'],
      },
    },
  };

  const seasonBackgrounds = {
    Test: `url(${img1})`,
    Spring:
      "url('https://thumbs.dreamstime.com/b/vineyard-cannonau-grapes-spring-new-shoots-young-leaves-branches-inflorescence-vine-traditional-agriculture-277846894.jpg')",
    Summer:
      "url('https://blog.machinefinder.com/wp-content/uploads/2013/07/r952i_trailed_sprayer.jpg')",
    Fall:
      "url('https://foodgardening.mequoda.com/wp-content/uploads/2021/01/autumn-sunlight.jpg')",
    Winter:
      "url('https://thumbs.dreamstime.com/z/agricultural-field-winter-wheat-under-snow-22126457.jpg')",
  };

  const [selectedSeason, setSelectedSeason] = useState('');
  const [cropInfo, setCropInfo] = useState(null);

  useEffect(() => {
    if (selectedSeason) {
      document.body.style.backgroundImage = seasonBackgrounds[selectedSeason];
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.style.backgroundImage = 'none';
    }
  }, [selectedSeason]);

  const handleSeasonChange = (e) => {
    const season = e.target.value;
    setSelectedSeason(season);
    displayCrops(season);
  };

  const displayCrops = (season) => {
    if (cropCalendar[season]) {
      const seasonCrops = cropCalendar[season];
      setCropInfo(
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-white">{season}</h2>
          {Object.keys(seasonCrops).map((month) => (
            <div key={month} className="mb-6">
              <h3 className="text-xl font-medium mt-4 text-white">{month}:</h3>
              <ul className="list-none pl-0">
                {Object.keys(seasonCrops[month]).map((crop) => (
                  <li
                    key={crop}
                    className="my-2 p-2 border border-white rounded bg-white bg-opacity-20 backdrop-blur-md"
                  >
                    <strong>{crop}:</strong> {seasonCrops[month][crop][0]}{' '}
                    <em>(Harvest: {seasonCrops[month][crop][1]})</em>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      setCropInfo(
        <p className="text-red-500 mt-4">Invalid season, please select a valid option.</p>
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-24 pt-40"
      style={{
        backgroundImage: seasonBackgrounds[selectedSeason] || `url(${img1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Backdrop layer */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Glassmorphism effect */}
      <div className="relative bg-white bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg p-10 w-full max-w-xl z-10">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Crop Calendar
        </h1>
        <label htmlFor="season" className="block mb-2 text-white text-lg">
          Select a season:
        </label>
        <select
          id="season"
          className="w-full p-4 mb-6 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-60 backdrop-blur-md"
          onChange={handleSeasonChange}
          value={selectedSeason}
        >
          <option value="">--Select--</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
        </select>
        <div id="cropInfo" className="crop-info">
          {cropInfo}
        </div>
        <footer className="mt-6 text-center text-white text-sm">
          <p>Data Source: Your Data Source</p>
        </footer>
      </div>
    </div>
  );
};

export default CropCalendar;
