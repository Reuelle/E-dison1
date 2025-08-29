// js/weather.js

const CITY = "Legaspi";
const API_KEY = "967a28bfe6897e198462f2c699bdc228"; // Replace with your actual key

async function fetchWeather() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const temp = currentData.main.temp;
    const condition = currentData.weather[0].description;
    const icon = currentData.weather[0].icon;

    const forecastHTML = forecastData.list.slice(0, 3).map(entry => {
      const time = new Date(entry.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const temp = entry.main.temp;
      const desc = entry.weather[0].description;
      return `<div><strong>${time}</strong>: ${temp}°C, ${desc}</div>`;
    }).join("");

    document.getElementById("weather").innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
      <strong>${CITY}</strong>: ${temp}°C, ${condition}<br>
      <div style="margin-top:10px;">Next 3 Forecasts:<br>${forecastHTML}</div>
    `;
  } catch (err) {
    document.getElementById("weather").textContent = "Weather unavailable";
    console.error("Weather fetch failed:", err);
  }
}