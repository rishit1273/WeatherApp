

const apiKey = "a1baf889ca915a4638d298c618b982e5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#location-input");
const searchForm = document.querySelector("#location-form");
const weather_icon = document.querySelector(".weather_type img");
const error = document.querySelector(".error");

async function getWeather(city) {
  try {
    if (!city) {
      window.alert("Please enter the city name");
      return;
    }
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      document.querySelector("#weather-data").style.display = "none"; 
      error.style.display = "block";
      if (response.status === 404) {
        window.alert("City not found");
        error.style.display = "block";
      } else {
        window.alert("Error: Failed to fetch weather data");
      }
      return;
    }

    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + `<sup>°C</sup>`;
    document.querySelector(".humid").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    searchBox.value = ""; 

    // Update weather icon 
    if (data.weather[0].main == "Clear") {
      weather_icon.src = "assets/clear.png";
    } else if (["Rain", "Drizzle", "Haze"].includes(data.weather[0].main)) {
      weather_icon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Clouds") {
      weather_icon.src = "assets/cloud.png";
    } else if (data.weather[0].main == "Snow") {
      weather_icon.src = "assets/snow.png";
    } else if (data.weather[0].main == "Thunderstorm") {
      weather_icon.src = "assets/thunderstorm.png";
    }

    document.querySelector("#weather-data").style.display = "block"; // Show weather details
    error.style.display = "none"; // Hide error message

  } catch (err) {
    console.error("Error:", err.message);
    window.alert("Error: Failed to fetch weather data");
  }
}

// Handle form submission
searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form reload
  getWeather(searchBox.value);
});
