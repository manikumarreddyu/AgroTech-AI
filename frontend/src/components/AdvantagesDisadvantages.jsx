'use client'

import { useEffect, useRef, useState } from 'react';

const items = [
  { type: 'advantage', text: 'Helps farmers make data-driven decisions.' },
  { type: 'disadvantage', text: 'Requires accurate and up-to-date data for best results.' },
  { type: 'advantage', text: 'Increases crop yield by selecting the most suitable crops.' },
  { type: 'disadvantage', text: 'May involve initial costs for data collection and analysis tools.' },
  { type: 'advantage', text: 'Reduces the risk of crop failure by considering environmental factors.' },
  { type: 'disadvantage', text: 'Dependent on technology, which can be a barrier for some farmers.' },
  { type: 'advantage', text: 'Optimizes resource use like water and fertilizers.' },
  { type: 'disadvantage', text: 'May need ongoing support and updates to stay effective.' },
];

function Item({ item }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const gradientClass = item.type === 'advantage' 
    ? 'bg-gradient-to-r from-green-400 to-green-600'
    : 'bg-gradient-to-r from-red-400 to-red-600';

  return (
    <div
      ref={ref}
      className={`p-6 rounded-lg shadow-lg ${gradientClass} text-white transform transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <p>{item.text}</p>
    </div>
  );
}

export default function Component() {
  const advantages = items.filter(item => item.type === 'advantage');
  const disadvantages = items.filter(item => item.type === 'disadvantage');

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-black"><span className='text-green-600'>Advantages</span> and <span className='text-red-600'>Disadvantages</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-6">
              {advantages.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
          <div>
            <div className="space-y-6">
              {disadvantages.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
