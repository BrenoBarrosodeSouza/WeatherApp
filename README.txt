# Weather Data Application

This project provides a web application that allows users to fetch weather data based on latitude and longitude. The data is retrieved from an external weather API, stored in a PostgreSQL database, and displayed on a web page.

## Project Structure

- `index.html`: The main HTML file for the application.
- `script.js`: JavaScript file for handling form submissions and displaying weather data.
- `styles.css`: CSS file for styling the web page.
- `app.js`: Node.js script using Express.js for the server and PostgreSQL for the database.

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (version 14 or later)
2. [PostgreSQL](https://www.postgresql.org/) (latest version)

### Setting Up the Database

1. Create a PostgreSQL database named `WeatherDB`.

2. Create a table in the database using the following SQL command:

   ```sql
   CREATE TABLE weather_data (
     id SERIAL PRIMARY KEY,
     latitude FLOAT NOT NULL,
     longitude FLOAT NOT NULL,
     current_temperature FLOAT,
     current_wind_speed FLOAT,
     hourly_temperature JSON,
     hourly_wind_speed JSON,
     hourly_humidity JSON,
     timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
   );
3.Cloning the Repository
git clone https://github.com/yourusername/weather-data-application.git
cd weather-data-application
4. Install Dependencies
npm install
5.node app.js
The server will start on http://localhost:3000.
6.Open the Web Application
Open index.html in a web browser. You should be able to enter latitude and longitude, submit the form, and view weather data.
7. Here are some latitude and longitude examples for testing:

New York City, USA
Latitude: 40.7128
Longitude: -74.0060

London, United Kingdom
Latitude: 51.5074
Longitude: -0.1278
Tokyo, Japan

Latitude: 35.6828
Longitude: 139.7590
Paris, France

Latitude: 48.8566
Longitude: 2.3522
Beijing, China

