import { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqQuestions = [
    {
      question: "What is AgroTech AI platform?",
      answer: "AgroTech AI platform is a comprehensive web-based tool where users can access various machine learning models for making accurate predictions related to agriculture. It offers solutions for crop management, soil health assessment, pest control, and more."
    },
    {
      question: "How does AgroTech AI platform work?",
      answer: "Users can utilize AgroTech AI platform to search and apply machine learning models for different agricultural scenarios. They can contribute to data-driven farming practices, create predictive models, and analyze agricultural data effectively."
    },
    {
      question: "Who can benefit from AgroTech AI platform?",
      answer: "AgroTech AI platform is beneficial for farmers, agronomists, and agricultural researchers. Whether you are optimizing crop yields, monitoring soil nutrients, or predicting weather impacts, AgroTech AI provides tools tailored to agricultural needs."
    },
    {
      question: "Is AgroTech AI platform free to use?",
      answer: "Yes, AgroTech AI platform is completely free to use. It aims to democratize access to advanced agricultural technologies and empower farmers with actionable insights."
    },
    {
      question: "How can I contribute to AgroTech AI platform?",
      answer: "You can contribute to AgroTech AI platform by sharing your agricultural data insights, collaborating on improving predictive models, and suggesting enhancements to existing tools. Your contributions help enhance farming practices globally."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="" style={{ backgroundImage: `url(${bgHero})` }}>
      <div className="max-w-7xl pb-10 pt-5 mx-auto px-4 sm:px-6 lg:px-8 " >
        <h2 className="text-xl md:text-4xl  sm:text-2xl  lg:text-4xl mb-7 font-extrabold text-center text-green-500 ">🤔 Frequently Asked Questions 🤔</h2>
        <dl className="space-y-2">
          {faqQuestions.map((faq, index) => (
            <div key={index} className="space-y-2">
              <div class="w-[83%] mb-2 transition-transform duration-300  group">
                <div class="rounded-lg border-2 border-transparent transition-all duration-300 border-[#000435]">
                  <button class="rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] w-full flex justify-between items-center p-4 text-[1.25rem] font-medium text-white border-none cursor-pointer text-left transition-shadow duration-300 hover:shadow-[1px_1px_2px_rgb(255,0,225),_0_0_1em_rgb(0,255,251),_0_0_0.2em_rgb(0,255,242)]"><span>{faq.question}</span>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" class="w-5 h-5 group-hover:rotate-180 transition-all ease-in-out duration-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg></button></div><div class="overflow-hidden transition-max-height duration-1000 group-hover:max-h-[200px] max-h-0"><div class="mt-1 ml-1 rounded-lg text-[17px] text-white p-2 bg-gradient-to-r from-[#8d2de23d] to-[#b700e07f] hover:bg-gradient-to-r hover:from-[#8d2de257] hover:to-[#b700e0b3]">{faq.answer}</div></div></div>
              <div
                className={`transition-all duration-1000  ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
                style={{ maxHeight: activeIndex === index ? '200px' : '0px' }} // Adjust maxHeight as needed
              >
                <div className="mt-2 ml-4 text-sm sm:text-sm border border-green-500 text-justify p-4 rounded-md md:text-lg lg:text-xl">{faq.answer}</div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;

