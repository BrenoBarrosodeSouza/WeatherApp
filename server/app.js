const express = require('express');
const { Client } = require('pg');
const axios = require('axios');
const path = require('path');
const cors = require('cors');  // Import CORS middleware
const app = express();
const port = 3000;

// Configuring the database connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'WeatherDB',
  password: '123',
  port: 5432,
});

// Stablishing DB connection
client.connect();

// // Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS for cross-origin requests
app.use(cors());

// Fetching weather data from the meteo API
async function fetchWeatherData(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data from API:', error);
    throw new Error('Error fetching weather data from API');
  }
}

// Getting weather from database
app.get('/weatherData', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitude and longitude are required');
  }

  try {
    // Query the database to find existing weather data
    const query = `
      SELECT * FROM weather_data
      WHERE latitude = $1 AND longitude = $2
    `;
    const values = [latitude, longitude];
    
    const result = await client.query(query, values);
    
    if (result.rows.length === 0) {
      // If no data was found, we`re fetching it from the API and inserting it into the database
      console.log('No data found. Fetching from API...');
      const weatherData = await fetchWeatherData(latitude, longitude);

      const { latitude: lat, longitude: lon, hourly } = weatherData;
      const currentTemperature = hourly.temperature_2m[0]; // actual data example
      const currentWindSpeed = hourly.wind_speed_10m[0]; // actual data example

      await client.query(
        `INSERT INTO weather_data (latitude, longitude, current_temperature, current_wind_speed, hourly_temperature, hourly_wind_speed, hourly_humidity) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          lat,
          lon,
          currentTemperature,
          currentWindSpeed,
          JSON.stringify(hourly.temperature_2m),
          JSON.stringify(hourly.wind_speed_10m),
          JSON.stringify(hourly.relative_humidity_2m)
        ]
      );
      // Fetching the newly inserted data to return
      console.log('Data inserted. Fetching newly inserted data...');
      const newResult = await client.query(query, values);
      res.json(newResult.rows[0]); // return the first record found in the database
    } else {
      console.log('Data found in database. Returning data...');
      res.json(result.rows[0]); //***same/
    }
  } catch (error) {
    console.error('Error fetching weather data from database:', error);
    res.status(500).send('Error fetching weather data from database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
