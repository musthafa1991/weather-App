const axios = require("axios");
const moment = require("moment");
const WeatherModel = require("../models/weatherDataModel");

const parseDate = (dateString) => {
  const formats = [
    moment.ISO_8601,
    "YYYY-MM-DD",
    "DD/MM/YYYY",
    "DD-MM-YYYY",
    "YYYY/MM/DD",
    "MM-DD-YYYY",
    "MM/DD/YYYY",
  ];

  for (const format of formats) {
    const date = moment(dateString, format, true);
    if (date.isValid()) {
      return date.toDate();
    }
  }

  throw new Error(
    "Invalid date format. Please use ISO 8601 format or supported formats (YYYY-MM-DD, MM-DD-YYYY)."
  );
};

const weatherFromDb = async (req, res) => {
  const { city, from, to } = req.query;

  try {
    if (from && to) {
      const fromDate = parseDate(from);
      const toDate = parseDate(to);

      if (moment(toDate).diff(moment(fromDate), "days") > 30) {
        return res
          .status(202)
          .json({ message: "Date range should not exceed 30 days" });
      }
    }

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

    const weatherData = await WeatherModel.find(query);
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
};

const weatherFromApi = async (req, res) => {
  const { city } = req.body;
  const allowedLocations = [
    "Delhi",
    "Moscow",
    "Paris",
    "New York",
    "Sydney",
    "Riyadh",
  ];

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
    console.error("Error fetching weather data from API:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch weather data", error: error.message });
  }
};

module.exports = { weatherFromDb, weatherFromApi };
