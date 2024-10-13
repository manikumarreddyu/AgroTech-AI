import React, { useState, useEffect } from 'react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

const testimonialsData = {
  title: "⭐ What Our Users Say ⭐",
  users: [
    {
      quote: "AgroTech AI platform has transformed my farming operations! With its accurate ML models, I can make informed decisions about crop management, leading to increased yields.",
      author: "Ravi Kiran, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    },
    {
      quote: "I've been using AgroTech AI platform for my farm, and I'm amazed by its efficiency. It provides precise predictions that help me optimize resource usage and reduce costs.",
      author: "Yash Goyal, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    },
    {
      quote: "Thanks to AgroTech AI platform, I've been able to enhance my crop yield significantly. Its easy-to-use interface and reliable models make farming much more manageable.",
      author: "Manoj Kumar, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    },
    {
      quote: "AgroTech AI platform has streamlined our farming processes. The consistent and scalable models ensure that we are always making data-driven decisions, boosting our productivity.",
      author: "Surya Teja, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    },
    {
      quote: "I can't imagine managing my farm without AgroTech AI platform. Its simplicity and powerful predictions have enabled me to improve my farming practices and deliver better produce.",
      author: "Sivaram, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    },
    {
      quote: "AgroTech AI platform has made collaboration with my team more efficient. Its accurate and reliable predictions help us plan our farming activities better, leading to improved outcomes.",
      author: "Bharath, Farmer",
      image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
    }
  ]
};

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      setSlidesToShow(window.innerWidth < 768 ? 1 : 1);
    };

    window.addEventListener('resize', updateSlidesToShow);
    updateSlidesToShow();

    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonialsData.users.length);
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [slidesToShow, isHovered, testimonialsData.users.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonialsData.users.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slidesToShow + testimonialsData.users.length) % testimonialsData.users.length);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 text-center mb-10">{testimonialsData.title}</h2>
        <div className="testimonial-slider-container flex items-center justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button
            className="prev-arrow text-3xl text-green-600 hover:text-green-800 transition-transform duration-300"
            onClick={goToPrevious}
          >
            <BiChevronLeft />
          </button>
          <div className="flex overflow-hidden max-w-full">
            {testimonialsData.users.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
              <div
                key={index}
                className="testimonial mx-4 p-6 md:p-10 rounded-lg shadow-lg transition-transform duration-300 transform hover:shadow-2xl hover:scale-105"
                style={{
                  background: 'linear-gradient(180deg, rgba(228, 240, 229, 1) 0%, rgba(255, 255, 255, 1) 100%)', // Light green gradient
                  border: '1px solid rgba(207, 230, 207, 0.5)', // Light green border
                }}
              >
                <div className="flex justify-center">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.author}'s picture`}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 border-2 border-green-400 transition-all duration-300 transform hover:scale-105"
                  />
                </div>
                <p className="text-lg md:text-xl italic mb-4 text-center text-green-800">{testimonial.quote}</p>
                <h4 className="text-base md:text-lg text-green-600 font-semibold text-center">- {testimonial.author}</h4>
              </div>
            ))}
          </div>
          <button
            className="next-arrow text-3xl text-green-600 hover:text-green-800 transition-transform duration-300"
            onClick={goToNext}
          >
            <BiChevronRight />
          </button>
        </div>
        <div className="dots flex justify-center mt-4">
          {testimonialsData.users.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full border border-green-600 cursor-pointer ${index === currentIndex ? 'bg-green-600' : 'bg-white'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>

  );
};

export default TestimonialSlider;
