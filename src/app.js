function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    let day = days[date.getDay()];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  


function formatDay(timestamp) {
let date =new Date(timestamp * 1000);
let day = date.getDay ();
let days = ["Sun","Mon","Tue", "Wed", "Thu", "Fri","Sat"];
return days[day];

}

function displayForecast(response){
    
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;

    forecast.forEach (function(forecastDay, index){
        if (index <6){
        forecastHTML = 
            forecastHTML + 
            `
            <div class="col-2">
                <div class="weather-forecast-date">${forecastDay.dt}
                </div>
    
                    <img 
                        src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                        alt="" 
                        width="45"
                        class="image-forecast"
                    />
                <div class="weather-forecast-temperature"> 
                    <span class="weather-forecast-temp-max"> 
                        ${Math.round(forecastDay.temp.max)}
                        º
                    </span> 
                    |
                    <span class="weather-forecast-temp-min">
                    ${Math.round(forecastDay.temp.min)}
                    º
                    </span>
                </div>
            </div>
            `;
        }
    });
    
    forecastHTML= forecastHTML+ `</div>`  
    forecastElement.innerHTML= forecastHTML;
}  

    function getForecast(coordinates) {
        let apiKey = "f199df5b3e79c71a20af9ba230e682cc";
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
      
        axios.get(`${apiUrl}`).then(displayForecast);
      }


function showTemperature(response){
        
      let cityElement = document.querySelector("#city");
      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#temperature");
      let humidityElement = document.querySelector("#humidity");
      let descriptionElement = document.querySelector("#description");
      let feels_likeElement = document.querySelector("#feels_like");
      let iconElement = document.querySelector("#icon");
    
      
      celciusTemperature = Math.round(response.data.main.temp);

      temperatureElement.innerHTML = `${temperature}ºC`;
      cityElement.innerHTML = response.data.name;
      humidityElement.innerHTML = Math.round(response.data.main.humidity);
      descriptionElement.innerHTML = response.data.weather[0].description;
      feels_likeElement.innerHTML = Math.round(response.data.main.feels_like);
      iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   
      getForecast(response.data.coord);
      
    }

    function displayFahrenheitTemperature(event){
        event.preventDefault();


        celciusLink.classList.remove("active");
        fahrenheitLink.classList.add("active");

        let fahrenheitTemperature = Math.round((celciusTemperature*9)/5 +32);
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = fahrenheitTemperature;
    }

    function displayCelciusTemperature(event){
        event.preventDefault();

        celciusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = celciusTemperature;
    }
    function search(event) {
        event.preventDefault();
        let h1 = document.querySelector("h1");
      
        let cityInput = document.querySelector("#city-input");
        searchCity(cityInput.value);
      }
      
  function searchCity(city) {
        let apiKey = "eb508ef6233a171a1bdb79ec0ccb8c7a";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(`${apiUrl}`).then(showTemperature);
      }
    let celciusTemperature = null;
    
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
    
    let celciusLink = document.querySelector("#celcius-link");
    celciusLink.addEventListener("click", displayCelciusTemperature);

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", search);
    
  