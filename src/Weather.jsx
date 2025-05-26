import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cityInput = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    try {
      const API_KEY = "bf909b4a90c47e810fc156dc73c0ed75";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
      setCity("");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-4 w-[90%] max-w-md">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={city}
            onChange={cityInput}
            onKeyDown={handleKeyDown}
            placeholder="Enter the city name"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {weather && (
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold">
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto"
            />
            <p className="text-xl capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-3xl font-semibold">{weather.main.temp}°C</p>
            <div className="description">{`Max Temperature: ${weather.main.temp_max}°C`}</div>
            <div className="description">{`Min Temperature: ${weather.main.temp_min}°C`}</div>
            <div className="description">{`Humidity: ${weather.main.humidity}%`}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
