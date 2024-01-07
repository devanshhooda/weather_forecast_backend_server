const express = require('express');
const router = express.Router();
const Location = require('../models/location');
const axios = require('axios');
require('dotenv').config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Create a new location endpoint
router.post('/locations', async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all locations endpoint
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a location endpoint
router.delete('/locations/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather data for a location
router.get('/locations/:id/weather', async (req, res) => {
  try {
    const days = 4;
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }

    console.log(`location data: ${location}`);
    const weatherApiEndpoint =
      `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location.latitude},${location.longitude}&days=${days}&api=no&alerts=no`;

    console.log(weatherApiEndpoint);

    const weatherResponse = await axios.get(weatherApiEndpoint);

    // Extract relevant data from the weather API response
    const weatherData = weatherResponse.data.forecast.forecastday.map((day) => ({
      dayOfWeek: Date(day.date).toString().split(" ")[0],
      todayMarker: day.date === weatherResponse.data.forecast.forecastday[0].date,
      date: day.date,
      temperature: day.day.avgtemp_c,
      description: day.day.condition.text,
    }));

    console.log(`weatherData: ${weatherData}`);

    res.status(200).json({ data: weatherData });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Forbidden" });
  }
});

module.exports = router;
