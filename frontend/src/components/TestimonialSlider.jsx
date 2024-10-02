import { useState, useEffect } from 'react';
import bgHero from '../assets/bgHero.png';
import { BiChevronRight } from 'react-icons/bi';
import { BiChevronLeft } from 'react-icons/bi';

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
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
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
      }, 2000); // Change slide every 2 seconds
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

    <section className=""style={{ backgroundImage: `url(${bgHero})`}}>
      <div  className="max-w-7xl pb-10 pt-5 mx-auto px-1   sm:px-2 lg:px-8 " >
        <div
          className="testimonial-slider-container w-full flex flex-col text-center py-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="text-xl md:text-4x sm:text-2xl lg:text-4xl text-green-500 font-extrabold mb-8">{testimonialsData.title}</h2>
          <div className="testimonial-slider flex items-center justify-center w-full my-auto mx-auto ">
            <button
              className="prev-arrow text-3xl cursor-pointer transform  hover:scale-125 transition-transform duration-300 mx-1 md:mx-4 lg:mx-6 text-green-500"
              onClick={goToPrevious}
            >
            <BiChevronLeft /> 
            </button>
            <div className="flex overflow-hidden max-w-full">
              {testimonialsData.users.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial mx-2 p-6 md:p-10 rounded-lg drop-shadow-xl border border-green-700   flex flex-col items-center justify-center min-w-[260px] md:min-w-[350px] lg:min-w-[400px] transition-transform transform hover:scale-110"
                >
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.author}'s picture`}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-6 border  border-green-400 "
                  />
                  <p className="text-lg md:text-2xl italic mb-4 text-center">{testimonial.quote}</p>
                  <h4 className="text-base md:text-xl text-green-500 font-semibold text-center">- {testimonial.author}</h4>
                </div>
              ))}
            </div>
            <button
              className="next-arrow text-3xl cursor-pointer transform hover:scale-125 transition-transform duration-300 mx-2 md:mx-4 lg:mx-6 text-green-500"
              onClick={goToNext}
            >
              <BiChevronRight />
            </button>
          </div>
          <div className="dots flex justify-center mt-4">
            {testimonialsData.users.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 mx-1 rounded-full border border-green-700 cursor-pointer ${index === currentIndex ? 'bg-green-600' : 'bg-white'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
