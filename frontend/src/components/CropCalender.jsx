// CropCalendar.jsx
import React, { useState } from 'react';

const cropCalendar = {
    "Spring": {
        "March": {
            "Early Potatoes": ["Plant", "N/A"],
            "Peas": ["Plant", "N/A"],
            "Lettuce": ["Sow indoors", "N/A"],
            "Onions": ["Set out", "N/A"],
        },
        // ... [other months and seasons remain the same]
    },
    // ... [other seasons remain the same]
};

const seasonBackgrounds = {
    "Spring": "url('https://thumbs.dreamstime.com/b/vineyard-cannonau-grapes-spring-new-shoots-young-leaves-branches-inflorescence-vine-traditional-agriculture-277846894.jpg')",
    "Summer": "url('https://blog.machinefinder.com/wp-content/uploads/2013/07/r952i_trailed_sprayer.jpg')",
    "Fall": "url('https://foodgardening.mequoda.com/wp-content/uploads/2021/01/autumn-sunlight.jpg')",
    "Winter": "url('https://thumbs.dreamstime.com/z/agricultural-field-winter-wheat-under-snow-22126457.jpg')"
};

const CropCalendar = () => {
    const [selectedSeason, setSelectedSeason] = useState('');
    const [cropInfo, setCropInfo] = useState('');

    const showCrops = (event) => {
        const season = event.target.value;
        setSelectedSeason(season);

        if (season && cropCalendar[season.charAt(0).toUpperCase() + season.slice(1)]) {
            const crops = cropCalendar[season.charAt(0).toUpperCase() + season.slice(1)];
            let output = `<h2 class="text-2xl font-bold text-teal-700">${season.charAt(0).toUpperCase() + season.slice(1)}</h2>`;
            for (const month in crops) {
                output += `<h3 class="text-xl text-teal-600">${month}:</h3><ul class="list-disc pl-5">`;
                for (const crop in crops[month]) {
                    const [action, harvest] = crops[month][crop];
                    output += `<li class="border border-teal-600 rounded p-2 bg-green-100">${crop}: ${action} (Harvest: ${harvest})</li>`;
                }
                output += `</ul>`;
            }
            setCropInfo(output);
        } else {
            setCropInfo("<p class='text-red-500'>Invalid season, please select a valid option.</p>");
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen bg-cover bg-center ${selectedSeason ? `bg-[${seasonBackgrounds[selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}]}` : ''}`}>
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-semibold text-teal-700 text-center mb-4">Crop Calendar</h1>
                <label htmlFor="season" className="block mb-2 text-teal-600">Select a season:</label>
                <select id="season" onChange={showCrops} className="w-full p-2 border border-teal-600 rounded mb-4">
                    <option value="">--Select--</option>
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                </select>
                <div id="cropInfo" className="crop-info" dangerouslySetInnerHTML={{ __html: cropInfo }}></div>
            </div>
        </div>
    );
};

export default CropCalendar;
