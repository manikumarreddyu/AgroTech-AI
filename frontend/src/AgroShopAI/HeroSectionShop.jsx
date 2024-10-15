import { useEffect, useState } from "react";

const HeroSectionShop = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlay) {
        slideRight();
      }
    }, 3000); // Increased stay time to 6000ms (6 seconds)
    return () => clearInterval(interval);
  }, [current, autoPlay]);

  const slideRight = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="flex w-full h-[70vh] overflow-hidden relative" // Set height to 60% of viewport height
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <div
        className="flex w-full h-full"
        style={{ transform: `translateX(-${current * 100}%)`, transition: "transform 0.2s ease" }} // Increased shift speed to 0.2s
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img className="w-full h-full object-cover shadow-lg" src={image.image} alt={image.title} />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center ">
                <div className="ml-20">

              <h3 className="text-gray-300 text-l text-left font-serif display-block">{image.title}</h3>
              {/* <h2 className="text-white text-3xl text-left font-sans font-normal font-semibold" dangerouslySetInnerHTML={{__html : image.tag}}></h2> */}
              <img className="w-1/3 mt-2 display-block" src={image.tag} alt="" />
                <button className="border-2 border-white text-white mt-10 hover:text-white transition duration-300 rounded-md py-2 px-4 text-xl text-left inline-block hover:bg-gradient-to-r from-green-400 to-green-600 shadow-[rgba(0,0,0,0.35)_0_5px_15px]">Shop Now!</button>
                <img className="inline-block ml-5 mb-5" style={{width: '100px'}} src={"/shop-asset/sale.png"} alt="" />
                </div>
            </div>
          </div>
        ))}
      </div>
      {/* Left button: visible only when not on the first image */}
      {current > 0 && (
        <div
          className="absolute text-4xl top-1/2 -translate-y-1/2 bg-gray-300 flex justify-center items-center w-8 h-8 rounded-full cursor-pointer left-4"
          onClick={slideLeft}
        >
          <p className="mb-1">&lsaquo;</p>
        </div>
      )}
      {/* Right button: visible only when not on the last image */}
      {current < images.length - 1 && (
        <div
          className="absolute text-4xl top-1/2 -translate-y-1/2 bg-gray-300 flex justify-center items-center w-8 h-8 rounded-full cursor-pointer right-4"
          onClick={slideRight}
        >
          <p className="mb-1">&rsaquo;</p>
        </div>
      )}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 w-2.5 rounded-full ${
              index === current ? "bg-green-500" : "bg-gray-200"
            } cursor-pointer hover:scale-125 transition-transform`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSectionShop;
