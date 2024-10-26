import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "../service/weatherdata";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import "flatpickr/dist/flatpickr.css";

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

      const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
      const formattedToDate = moment(toDate).format("YYYY-MM-DD");

      const response = await fetchWeatherData(
        city,
        formattedFromDate,
        formattedToDate
      );
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

  return (
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="bg-orange-100 p-6 rounded-3xl text-center shadow-lg flex-1 mb-4 md:mb-0">
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
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center">
              {icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="weather icon"
                  className="w-18 h-18 ml-2"
                />
              )}
              <span className="text-6xl font-bold">{temperature}°</span>
            </div>
            <p className="text-lg text-gray-700">{description}</p>
            <p className="text-sm text-gray-500">{city}</p>
          </div>
        )}
        <div className="mt-6">
          <Flatpickr
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2"
            options={{ dateFormat: "Y-m-d", allowInput: true }}
            value={fromDate}
            onChange={(date) => setFromDate(date[0])}
            placeholder="From Date"
          />
          <Flatpickr
            className="w-full p-2 rounded-md border-2 border-gray-300 mb-2"
            options={{ dateFormat: "Y-m-d", allowInput: true }}
            value={toDate}
            onChange={(date) => setToDate(date[0])}
            placeholder="To Date"
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={getHistoricalWeatherData}
          >
            Get Historical Data
          </button>
        </div>
      </div>

      {historicalData && historicalData.length > 0 && (
        <div className="bg-orange-100 p-4 rounded-3xl  shadow-lg w-full md:w-80">
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
  );
};

export default WeatherCard;
