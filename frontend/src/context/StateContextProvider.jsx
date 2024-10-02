import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [place, setPlace] = useState('Chittoor'); 
    const [thisLocation, setLocation] = useState('');

    // Fetch Lat and Lon from OpenWeatherMap Geocoding API
    const fetchLatLon = async () => {
        try {
            const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
                params: {
                    q: place, // Place can include city, state, country (e.g., 'Chittoor,AP,IN')
                    appid: import.meta.env.VITE_OPENWEATHERMAP_API_KEY, 
                    limit: 1 // Limit to 1 result
                },
            });

            // Extract lat and lon from response
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0]; // Get lat and lon from the first result
                console.log(`Coordinates for ${place}:`, lat, lon);
                return { lat, lon };
            } else {
                alert('Location not found.');
                return null;
            }
        } catch (e) {
            console.error('Error fetching coordinates:', e);
            alert('Error fetching coordinates. Please try again.');
            return null;
        }
    };

    // Fetch weather data from OpenWeatherMap using the latitude and longitude
    const fetchWeather = async (lat, lon) => {
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                lat: lat,    // Pass the latitude
                lon: lon,    // Pass the longitude
                units: 'metric',
                appid: import.meta.env.VITE_OPENWEATHERMAP_API_KEY, 
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setLocation(response.data.name); // Set location name from the weather API response

            // Set current weather
            setWeather({
                temp: response.data.main.temp,
                humidity: response.data.main.humidity,
                icon: response.data.weather[0].icon,
                description: response.data.weather[0].description,
                wind: response.data.wind.speed,
                heatindex: response.data.main.feels_like, // heat index (feels like temp)
            });
        } catch (e) {
            console.error(e);
            alert('Error fetching weather data. Please try again.');
        }
    };

    useEffect(() => {
        const getWeather = async () => {
            const coords = await fetchLatLon(); // Get lat and lon
            if (coords) {
                fetchWeather(coords.lat, coords.lon); // Pass lat/lon to weather API
            }
        };

        getWeather();
    }, [place]);

    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            forecast,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
