// src/WhyAI.js
import React from 'react';
import cropMonitoringImg from '../assets/crop_monitor.jpg'; // replace with your actual image path
import soilAnalysisImg from '../assets/soil_analysis.jpg'; // replace with your actual image path
import supplyChainImg from '../assets/supply.jpg'; // replace with your actual image path
import roboticsImg from '../assets/robo.jpg'; // replace with your actual image path
import weather from '../assets/weather.jpg';
import irrigation from '../assets/irrigation.jpg';

const applications = [
  {
    title: 'Crop Monitoring',
    description: 'AI technologies like computer vision and machine learning can detect diseases in crops at an early stage, allowing for timely intervention.',
    img: cropMonitoringImg,
  },
  {
    title: 'Soil Analysis',
    description: 'AI algorithms can analyze soil health and nutrient levels, providing tailored recommendations for fertilizer application.',
    img: soilAnalysisImg,
  },
  {
    title: 'Supply Chain Optimization',
    description: 'AI enhances the agricultural supply chain by predicting demand and managing logistics, ensuring quick and efficient product delivery.',
    img: supplyChainImg,
  },
  {
    title: 'Weather Forecasting',
    description: 'AI models analyze historical weather data and real-time satellite imagery to provide accurate weather forecasts, helping farmers make informed decisions about planting, harvesting, and irrigation.',
    img: weather, // Replace with your actual image path
  },
  {
    title: 'Smart Irrigation Systems',
    description: 'AI-powered smart irrigation systems analyze soil moisture levels, weather forecasts, and crop water requirements to optimize irrigation schedules, conserving water resources and improving crop yield.',
    img: irrigation, // Replace with your actual image path
  },
  {
    title: 'Robotics and Automation',
    description: 'Robotic systems powered by AI can perform tasks such as planting and harvesting, improving precision and reducing labor costs.',
    img: roboticsImg,
  },
];

const WhyAI = () => {
  return (
    <div className="p-14 max-w-7xl mx-auto mt-12 bg-green-100">
      <h2 className="text-4xl font-extrabold text-green-600 mb-4 text-center">🌿 Why AI in Agriculture? 🌿</h2>
      <p className="text-lg text-green-700 font-extrabold mb-3 mt-7">
        Artificial Intelligence (AI) is revolutionizing the agricultural sector, enabling farmers and agronomists to make data-driven decisions that enhance productivity and sustainability. The integration of AI technologies is transforming traditional farming methods into smart farming practices, ensuring food security while minimizing environmental impact.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-3xl font-semibold text-green-600 mt-6 mb-4">Key Benefits of AI in Agriculture</h3>
        <ul className="list-disc list-inside text-green-600 space-y-2">
          <li>Precision Agriculture: AI allows farmers to monitor crop health and soil conditions with greater accuracy. By analyzing data from sensors, drones, and satellite imagery, farmers can optimize inputs like water, fertilizers, and pesticides, leading to better yields.</li>
          <li>Predictive Analytics: Using historical data and machine learning algorithms, AI can predict crop yields, pest outbreaks, and weather patterns. This helps farmers plan their planting and harvesting schedules more effectively.</li>
          <li>Automated Farming: AI-powered machinery, such as autonomous tractors and drones, can carry out farming tasks with minimal human intervention, saving labor costs and improving operational efficiency.</li>
          <li>Data-Driven Decision Making: AI helps analyze vast amounts of agricultural data to identify trends and insights, allowing farmers to make informed decisions based on real-time data.</li>
          <li>Sustainable Practices: AI promotes resource conservation by optimizing water usage and minimizing chemical inputs, contributing to environmentally friendly agricultural practices.</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-3xl font-semibold text-green-700 mt-6 mb-4">AI Applications in Agriculture</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
              <img src={app.img} alt={app.title} className="h-48 w-full object-cover rounded-t-lg mb-4" />
              <h4 className="text-xl font-semibold text-green-600">{app.title}</h4>
              <p className="text-gray-700">{app.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-3xl font-semibold text-green-700 mt-6 mb-4">Challenges and Considerations</h3>
        <p className="text-lg text-gray-700 mb-4">
          While AI offers numerous benefits, there are challenges to its adoption in agriculture, including:
        </p>
        <ul className="list-disc list-inside text-green-600 space-y-2">
          <li>Cost of Technology: The initial investment for AI technologies can be high, posing a barrier for smallholder farmers.</li>
          <li>Data Privacy and Security: Ensuring data security and privacy in AI applications is crucial.</li>
          <li>Training and Education: Farmers need training to effectively utilize AI tools and interpret data for informed decision-making.</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-3xl font-semibold text-green-700 mt-6 mb-4">Future Works in AI and Agriculture</h3>
        <p className="text-lg text-gray-700 mb-4">
          As technology continues to evolve, the future of AI in agriculture looks promising. Here are some anticipated developments:
        </p>
        <ul className="list-disc list-inside text-green-600 space-y-2">
          <li>Integration with IoT: The combination of AI with the Internet of Things (IoT) will enable real-time data collection from smart sensors in fields, leading to more accurate decision-making.</li>
          <li>Enhanced Machine Learning Algorithms: Future AI systems will leverage more advanced algorithms for better predictive analytics and adaptability to changing agricultural conditions.</li>
          <li>Personalized Farming Solutions: AI will offer tailored farming solutions based on specific farm conditions, enhancing crop management and yield.</li>
          <li>Blockchain for Transparency: Integrating AI with blockchain technology will provide transparency in the agricultural supply chain, ensuring product authenticity and traceability.</li>
          <li>Climate Resilient Strategies: AI can help develop strategies to make agriculture more resilient to climate change, such as optimizing crop choices based on changing climate patterns.</li>
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-3xl font-semibold text-green-700 mt-6 mb-4">Conclusion</h3>
        <p className="text-lg text-gray-700 mb-4">
          AI is reshaping the future of agriculture, paving the way for smarter, more sustainable farming practices. As technology continues to advance, the potential for AI to enhance productivity, reduce waste, and improve food security is limitless. Embracing AI in agriculture is not just a trend; it's a necessary step towards a more sustainable and efficient food production system.
        </p>
      </div>
    </div>
  );
};

export default WhyAI;
