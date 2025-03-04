const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const weatherContainer = document.getElementById('weather-container');

// Default city
const defaultCity = 'New York';

// Function to fetch weather data from wttr.in
async function getWeather(city) {
    const url = `https://wttr.in/${city}?format=%C+%t+%w+%h`;

    try {
        const response = await fetch(url);
        const data = await response.text();

        // Parse the returned weather data
        const weatherDetails = data.split(' ');

        if (weatherDetails.length === 4) {
            const weatherCondition = weatherDetails[0];
            const temperature = parseInt(weatherDetails[1]);

            // Set the background and icon based on temperature
            setBackgroundAndIcon(weatherCondition, temperature);
            displayWeather(weatherDetails, city);
        } else {
            weatherInfo.innerHTML = <p>City not found. Please try again.</p>;
        }
    } catch (error) {
        weatherInfo.innerHTML = <p>Error fetching weather data. Please try again later.</p>;
    }
}

// Function to set the background color based on temperature
function setBackgroundAndIcon(weatherCondition, temperature) {
    if (temperature > 25) {
        weatherContainer.classList.add('hot');
        weatherContainer.classList.remove('cold', 'moderate');
    } else if (temperature < 15) {
        weatherContainer.classList.add('cold');
        weatherContainer.classList.remove('hot', 'moderate');
    } else {
        weatherContainer.classList.add('moderate');
        weatherContainer.classList.remove('cold', 'hot');
    }

    // Set icons and background based on weather condition
    if (weatherCondition.toLowerCase().includes('clear')) {
        weatherContainer.classList.add('sunny');
        weatherContainer.classList.remove('rainy', 'cloudy');
    } else if (weatherCondition.toLowerCase().includes('rain')) {
        weatherContainer.classList.add('rainy');
        weatherContainer.classList.remove('sunny', 'cloudy');
    } else if (weatherCondition.toLowerCase().includes('cloud')) {
        weatherContainer.classList.add('cloudy');
        weatherContainer.classList.remove('sunny', 'rainy');
    } else {
        weatherContainer.classList.remove('sunny', 'rainy', 'cloudy');
    }
}

// Function to display weather data
function displayWeather(weatherDetails, city) {
    const weatherHTML = `
        <h2>${city}</h2>
        <p>Condition: ${weatherDetails[0]}</p>
        <p>Temperature: ${weatherDetails[1]}</p>
        <p>Wind: ${weatherDetails[2]}</p>
        <p>Humidity: ${weatherDetails[3]}</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value || defaultCity;
    getWeather(city);
});

// Load default weather on page load
window.onload = () => {
    getWeather(defaultCity);
};
