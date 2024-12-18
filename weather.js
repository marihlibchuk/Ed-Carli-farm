const apiKey = '4308369f510f40d7965140118242711'; 
const city = 'Edinburgh'; 

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather').textContent = 'Error fetching weather data.';
        console.error(error);
    }
}

function displayWeather(data) {
    const temp = data.current.temp_c; 
    const desc = data.current.condition.text; 
    const icon = data.current.condition.icon; 

    document.getElementById('weather').innerHTML = `
        <img src="https:${icon}" alt="${desc}">
        <p><strong>${data.location.name}</strong></p>
        <p>${temp}°C - ${desc}</p>
    `;
}
navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    fetchWeather(url);
}, () => {
    const fallbackUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    fetchWeather(fallbackUrl);
});

const defaultUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
fetchWeather(defaultUrl);
