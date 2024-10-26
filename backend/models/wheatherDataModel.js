const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  icon: String,
  timestamp: { type: Date, default: Date.now },
});

const WeatherModel = mongoose.model("Weather", weatherSchema);

module.exports = WeatherModel;
