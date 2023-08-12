function formatDate(timestamp){
let date = new Date (timestamp);
let hours = date.getHouts();
let minutes =  date.getMinutes();
let day = date.getDay();
return `${day}  ${hours}:${minutes}`;
}


function showTemperature(response) {
    console.log(response);

    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector ("#temperature");
    let descriptionElement = document.querySelector("#description");
    //let sensationElementElement = document.querySelector("#precipitation");
    let humidityElement = document.querySelector("#humidity");


    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = (response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    //sensationElement.innerHTML = response. data.main.feels_like;
    humidityElement.innerHTML = (response.data.main.humidity);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
   
}

let apiKey = "eb508ef6233a171a1bdb79ec0ccb8c7a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}`).then(showTemperature);;

