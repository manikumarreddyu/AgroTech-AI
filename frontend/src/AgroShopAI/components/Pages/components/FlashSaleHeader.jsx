
import React from "react";

export default function FlashSaleHeader({ timeLeft }) {
  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div className="bg-gradient-to-r from-red-500 to-yellow-500 shadow-lg rounded-lg p-8 mb-8 text-white">
      <h2 className="text-3xl font-extrabold text-center text-white mb-4 animate-pulse">
        🕒 Flash Sale Ends In:
      </h2>
      <div className="text-6xl font-extrabold text-center tracking-wider flex items-center justify-center gap-2">
        <span className="bg-white text-red-600 p-4 rounded-md shadow-lg animate-bounce">
          {formatTime(timeLeft.hours)}
        </span>
        <span className="text-4xl">:</span>
        <span className="bg-white text-red-600 p-4 rounded-md shadow-lg animate-bounce">
          {formatTime(timeLeft.minutes)}
        </span>
        <span className="text-4xl">:</span>
        <span className="bg-white text-red-600 p-4 rounded-md shadow-lg animate-bounce">
          {formatTime(timeLeft.seconds)}
        </span>
      </div>
      <p className="text-center text-lg mt-4 font-semibold animate-pulse">
        Hurry up! Amazing deals await!
      </p>
    </div>
  );
}
