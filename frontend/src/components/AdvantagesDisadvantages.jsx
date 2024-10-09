import React from 'react';
import { useInView } from 'react-intersection-observer';
import img1 from '../assets/110.jpg'; // Ensure this path is correct

const advantages = [
  "Helps farmers make data-driven decisions.",
  "Increases crop yield by selecting the most suitable crops.",
  "Reduces the risk of crop failure by considering environmental factors.",
  "Optimizes resource use like water and fertilizers.",
];

const disadvantages = [
  "Requires accurate and up-to-date data for best results.",
  "May involve initial costs for data collection and analysis tools.",
  "Dependent on technology, which can be a barrier for some farmers.",
  "May need ongoing support and updates to stay effective.",
];

const AdvantagesDisadvantages = () => {
  return (
    <div className="relative flex flex-col sm:flex-row flex-wrap items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 flex flex-row flex-wrap"
        style={{
          backgroundImage: `url(${img1})`,
          filter: 'blur(2px)',
          opacity: 0.6,
        }}
      />
      <div className="z-10 w-full sm:w-1/2 p-5 flex flex-col">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-green-700 mb-5 backdrop-blur-sm">
          <strong>Advantages:</strong>
        </h2>
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-5 rounded-lg shadow-lg">
          {advantages.map((advantage, index) => (
            <AdvantageDisadvantageItem
              key={index}
              text={advantage}
              isAdvantage={true}
            />
          ))}
        </div>
      </div>
      <div className="z-10 w-full sm:w-1/2 p-5 flex flex-col">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-red-700 mb-5 backdrop-blur-sm">
          <strong>Disadvantages:</strong>
        </h2>
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-5 rounded-lg shadow-lg">
          {disadvantages.map((disadvantage, index) => (
            <AdvantageDisadvantageItem
              key={index}
              text={disadvantage}
              isAdvantage={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvantageDisadvantageItem = ({ text, isAdvantage }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`transition-transform duration-700 text-sm sm:text-base md:text-lg opacity-0 h-auto z-10 ${
        inView ? 'opacity-100' : ''
      }`}
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(20px)', // Slide in from below
        background: isAdvantage
          ? 'linear-gradient(to right, #3be29c, #4caf50)'
          : 'linear-gradient(to right, #ff4d4d, #f44336)',
        color: '#fff',
        padding: '20px',
        margin: '10px auto', // Centering the margin
        borderRadius: '8px',
        width: '90%', // Adjusting width to be more responsive
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center', // Centering the text inside
      }}
    >
      {text}
    </div>
  );
};

export default AdvantagesDisadvantages;
