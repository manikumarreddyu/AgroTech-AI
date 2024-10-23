import React from 'react';
import { motion } from 'framer-motion';
import croppingImg from '../assets/cropinspection.png';
import fertilizingImg from '../assets/irrigation.jpg'; 
import pestControlImg from '../assets/tp.png'; 
import waterManagementImg from '../assets/img11.jpg'; 

const bestPractices = [
    {
      title: 'Best Practices for Cropping',
      description: 'Proper cropping techniques ensure sustainable and productive farming. Implement diverse strategies like crop rotation, intercropping, and selecting the right crop varieties to maximize yield and protect the soil.',
      img: croppingImg,
      subtopics: [
        {
          subtitle: '1. Crop Rotation',
          details: 'Rotate crops to break pest and disease cycles, improve soil structure, and boost nutrient content. For example, rotating legumes with cereals can replenish nitrogen in the soil.',
        },
        {
          subtitle: '2. Intercropping',
          details: 'Grow multiple crops in proximity to optimize space, reduce weeds, and create a habitat for beneficial organisms. Intercropping corn with beans is a common example.',
        },
        {
          subtitle: '3. Cover Cropping',
          details: 'Plant cover crops, such as clover or rye, during off-seasons to improve soil health, prevent erosion, and suppress weeds, enhancing the next season’s productivity.',
        },
        {
          subtitle: '4. Selecting Crop Varieties',
          details: 'Choose disease-resistant and climate-appropriate varieties to minimize losses. Consider local climate, soil conditions, and pest threats when selecting crops.',
        },
      ],
    },
    {
      title: 'Fertilizing Techniques',
      description: 'Efficient fertilization strategies can significantly impact crop health. Understand your soil needs through testing, and use a balanced mix of organic and inorganic fertilizers to provide optimal nutrients without harming the environment.',
      img: fertilizingImg,
      subtopics: [
        {
          subtitle: '1. Soil Testing and Analysis',
          details: 'Conduct regular soil tests to determine nutrient deficiencies. Tailor fertilizer application based on the results, ensuring that crops receive the right amounts of nitrogen, phosphorus, and potassium.',
        },
        {
          subtitle: '2. Organic vs. Inorganic Fertilizers',
          details: 'Use a balanced mix of organic (e.g., compost, manure) and inorganic fertilizers to maintain soil health and productivity. Organic fertilizers improve soil structure, while inorganic ones offer rapid nutrient delivery.',
        },
        {
          subtitle: '3. Micro and Macro Nutrients',
          details: 'In addition to nitrogen (N), phosphorus (P), and potassium (K), crops need micro-nutrients such as zinc, copper, and manganese. Ensure micronutrient deficiencies are addressed through targeted fertilizer applications.',
        },
        {
          subtitle: '4. Application Techniques',
          details: 'Apply fertilizers using efficient techniques like drip fertilization or band placement to reduce waste and ensure even nutrient distribution. Avoid over-application, which can lead to runoff and environmental pollution.',
        },
      ],
    },
    {
      title: 'Pest Control Strategies',
      description: 'Effective pest control strategies are essential for maintaining healthy crops. Utilize integrated pest management (IPM), natural predators, and environmentally friendly pest control methods to keep pest populations in check.',
      img: pestControlImg,
      subtopics: [
        {
          subtitle: '1. Integrated Pest Management (IPM)',
          details: 'IPM combines biological, cultural, physical, and chemical tools to manage pests sustainably. This method reduces reliance on pesticides, lowering the risk of resistance and environmental damage.',
        },
        {
          subtitle: '2. Biological Control',
          details: 'Encourage natural predators such as ladybugs, lacewings, and parasitic wasps to control harmful pest populations. Use habitat enhancement or companion planting to attract these beneficial insects.',
        },
        {
          subtitle: '3. Cultural Practices',
          details: 'Alter farming practices, such as timing of planting, crop selection, and sanitation, to reduce pest infestations. For example, early planting can sometimes help avoid peak pest populations.',
        },
        {
          subtitle: '4. Selective Pesticide Use',
          details: 'When necessary, use pesticides in a targeted and responsible manner. Choose selective pesticides that target specific pests while minimizing harm to beneficial organisms and the environment.',
        },
        {
          subtitle: '5. Pest Monitoring and Trapping',
          details: 'Regular monitoring using traps and pheromone lures helps detect early pest infestations. Track pest populations and use this data to time control measures effectively.',
        },
      ],
    },
    {
      title: 'Water Management',
      description: 'Water is a critical resource in farming. Implement smart irrigation systems, rainwater harvesting, and moisture management techniques to ensure crops get adequate water without waste.',
      img: waterManagementImg,
      subtopics: [
        {
          subtitle: '1. Smart Irrigation Systems',
          details: 'Use drip or sprinkler irrigation systems controlled by soil moisture sensors and weather forecasts to provide precise amounts of water directly to plant roots, reducing water waste and enhancing crop yield.',
        },
        {
          subtitle: '2. Rainwater Harvesting',
          details: 'Install rainwater harvesting systems to capture and store rainwater for later use in irrigation. This reduces dependence on groundwater and conserves valuable water resources.',
        },
        {
          subtitle: '3. Soil Moisture Monitoring',
          details: 'Use soil moisture sensors to monitor water levels and ensure crops receive sufficient hydration without over-watering. This improves water-use efficiency and minimizes runoff.',
        },
        {
          subtitle: '4. Water Conservation Techniques',
          details: 'Mulching, contour farming, and planting drought-resistant varieties are techniques that conserve water. Mulching helps retain soil moisture, while contour farming reduces water runoff.',
        },
        {
          subtitle: '5. Scheduling and Timing',
          details: 'Water crops during cooler times of the day (early morning or late afternoon) to reduce evaporation. Adjust irrigation schedules based on crop growth stages and weather conditions to optimize water use.',
        },
      ],
    },
];

const BestPractices = () => {
  return (
    <div className="p-14 mx-auto mt-12 bg-gradient-to-r from-green-50 via-green-100 to-green-200">
      <motion.h2 
        className="text-5xl font-extrabold text-green-700 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        🌱 Best Practices in Sustainable Farming 🌱
      </motion.h2>

      <p className="text-lg text-green-600 font-medium mb-12 text-center">
        Sustainable agriculture practices are essential for ensuring long-term productivity while conserving natural resources. These best practices for cropping, fertilizing, pest control, and water management will help farmers achieve optimal yields while protecting the environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {bestPractices.map((practice, index) => (
          <motion.div 
            key={index} 
            className="bg-white shadow-xl rounded-lg p-8 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2, ease: "easeOut" }}
          >
            <motion.img 
              src={practice.img} 
              alt={practice.title} 
              className="h-64 w-full rounded-lg mb-4 hover:opacity-80 transition-opacity duration-500"
              whileHover={{ scale: 1 }}
            />
            <h3 className="text-3xl font-semibold text-green-700 mb-4">{practice.title}</h3>
            <p className="text-lg text-gray-600 mb-4">{practice.description}</p>
            
            <motion.div 
              className="space-y-6" 
              initial="hidden" 
              animate="visible" 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ staggerChildren: 0.2 }}
            >
              {practice.subtopics.map((subtopic, subIndex) => (
                <motion.div 
                  key={subIndex} 
                  className="group relative"
                  whileHover={{ x: 10 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                >
                  <h4 className="text-xl font-semibold text-green-600 mb-2">{subtopic.subtitle}</h4>
                  <p className="text-gray-600 group-hover:text-green-700 transition-colors duration-300">{subtopic.details}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BestPractices;
