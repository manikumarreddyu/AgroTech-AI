import React, { useEffect, useState } from 'react'
import bgHero from '../assets/bgHero.png'
import {
  WiHumidity,
  WiBarometer,
  WiStrongWind,
  WiThermometer,
  WiSunrise,
  WiSunset,
  WiCloudyGusts
} from 'react-icons/wi'

// API key
const API_key = 'af0348ed3ad216d028627277b50db13f'

// Utility functions
const fetchData = async URL => {
  const response = await fetch(`${URL}&appid=${API_key}`)
  return response.json()
}

const url = {
  currentWeather: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
  airPollution: (lat, lon) =>
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`,
  forecast: (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`,
  geo: query => `https://api.openweathermap.org/data/2.5/weather?q=${query}`,
  geoSuggestions: query =>
    `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like`
}

// Helper functions
const getDate = (dateUnix, timezone) => {
  const date = new Date((dateUnix + timezone) * 1000)
  return date.toLocaleDateString()
}

const getTime = (timeUnix, timezone) => {
  const date = new Date((timeUnix + timezone) * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const Climate = () => {
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])
  const [currentWeather, setCurrentWeather] = useState([])
  const [airQualityIndex, setAirQualityIndex] = useState(null)
  const [error, setError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    setLoading(true)
    setError(false)
    try {
      const currentWeather = await fetchData(url.currentWeather(lat, lon))
      const airPollution = await fetchData(url.airPollution(lat, lon))
      const forecast = await fetchData(url.forecast(lat, lon))

      setWeatherData(currentWeather)
      setAirQualityIndex(airPollution.list[0].main.aqi)

      // Get the current time and calculate the cutoff time for the next 24 hours
      const now = new Date()
      const cutoffTime = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now

      // Filter forecast for the next 24 hours (every 3-hour interval)
      const next24HoursForecast = forecast.list.filter(entry => {
        const entryDate = new Date(entry.dt * 1000)
        return entryDate >= now && entryDate <= cutoffTime // Check if entry is within the next 24 hours
      })

      setCurrentWeather(next24HoursForecast)

      // Set the daily forecast (for the next 5 days)
      setForecastData(forecast.list.filter((_, index) => index % 8 === 0)) // One data point per day
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = async e => {
    e.preventDefault()
    const locations = await fetchData(url.geo(searchTerm))
    if (locations) {
      const { lat, lon } = locations.coord
      fetchWeatherData(lat, lon)
    }
  }

  // Handle current location
  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(position => {
      fetchWeatherData(position.coords.latitude, position.coords.longitude)
    })
  }

  // Fetch weather for the user's current location on component mount
  useEffect(() => {
    getCurrentLocationWeather()
  }, [])

  return (
    <div
      className='min-h-screen flex flex-col items-center bg-white p-5 mt-16 w-full'
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <div className='flex justify-end w-full mb-4'>
        <form
          onSubmit={handleSearch}
          className='flex w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden '
        >
          <input
            type='text'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full transition duration-300 ease-in-out'
            placeholder='Search for a location'
          />
          <button
            type='submit'
            className='p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-r-lg hover:bg-green-700 shadow-md'
          >
            Search
          </button>
        </form>
      </div>

      {loading && <p className='text-green-800'>Loading...</p>}
      {error && (
        <p className='text-red-500'>Error fetching data. Please try again.</p>
      )}

      {weatherData && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl text-gray-900'>
          {/* Left Section - Current Weather and 5-Day Forecast */}
          <div
            className='p-5 rounded-md shadow-md hover:shadow-lg bg-gradient-to-r from-green-500 to-green-700 rounded-lg'
            style={{
              background:
                'linear-gradient(to bottom right, #e0f2f1, #b2dfdb, #4db6ac)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
              borderRadius: '50px'
            }}
          >
            <h2 className='text-2xl font-bold text-center'>
              {weatherData.name}
            </h2>
            <div className='flex flex-col items-center'>
              {/* Current Weather Icon */}
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className='w-24 h-24 mb-2'
              />
              <p className='text-6xl font-semibold'>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </p>
              <p className='text-lg text-gray-600'>
                {weatherData.weather[0].description}
              </p>
            </div>
            <h3 className='text-xl mt-4 font-semibold'>5-Day Forecast</h3>
            <ul className='mt-2'>
              {forecastData.map((forecast, index) => (
                <li
                  key={index}
                  className='flex items-center justify-between py-2 border-b border-gray-200 transition-transform duration-300 hover:scale-105'
                >
                  <div className='flex items-center'>
                    {/* Weather Icon for Each Day */}
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} // Use forecast-specific weather icon
                      alt={forecast.weather[0].description}
                      className='w-12 h-12 mr-2' // Adjust the size of the icon
                    />
                    <span>{getDate(forecast.dt, weatherData.timezone)}</span>
                  </div>
                  <span>{Math.round(forecast.main.temp - 273.15)}°C</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Current Weather Details */}
          <div
            className='p-5 rounded-md shadow-md hover:shadow-lg duration-300 bg-transparent grid grid-cols-1 md:grid-cols-2 gap-4 w-full'
            style={{
              background:
                'linear-gradient(to bottom right, #e0f2f1, #b2dfdb, #4db6ac)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
              borderRadius: '50px'
            }}
          >
            <h3 className='col-span-2 text-center text-2xl font-semibold mb-4'>
              Current Conditions
            </h3>

            {/* First Row: Air Quality Index & Sunrise/Sunset */}
            <div className='grid grid-cols-2 md:grid-cols-2 gap-4 col-span-2'>
              {/* Air Quality Index Box */}
              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiCloudyGusts className='w-12 h-12 mb-2 text-gray-600' />
                <p className='text-lg font-semibold'>Air Quality Index</p>
                <p className='mt-2'>{airQualityIndex}</p>
              </div>

              {/* Sunrise/Sunset Box */}
              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiSunrise className='w-12 h-12 mb-2 text-yellow-500' />
                <p className='text-lg font-semibold'>Sunrise</p>
                <p>{getTime(weatherData.sys.sunrise, weatherData.timezone)}</p>
                <p className='mt-2 text-lg font-semibold'>Sunset</p>
                <p>{getTime(weatherData.sys.sunset, weatherData.timezone)}</p>
              </div>
            </div>

            {/* Second Row: Humidity, Wind Speed, and Pressure */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 col-span-2'>
              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiHumidity className='w-12 h-12 mb-2 text-blue-500' />
                <p className='text-lg font-semibold'>Humidity</p>
                <p>{weatherData.main.humidity}%</p>
              </div>

              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiThermometer className='w-12 h-12 mb-2 text-red-500' />
                <p className='text-lg font-semibold'>Temperature</p>
                <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
              </div>

              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiStrongWind className='w-12 h-12 mb-2 text-green-500' />
                <p className='text-lg font-semibold'>Wind Speed</p>
                <p>{Math.round(weatherData.wind.speed * 3.6)} km/h</p>
              </div>

              <div className='flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-105'>
                <WiBarometer className='w-12 h-12 mb-2 text-gray-600' />
                <p className='text-lg font-semibold'>Pressure</p>
                <p>{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display hourly forecast for the next 24 hours */}
      {currentWeather.length > 0 && (
        <div className='mt-8 w-full max-w-6xl'>
          <h3 className='text-xl font-semibold text-center m-6'>
            Hourly Forecast
          </h3>
          <ul className='mt-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {currentWeather.map((entry, index) => (
              <li
                key={index}
                className='p-4 rounded-md shadow-md bg-white border border-gray-300 transition-transform duration-200 hover:scale-105'
              >
                <p className='font-semibold'>
                  {getTime(entry.dt, weatherData.timezone)}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  alt={entry.weather[0].description}
                  className='w-16 h-16 my-2'
                />
                <p>{Math.round(entry.main.temp - 273.15)}°C</p>
                <p>{entry.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Climate
