function displayTemperature(response){
    console.log(response.data.main.temp);
    let temperatureElement =document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
        cityElement.innerHTML = response.data.name;
}

let apiKey = "56b9a37d4289fb4202o351ecd010dta9";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=56b9a37d4289fb4202o351ecd010dta9&units=metric`;

axios.get(apiUrl).then(displayTemperature);