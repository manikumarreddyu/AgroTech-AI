import React, { useRef, useState, useEffect } from 'react';

const CardRelay = ({ items }) => {
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
      <div className="top-heading flex justify-between items-center bg-green-100 border-b-2 border-green-600">
        <h1 className="font-bold py-1 ml-8 text-2xl text-black">Top Selling</h1>
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
            const savings = item.mrp - item.salePrice; // Calculate savings
            return (
              <div
                key={index}
                className="flex-shrink-0 w-60 h-80 bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer relative"
              >
                <div className="w-full h-48">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-fill" // Use object-cover to fill the container
                  />
                  {/* Offer Tag */}
                  {item.offer && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-l-full z-10">
                      {item.offer}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-s font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-gray-400 text-xs">{item.brand}</span>
                  <div className="flex items-center">
                    <p className="text-black text-m display-inline mr-2">₹{item.salePrice}</p>
                    <p className="text-gray-400 text-m display-inline line-through">₹{item.mrp}</p>
                  </div>
                  <p className="text-green-600 text-xs font-bold">You Save: ₹{savings.toFixed(2)}</p>
                </div>
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
