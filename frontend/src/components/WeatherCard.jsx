import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "../service/weatherdata";

const WeatherCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [icon, setIcon] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [historicalData, setHistoricalData] = useState([]);

  const allowedLocations = [
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ];

  useEffect(() => {
    const getWeatherData = async (selectedCity) => {
      try {
        setLoading(true);
        const data = await fetchWeatherData(selectedCity);
        setCity(data.city);
        setTemperature(data.temperature);
        setDescription(data.description);
        setIcon(data.icon);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    getWeatherData(city);
  }, [city]);

  const getHistoricalWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchWeatherData(city, fromDate, toDate);
      setHistoricalData(response);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch historical weather data");
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-orange-100 p-6 rounded-3xl w-80 text-center shadow-lg">
        <div className="mb-4">
          <select
            className="w-full p-2 rounded-md border-2 border-gray-300 bg-gray-300"
            value={city}
            onChange={handleCityChange}
          >
            {allowedLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center">
              {icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="weather icon"
                  className="w-12 h-12 ml-2"
                />
              )}
              <span className="text-6xl font-bold">{temperature}°</span>
            </div>
            <p className="text-lg text-gray-700">{description}</p>
            <p className="text-sm text-gray-500">{city}</p>
          </div>
        )}

        {/* <div className="mt-6">
          <input
            type="date"
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2"
            value={fromDate}
            onChange={handleFromDateChange}
            placeholder="From"
          />
          <input
            type="date"
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2"
            value={toDate}
            onChange={handleToDateChange}
            placeholder="To"
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={getHistoricalWeatherData}
          >
            Get Historical Data
          </button>
        </div> */}
        <div className="mt-6">
          <input
            type="date"
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2 bg-gray-300 text-gray-700"
            value={fromDate}
            onChange={handleFromDateChange}
            placeholder="From"
          />
          <input
            type="date"
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2 bg-gray-300 text-gray-700"
            value={toDate}
            onChange={handleToDateChange}
            placeholder="To"
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={getHistoricalWeatherData}
          >
            Get Historical Data
          </button>
        </div>

        {historicalData && historicalData.length > 0 && (
          <div className="mt-4 relative bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
              onClick={() => setHistoricalData([])}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-2">Historical Data</h3>
            <div className="overflow-y-auto max-h-64">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Date</th>
                    <th className="border-b p-2">Temp (°C)</th>
                    <th className="border-b p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((data, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{data.timestamp}</td>
                      <td className="border-b p-2">{data.temperature}</td>
                      <td className="border-b p-2">{data.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
