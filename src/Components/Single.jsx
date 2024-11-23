"use client";
import { assets } from "@/assets/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import { Moon, Search, Sun, Wind, Droplets, Sunrise, Sunset, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import './Single.css';  // Add the spinner CSS in this file

export default function EnhancedWeatherForecast() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);  // Loading state
  const [dateTime, setDateTime] = useState("");   // Date and time state
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // Function to fetch weather based on a city
  const fetchWeather = async (city) => {
    setLoading(true);  // Start loading
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Fetch Bengaluru weather initially when the component mounts
  useEffect(() => {
    fetchWeather("Bengaluru");
    updateDateTime(); // Initialize date and time
    const intervalId = setInterval(updateDateTime, 1000); // Update date and time every second
    return () => clearInterval(intervalId);  // Cleanup interval on unmount
  }, []);

  // Function to handle time formatting and updating
  const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);
    const formattedTime = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    setDateTime(`${formattedDate} ${formattedTime}`);
  };

  // Handle search and fetch weather for the searched city
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetchWeather(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      fetchWeather(searchQuery);
    }
  };

  // Function to determine which image to display based on weather conditions
  const getWeatherImage = () => {
    if (!weatherData) return null;

    const description = weatherData.weather[0].description.toLowerCase();
    const isNight = weatherData.sys.sunset * 1000 < Date.now(); // Check if it's night

    if (description.includes("cloud")) {
      return assets.cloude; // Cloud image for cloudy weather
    } else if (description.includes("rain")) {
      return assets.raining; // Rain image for rainy weather
    } else if (isNight) {
      return assets.night; // Night image for night time
    } else {
      return assets.cloude; // Default image for clear weather
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="weather-forecast">
        <div className="container">
          <div className="top-section">
            <div className="search-container">
              <Input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`search-input${darkMode ? "d" : ""}`}
                onKeyPress={handleKeyPress}
              />
              <Search className={`search-icon${darkMode ? "d" : ""}`} onClick={handleSearch} />
            </div>
            
            {/* Date and Time display */}
            <div className="date-time">
              {dateTime} {/* This will display current date and time */}
            </div>

            <div className="dark-mode-toggle">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="dark-mode-switch"
              />
              {darkMode ? <Moon className="icon" /> : <Sun className="icon" />}
            </div>
          </div>

          {/* Display loading spinner when loading */}
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>  {/* Spinner element */}
            </div>
          ) : (
            weatherData && (
              <div>
                <div className="main-weather">
                  <h2 className="location">{weatherData.name}</h2>
                  <div className="weather-details">
                    <div className="temperature-info">
                      <p className="temperature">{weatherData.main.temp}°C</p>
                      <p className="condition">{weatherData.weather[0].description}</p>
                    </div>
                    <div className="weather-icon">
                      <img
                        src={getWeatherImage()}  // Use the function to get the correct weather image
                        alt="Weather condition"
                        className="weather-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="weather-stats">
                  <WeatherCard title="Wind Speed" value={`${weatherData.wind.speed} m/s`} icon={<Wind />} />
                  <WeatherCard title="Humidity" value={`${weatherData.main.humidity}%`} icon={<Droplets />} />
                  <WeatherCard title="Sunrise" value={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} icon={<Sunrise />} />
                  <WeatherCard title="Sunset" value={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} icon={<Sunset />} />
                  <WeatherCard title="Visibility" value={`${weatherData.visibility / 1000} km`} icon={<Eye />} />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
function WeatherCard({ title, value, icon }) {
  return (
    <div className="weather-card">
      <div className="card-header">
        {icon}
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-value">{value}</p>
    </div>
  );
}
