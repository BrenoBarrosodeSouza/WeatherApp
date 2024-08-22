document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    if (latitude && longitude) {
        try {
            const response = await fetch(`http://localhost:3000/weatherData?latitude=${latitude}&longitude=${longitude}`);
            
            console.log('Response status:', response.status);
            
            // Verifique se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Verifique o conteúdo bruto da resposta
            const responseText = await response.text();
            console.log('Raw response text:', responseText);

            // Tente parsear a resposta como JSON
            const data = JSON.parse(responseText);

            // Verifique se os dados estão válidos
            if (!data || !data.current_temperature || !data.current_wind_speed) {
                throw new Error('Invalid data received from the server');
            }

            // Extraia apenas os valores de temperatura e velocidade do vento
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
