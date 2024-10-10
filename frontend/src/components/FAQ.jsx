import React, { useState } from "react";
import { BiChevronUp } from 'react-icons/bi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqCount, setFaqCount] = useState(5); // Show 5 FAQs initially

  const faqs = [
    {
      question: "What is AgroTech AI?",
      answer: "AgroTech AI is a platform that integrates advanced technologies like AI and machine learning into agriculture to help farmers optimize their crop yields, manage resources, and make data-driven decisions."
    },
    {
      question: "How can drones be used in farming?",
      answer: "Drones can be used for precision spraying, aerial mapping, monitoring crop health, and assessing soil conditions. They help farmers gain insights into crop status, detect pest infestations early, and manage resources efficiently."
    },
    {
      question: "What kind of data is required for soil analysis?",
      answer: "Soil analysis requires data like nitrogen, phosphorus, potassium levels, pH value, moisture content, and organic carbon levels. This data helps in determining soil quality and recommending suitable crops."
    },
    {
      question: "Can AgroTech AI help with crop recommendation?",
      answer: "Yes, AgroTech AI can recommend crops based on soil analysis data, climate conditions, and past crop performance. It helps farmers choose the right crop to maximize yield and maintain soil health."
    },
    {
      question: "How does the equipment rental platform work?",
      answer: "Farmers can rent agricultural equipment like drones, tractors, seeding machines, and harvesting tools from the platform. They can select the equipment, book it for a specific time period, and have it delivered to their location."
    },
    {
      question: "Is there any training for using the technology?",
      answer: "Yes, AgroTech AI offers tutorials and resources to help farmers learn how to use drones, precision agriculture tools, and AI-based applications for better farm management."
    },
    {
      question: "Can I access weather forecasts on AgroTech AI?",
      answer: "Yes, AgroTech AI provides real-time weather updates and forecasts, helping farmers plan their activities like sowing, irrigation, and harvesting more effectively."
    },
    {
      question: "How is data security handled on AgroTech AI?",
      answer: "Data security is a top priority on AgroTech AI. The platform uses encryption and secure servers to ensure that all data, including farm data and user information, is protected."
    },
    {
      question: "What crops can I grow based on soil data?",
      answer: "AgroTech AI can analyze soil data and suggest crops that are best suited to the soil's nutrient profile and local climate conditions, maximizing the chances of a good harvest."
    },
    {
      question: "How do I get started with using AgroTech AI?",
      answer: "To get started, sign up on the platform, input your farm's location and soil data, and explore the available tools for crop recommendation, drone services, and equipment rentals."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadMoreFAQs = () => {
    setFaqCount(prevCount => Math.min(prevCount + 3, faqs.length)); // Load 3 more FAQs but not exceed total FAQs
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl mb-10 font-bold text-green-600 text-center">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-4">
          {faqs.slice(0, faqCount).map((faq, index) => (
            <div key={index} className="transition-transform duration-300 group">
              <div className="rounded-lg border-2 border-green-200 bg-white shadow hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => handleToggle(index)}
                  className="flex justify-between items-center w-full p-4 text-lg font-medium text-green-700 bg-gradient-to-r from-green-500 to-green-700 rounded-lg text-white transition-all duration-300 hover:bg-gradient-to-l"
                >
                  <span>{faq.question}</span>
                  <BiChevronUp className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {activeIndex === index && (
                <div className="mt-2 p-2 rounded-lg bg-green-50 text-green-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </dl>
        {faqCount < faqs.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreFAQs}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-green-700"
            >
              Load More FAQs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
