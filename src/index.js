function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;

    let forecastElement = document.querySelector("#forecast");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    
    forecastElement.innerHTML = response.data.condition.description; 
    timeElement.innerHTML = formatDate(date);
    humidityElement.innerHTML = `${response.data.temperature.humidty} %`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
  
    getForecast(response.data.city);
  }
  

  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} & ${hours} : ${minutes}`;
  }
  
  function searchCity(city) {
    let apiKey = "4o05t4b450f7bf3040828beac3b1db1c";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
  }
  
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  function getForecast(city) {
    let apiKey = "4o05t4b450f7bf3040828beac3b1db1c";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function forecastDay (timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return days [date.getDay]  
  }
  
 function displayFunction(response){
    let  weeklyForecastHtml = "";

    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        weeklyForecastHtml = 
        weeklyForecastHtml +
        `
  <div class="days-in-row">
    <div class="days-in-column">${forecastDay(day.time)}
  </div>
  <div> <img src="${day.condition.icon_url}" class = "icon-in-column" /> </div>
  <div class ="temp-variations">
      <span class = "max-temp"> ${Math.round(day.temperature.minimum)}° </span>
      <span class = "min-temp"> ${Math.round(day.temperature.maximum)}° </span> 
      </div>
    </div> `;
      }     
});

let weeklyForecastElement = document.querySelector("#weekly-forecast");
weeklyForecastElement.innerHTML = weeklyForecastHtml;
 }
searchCity();