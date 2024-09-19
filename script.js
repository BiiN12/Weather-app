const apiKey = "0794676d85f5ab186b07de6bbd371340";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".searchInputBox input");
const searchBtn = document.querySelector(".searchInputBox button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = `${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `${data.wind.speed}km/h`;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    return data;
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
  searchBox.value = "";
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getWeather(searchBox.value);
    searchBox.value = "";
  }
});
