import React, { useState } from "react";
import bgHero from "../assets/bgHero.png";
import { BiChevronUp } from 'react-icons/bi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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

  return (
    <section className="text-center text-green-500">
      <div
        className="md:max-w-[70%] w-[90%] mx-auto md:p-8 p-0 text-green-600"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl md:text-[37px] mb-14 font-bold text-green-500">
          Frequently Asked Questions!
        </h2>
        <dl className="flex flex-col items-center">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-[83%] mb-2 transition-transform duration-300 group"
            >
              <div
                className={`rounded-lg border-2 border-transparent transition-all duration-300 ${"border-green-600"}`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-700 w-full flex justify-between items-center p-4 text-[1.25rem] font-medium text-white border-none cursor-pointer text-left transition-shadow duration-300 hover:shadow-[1px_1px_2px_rgb(0,255,0),_0_0_1em_rgb(0,200,0),_0_0_0.2em_rgb(0,150,0)]"
                >
                  <span>{faq.question}</span>
                  <BiChevronUp className="w-5 h-5 group-hover:rotate-180 transition-all ease-in-out duration-500" />
                </button>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 group-hover:max-h-[200px] max-h-0`}
              >
                <div className="mt-1 ml-1 rounded-lg text-[17px] text-white p-2 bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;
