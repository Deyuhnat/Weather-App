const container = document.querySelector("#container");
const searchForm = document.querySelector("#search-form");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityName = document.querySelector("#city-name");
const countryName = document.querySelector("#country-name");
const icon = document.querySelector('#icon');

const image = document.querySelector(".weather-box img");
const temperature = document.querySelector(".weather-box .temperature");
const description = document.querySelector(".weather-box .description");
const humidity = document.querySelector(".weather-details .humidity span");
const wind = document.querySelector(".weather-details .wind span");

const env = "PROD"; // DEV || PROD
const countryNameAPI = "https://restcountries.com/v3.1/name";

let city;

const searchWeatherHandler = (e) => {
  e.preventDefault();
  const APIKey = "07440488a043de2ebfe5a86e7b599a8d";
  city = document.querySelector("#search-box input").value.trim();
  if (env === "DEV") city = "Ho Chi Minh";
  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      fetch(`${countryNameAPI}/${json.sys.country}`)
        .then((res) => res.json())
        .then((data) => {
          cityName.innerHTML = json.name;
          countryName.innerHTML = `${data[0].name.common} ${data[0].flag}`;
        //   console.log(data);
        });
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      searchForm.reset();

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
    });
};

searchForm.addEventListener("submit", searchWeatherHandler);

icon.addEventListener('click', () => {
    console.log('click');
    searchForm.reset();
    icon.classList = "fa-solid fa-location-dot";
});

icon.addEventListener('mouseover', () => {
    icon.classList = "fa-solid fa-x";
});

icon.addEventListener('mouseleave', () => {
    icon.classList = "fa-solid fa-location-dot";
});



if (env === "DEV") window.addEventListener("load", searchWeatherHandler);
