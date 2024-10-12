import React, { useState } from 'react';

// Crop management guides data
const cropGuides = {
  barley: `
    <strong>1. Barley</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Plow and harrow the field to a fine tilth. This should be done 2-4 weeks before sowing to allow the soil to aerate.</p>
    <p>Soil Testing: Test soil for pH and nutrient levels and apply lime and fertilizers as required.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Line sowing. Seed Rate: About 80-100 kg per hectare, depending on soil fertility. Timing: Sow in early spring (March-April) or in late summer (July) for autumn barley.</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: Ensure consistent moisture, especially during germination. Weeding: Monitor for weed growth.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply nitrogen-based fertilizers around 6-8 weeks after planting. Pest Management: Monitor for pests and apply appropriate insecticides if necessary.</p>
    <p><strong>e. Harvesting (Weeks 12-16):</strong></p>
    <p>When to Harvest: When the grains are hard and moisture content is around 14-18%. Method: Use a combine harvester for efficiency.</p>
  `,
  corn: `
    <strong>2. Corn</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Prepare the ground by tilling 2-3 weeks before sowing. Soil Testing: Analyze soil for fertility.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Drilling (preferred for better germination). Seed Rate: Approximately 25,000-35,000 seeds per hectare. Timing: Late spring (April-May) when soil temperature is around 10°C (50°F).</p>
    <p><strong>c. Post-Sowing (Weeks 5-8):</strong></p>
    <p>Watering: Ensure field is well-irrigated but avoid over-saturation. Weeding: Implement mechanical or manual weeding techniques.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: First application 6 weeks after sowing. Side-dress with nitrogen. Pest Control: Check for pests like corn borers and apply insecticides recommended for corn.</p>
    <p><strong>e. Harvesting (Weeks 12-16):</strong></p>
    <p>When to Harvest: When kernels are dented and moisture levels are 20-25%. Method: Use a combine harvester.</p>
  `,
  // ... Add other crop guides similarly
  // cotton, rice, soya, sugarcane, sunflower, tomato, wheat, yams
  cotton: `
    <strong>3. Cotton</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Start with deep plowing and prepare seedbed a few weeks before sowing. Soil Testing: Important for nutrient management.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Dibbling or broadcasting. Seed Rate: 12-15 kg per hectare. Timing: Late spring (April-May), after the last frost.</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: Irrigate well, especially during germination. Weeding: Manual weeding or inter-row cultivation.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply fertilizers based on soil test results (often nitrogen and phosphorous). Pest Management: Regular monitoring for boll weevils and leaf worms.</p>
    <p><strong>e. Harvesting (Weeks 12-20):</strong></p>
    <p>When to Harvest: When bolls are bursting open. Method: Hand-picking or mechanical harvesting.</p>
  `,
  rice: `
    <strong>4. Rice</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Prepare puddle fields (flooding and tillage) before sowing. Soil Testing: Test for nutrient levels.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Broadcasting. Seed Rate: 100-120 kg per hectare. Timing: Early spring (April).</p>
    <p><strong>c. Post-Sowing (Weeks 5-8):</strong></p>
    <p>Water Management: Maintain shallow water levels (5-10 cm) for optimal conditions. Weeding: Mostly manual due to wet fields.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-15):</strong></p>
    <p>Fertilizer Application: Apply fertilizers at 3 weeks after planting. Pest Management: Monitor for rice pests (e.g., planthoppers).</p>
    <p><strong>e. Harvesting (Weeks 15-20):</strong></p>
    <p>When to Harvest: When grains are hard, and panicles start to bend. Method: Manual harvesting or combine harvester.</p>
  `,
  soya: `
    <strong>5. Soya</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Prepare the field with minimum tillage about 1-2 weeks before planting. Soil Testing: Evaluate nitrogen levels.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Line sowing. Seed Rate: 75-90 kg per hectare. Timing: Late spring (May).</p>
    <p><strong>c. Post-Sowing (Weeks 5-9):</strong></p>
    <p>Watering: Depending on rainfall, ensure some moisture. Weeding: Monitor weed growth.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply a nitrogen-phosphorus-potash mix after 2-3 weeks. Pest Management: Check for pests like aphids and spider mites.</p>
    <p><strong>e. Harvesting (Weeks 12-16):</strong></p>
    <p>When to Harvest: When leaves turn yellow and pods are firm. Method: Combine harvester or manual harvesting.</p>
  `,
  sugarcane: `
    <strong>6. Sugarcane</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Deep plowing 3-4 weeks before planting. Soil Testing: To determine nutrient requirements.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Planting setts (pieces of stems). Seed Rate: 25,000-30,000 setts per hectare. Timing: Ideal in early spring (March-April).</p>
    <p><strong>c. Post-Sowing (Weeks 5-8):</strong></p>
    <p>Watering: Maintain adequate moisture, especially during germination. Weeding: Manual weeding until canopies form.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-16):</strong></p>
    <p>Fertilizer Application: Apply nitrogen and potash fertilizers 6-8 weeks after planting. Pest Management: Check for sugarcane borers and other pests.</p>
    <p><strong>e. Harvesting (Weeks 16-20):</strong></p>
    <p>When to Harvest: When the sap is sweet, generally 12-18 months after planting. Method: Manual cutting or mechanical harvesters.</p>
  `,
  sunflower: `
    <strong>7. Sunflower</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Prepare soil with moderate tillage. Soil Testing: Check pH levels for ideal growth.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Broadcasting or drilling. Seed Rate: 5-7 kg per hectare. Timing: Late spring (May).</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: As per rainfall; sunflowers thrive on well-drained soil. Weeding: Implement weeding around 4-6 weeks after planting.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply nitrogen fertilizer about 6 weeks post-sowing. Pest Management: Monitor for sunflower beetles.</p>
    <p><strong>e. Harvesting (Weeks 12-16):</strong></p>
    <p>When to Harvest: When the back of the head turns yellow, and seeds are developed. Method: Mechanical harvesting for larger crops.</p>
  `,
  tomato: `
    <strong>8. Tomato</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Prepare with deep plowing and adding organic matter. Soil Testing: Important for determining pH and nutrient levels.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Transplanting seedlings. Seed Rate: 20,000-25,000 plants per hectare. Timing: Seed indoors 6-8 weeks before the last frost, transplant when temperatures are warm.</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: Regular watering, avoid waterlogging. Weeding: Hand or mechanical weeding.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply soluble fertilizers at transplanting and again after 4-6 weeks. Pest Management: Monitor for aphids and tomato hornworms.</p>
    <p><strong>e. Harvesting (Weeks 12-20):</strong></p>
    <p>When to Harvest: When fruits are fully colored and have a uniform hue. Method: Hand-picked for quality.</p>
  `,
  wheat: `
    <strong>9. Wheat</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Tillage to minimize residue, done 2-4 weeks prior to sowing. Soil Testing: Test for nitrogen, phosphorus, and potassium.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Drilling or broadcasting. Seed Rate: 100-120 kg per hectare. Timing: September to October for winter wheat or March-April for spring wheat.</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: Depending on rainfall; generally not too wet. Weeding: Monitor and control any weed issues.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply nitrogen in the spring growth phase. Pest Management: Monitor for aphids and cereal leaf beetles.</p>
    <p><strong>e. Harvesting (Weeks 12-20):</strong></p>
    <p>When to Harvest: Once grains are hard and moisture levels are around 13-15%. Method: Combine harvester.</p>
  `,
  yams: `
    <strong>10. Yams</strong>
    <p><strong>a. Starting Procedures (Weeks 1-2):</strong></p>
    <p>Tillage of Soil: Deep plow and prepare ridges or mounds. Soil Testing: Check for organic matter and pH.</p>
    <p><strong>b. Sowing (Weeks 3-4):</strong></p>
    <p>Method: Plant whole tubers or seed pieces. Seed Rate: 20,000-25,000 tubers per hectare. Timing: Early spring (April-May).</p>
    <p><strong>c. Post-Sowing (Weeks 5-10):</strong></p>
    <p>Watering: Ensure consistent watering during early growth. Weeding: Regularly check for weeds.</p>
    <p><strong>d. Intercultural Operations (Weeks 6-12):</strong></p>
    <p>Fertilizer Application: Apply organic manure or potassium fertilizer about 6 weeks post-planting. Pest Management: Monitor for tuber pests.</p>
    <p><strong>e. Harvesting (Weeks 10-20):</strong></p>
    <p>When to Harvest: When the leaves yellow and die back, typically 6-12 months after planting. Method: Manual harvesting with care to avoid damage.</p>
  `,
};

const CropManagementGuide = () => {
  const [selectedCrop, setSelectedCrop] = useState('');

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center mt-10"
      style={{
        backgroundImage: "url('https://www.cabi.org/wp-content/uploads/International-development/Centres/ICM-Diagram-FINAL.jpg')",
      }}
    >
      <div className="w-11/12 max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Crop Management Guide</h1>
        <div className="mb-6">
          <label htmlFor="cropSelector" className="block text-lg font-semibold mb-2">
            Select a Crop
          </label>
          <select
            id="cropSelector"
            value={selectedCrop}
            onChange={handleCropChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select a Crop --</option>
            <option value="barley">Barley</option>
            <option value="corn">Corn</option>
            <option value="cotton">Cotton</option>
            <option value="rice">Rice</option>
            <option value="soya">Soya</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="sunflower">Sunflower</option>
            <option value="tomato">Tomato</option>
            <option value="wheat">Wheat</option>
            <option value="yams">Yams</option>
          </select>
        </div>
        <div className="guide mt-4 p-4 border border-green-700 rounded-md bg-green-50">
          {selectedCrop ? (
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: cropGuides[selectedCrop] }}
            />
          ) : (
            <p className="text-center text-gray-500">Please select a crop to view the management guide.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropManagementGuide;
