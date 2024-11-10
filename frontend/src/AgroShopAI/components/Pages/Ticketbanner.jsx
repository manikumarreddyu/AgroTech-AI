import React from "react";

const HeaderBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-6 px-4 shadow-lg overflow-hidden mb-5">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold animate__animated animate__fadeIn animate__delay-1s">Welcome to Support Center</h1>
        <p className="mt-2 text-lg animate__animated animate__fadeIn animate__delay-2s">
          We're here to help you. Submit your tickets and get fast support!
        </p>
        <div className="mt-4 animate__animated animate__fadeIn animate__delay-3s">
          <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transform hover:scale-105 transition-all">
            Get Help Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderBanner;
