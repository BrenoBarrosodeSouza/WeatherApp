document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get the latitude and longitude values from the input fields
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    
    if (latitude && longitude) {
        try {
            const response = await fetch(`http://localhost:3000/weatherData?latitude=${latitude}&longitude=${longitude}`);
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           
            const responseText = await response.text();
            console.log('Raw response text:', responseText);

            // Parsing response as json
            const data = JSON.parse(responseText);

            //Verifying if data provided is valid
            if (!data || !data.current_temperature || !data.current_wind_speed) {
                throw new Error('Invalid data received from the server');
            }

            // Extract the current temperature and wind speed from the data
            const temperature = data.current_temperature;
            const windSpeed = data.current_wind_speed;

            document.getElementById('weatherData').innerHTML = `
                <p>Current Temperature: ${temperature}°C</p>
                <p>Current Wind Speed: ${windSpeed} km/h</p>
            `;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('weatherData').textContent = 'Error fetching weather data';
        }
    } else {
        alert('Please enter both latitude and longitude.');
    }
});
