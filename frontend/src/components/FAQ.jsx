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
    <section className=""style={{ backgroundImage: `url(${bgHero})`}}>
      <div className="max-w-7xl pb-10 pt-5 mx-auto px-4 sm:px-6 lg:px-8 " >
        <h2 className="text-xl md:text-4xl  sm:text-2xl  lg:text-4xl mb-7 font-extrabold text-center text-green-500 ">🤔 Frequently Asked Questions 🤔</h2>
        <dl className="space-y-2">
          {faqQuestions.map((faq, index) => (
            <div key={index} className="space-y-2">
              <div className={`rounded-lg ${activeIndex === index ? 'border' : 'bg-green'} ${activeIndex === index ? 'bg-green-500 text-black' : ''} `}>
                <button
                  onMouseEnter={() => handleToggle(index)}
                  onMouseLeave={() => handleToggle(index)}
                  className={`animated-border-inner w-full focus:outline-none transition duration-100 ease-in-out `}
                >
                  <span className={`text-sm sm:text-sm md:text-xl lg:text-2xl leading-6 font-medium ${activeIndex === index ? 'text-black' : ''} `}>{faq.question}</span>
                  {activeIndex === index ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
                </button>
              </div>
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

