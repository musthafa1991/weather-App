const axios = require("axios");
const moment = require("moment");
const WeatherModel = require("../models/wheatherDataModel");
const wheatherFromDb = async (req, res) => {
  const { city, from, to } = req.query;

  // Validate date range
  if (from && to) {
    const fromDate = moment(from);
    const toDate = moment(to);
    if (!fromDate.isValid() || !toDate.isValid()) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    if (toDate.diff(fromDate, "days") > 30) {
      return res
        .status(202)
        .json({ message: "Date range should not exceed 30 days" });
    }
  }

  // Build the query
  const query = {};
  if (city) {
    query.city = city;
  }
  if (from) {
    query.timestamp = { ...query.timestamp, $gte: new Date(from) };
  }
  if (to) {
    query.timestamp = { ...query.timestamp, $lte: new Date(to) };
  }
  try {
    const weatherData = await WeatherModel.find(query);
    res.json(weatherData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

const wheatherFromApi = async (req, res) => {
  const { city } = req.body;
  const allowedLocations = [
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ];

  // Validate city
  if (!allowedLocations.includes(city)) {
    return res.status(400).json({ message: "Invalid city selected." });
  }
  try {
    const response = await axios.get(
      `${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const { main, weather } = response.data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = weather[0].icon;

    // Store data in MongoDB
    const weatherData = new WeatherModel({
      city,
      temperature,
      description,
      icon,
    });

    await weatherData.save();

    res.json({ city, temperature, description, icon });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch weather data", error: error.message });
  }
};

module.exports = { wheatherFromDb, wheatherFromApi };
