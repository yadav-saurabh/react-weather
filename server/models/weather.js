const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    require: true,
    default: Date.now
  },
  humidity: {
    type: Number
  },
  iconId: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  windSpeed: {
    type: Number
  },
  condition: {
    type: Number
  },
  icon: {
    type: String
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  }
});

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
