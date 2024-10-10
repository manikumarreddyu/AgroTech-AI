import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import search from '../assets/icons/search.svg';
import summerGif from '../assets/summer-4134.gif'; // Summer GIF
import rainGif from '../assets/rain-4431.gif'; // Rain GIF
import { useStateContext } from '../context/StateContextProvider';
import { BackgroundLayout, WeatherCard, MiniCard } from '../components/weather';

function Forecast() {
  const [input, setInput] = useState('');
  const { weather, thisLocation, values, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput('');
  };

  // Choose the appropriate GIF based on humidity
  const weatherGif = weather.humidity > 70 ? rainGif : summerGif;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background GIF */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${weatherGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 bg-black bg-opacity-50">
        <nav className="w-full p-3 flex flex-col md:flex-row justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold tracking-wide text-white text-3xl sm:text-4xl mt-20"
          >
            Forecast
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg w-[18rem] border border-white overflow-hidden shadow-2xl rounded-full flex items-center p-2 gap-2 mt-10 sm:mt-12"
          >
            <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
            <input
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  submitCity();
                }
              }}
              type="text"
              placeholder="Search city"
              className="focus:outline-none w-full bg-transparent text-white text-lg placeholder-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </motion.div>
        </nav>

        <main className="w-full flex flex-wrap gap-8 py-4 px-[5%] text-white items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherCard
              place={thisLocation}
              windspeed={weather.wspd}
              humidity={weather.humidity}
              temperature={weather.temp}
              heatIndex={weather.heatindex}
              iconString={weather.conditions}
              conditions={weather.conditions}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-4 flex-wrap w-full md:w-[60%]"
          >
            {values?.slice(1, 7).map((curr, index) => (
              <motion.div
                key={curr.datetime}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MiniCard
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Forecast;
