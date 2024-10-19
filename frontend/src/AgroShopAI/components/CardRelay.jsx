import React, { useRef, useState, useEffect } from 'react';
import DisplayCard from "./DisplayCard";
const CardRelay = ({heading, items }) => {
  const containerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -700, // Adjust scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 700, // Adjust scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    const container = containerRef.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Initial check on mount
      checkScrollPosition(); 
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="category-container d-flex justify-content-center align-items-center mx-2 my-2">
      <div className="top-heading flex justify-between items-center bg-green-200 border-b-2 border-green-600">
        <h1 className="font-semibold py-1 ml-8 text-2xl text-black">{heading}</h1>
        <button className="font-semibold text-green-600 hover:text-green-800 mr-2">View All</button>
      </div>

      <div className="relative w-full overflow-hidden bg-green-100 mt-2">
        {/* Left Scroll Button: Hide when at the leftmost position */}
        {!isAtStart && (
          <button
            onClick={scrollLeft}
            className="absolute py-10 ml-1 left-0 top-1/2 transform -translate-y-1/2 bg-green-300 hover:bg-green-400 text-black p-2 rounded-full shadow-lg z-10"
          >
            &#9664; {/* Left arrow */}
          </button>
        )}

        {/* Cards Container with hidden scrollbar */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
          }}
        >
          {items.slice(0, 10).map((item, index) => {
            return (

              <div key={index}>

                <DisplayCard item={item}/>
              </div>
            );
          })}
        </div>

        {/* Right Scroll Button: Hide when at the rightmost position */}
        {!isAtEnd && (
          <button
            onClick={scrollRight}
            className="absolute mr-1 py-10 right-0 top-1/2 transform -translate-y-1/2 bg-green-300 hover:bg-green-400 text-black p-2 rounded-full shadow-lg"
          >
            &#9654; {/* Right arrow */}
          </button>
        )}

        {/* This below code hides the scrollbar */}
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </div>
    </div>
  );
};

export default CardRelay;
