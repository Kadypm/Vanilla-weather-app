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
                <div class="weather-forecast-date">${forecastDay.daily}
                </div>
    
                    <img 
                        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition[0].icon}.png"
                        alt="" 
                        width="45"
                        class="image-forecast"
                    />
                <div class="weather-forecast-temperature"> 
                    <span class="weather-forecast-temp-max"> 
                        ${Math.round(forecastDay.daily.temperature.maximum)}
                        º
                    </span> 
                    |
                    <span class="weather-forecast-temp-min">
                    ${Math.round(forecastDay.daily.temperature.minimum)}
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
        let apiKey = "56b9a37d4289fb4202o351ecd010dta9";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
      
        axios.get(`${apiUrl}`).then(displayForecast);
      }


function showTemperature(response){
        
      let cityElement = document.querySelector("#city");
      let temperature = Math.round(response.data.temperature.current);
      let temperatureElement = document.querySelector("#temperature");
      let humidityElement = document.querySelector("#humidity");
      let descriptionElement = document.querySelector("#description");
      let feels_likeElement = document.querySelector("#feels_like");
      let iconElement = document.querySelector("#icon");
    
      
      celciusTemperature = Math.round(response.data.temperature.current);

      temperatureElement.innerHTML = `${temperature}ºC`;
      cityElement.innerHTML = response.data.city;
      humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
      descriptionElement.innerHTML = response.data.condition.description;
      feels_likeElement.innerHTML = Math.round(response.data.temperature.feels_like);
      iconElement.innerHTML = response.data.condition.icon;
   
      getForecast(response.data.coordinates);
      
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
        let apiKey = "56b9a37d4289fb4202o351ecd010dta9";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
        axios.get(`${apiUrl}`).then(showTemperature);
      }
    let celciusTemperature = null;
    
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
    
    let celciusLink = document.querySelector("#celcius-link");
    celciusLink.addEventListener("click", displayCelciusTemperature);

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", search);
    
  