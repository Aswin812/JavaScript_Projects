let input;
let btn;
let loading;
let locationbtn;
let suggestionBox;
let weatherBox;
let viewOption;
let json;
let msgBox;
let cityName;
let alertBox;
let popup;
let currentBox;
// let blackScreen;
let apiKey = "6CUXADKCRNX9VKJ6MEBERE476";


document.addEventListener("DOMContentLoaded", () => {
    btn = document.querySelector("#btn");
    input = document.querySelector("#input");
    loading = document.querySelector("#loading");
    locationbtn = document.querySelector("#location");
    suggestionBox = document.querySelector("#suggestionBox");
    weatherBox = document.querySelector("#weatherBox");
    viewOption = document.querySelector("#viewSelect");
    msgBox = document.querySelector('#msg');
    cityName = document.querySelector("#cityName");
    alertBox = document.querySelector("#alerts");
    popup = document.querySelector("#popup");
    currentBox = document.querySelector("#currentConditions");

    document.addEventListener('click', (event) => {
        // console.log(event.target)
        if (event.target === btn) {
            getWeatherApi(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=${apiKey}&contentType=json`)
        }
        else if (event.target === locationbtn || locationbtn.contains(event.target)) {
            weatherBox.innerHTML = "";
            currentBox.innerHTML = "";
            currentBox.style.display = "none";
            cityName.textContent = "";
            alertBox.innerHTML = "";
            json = undefined;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    let lat = pos.coords.latitude;
                    let lon = pos.coords.longitude;
                    getWeatherApi(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}&contentType=json`)
                }, (err) => {
                    document.querySelector("#msg").textContent = "Location Permission Denied"
                });
            }
        }
        else if (suggestionBox.contains(event.target)) {
            input.value = event.target.textContent;
            suggestionBox.style.display = 'none';
            input.style.borderRadius = "60px"
            getWeatherApi(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=${apiKey}&contentType=json`);
        }
        else if (event.target === document.body) {
            suggestionBox.style.display = "none";
            input.style.borderRadius = "60px"
            popup.style.display = "none"
            weatherBox.style.display = "flex";
            currentBox.style.display = "flex";
        }
        else if (event.target === viewOption) {
            showWeather(json);
        }
        else if (event.target.closest('.weather')) {
            popup.style.display = "block";
            weatherBox.style.display = "none";
            currentBox.style.display = "none";
            showPopup(event.target.closest('.weather'));
        }
        else if (event.target === document.querySelector("#popup h2")) {
            popup.style.display = "none";
            weatherBox.style.display = "flex";
            currentBox.style.display = "flex";
            popup.querySelector("#details").innerHTML = "";
        }
    })

    input.addEventListener("input", async () => { //   pk.f9645e10723f8702f2acba8be9775b97
        suggestionBox.style.display = "block"
        input.style.borderRadius = "15px 15px 0 0 "
        showSuggestion(`https://us1.locationiq.com/v1/autocomplete.php?key=pk.f9645e10723f8702f2acba8be9775b97&q=${input.value}&limit=5&countrycodes=in&format=json`);
    })

    document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            getWeatherApi(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=metric&key=${apiKey}&contentType=json`);
        }
    })
})

async function showSuggestion(url) {
    suggestionBox.innerHTML = "";
    let citys = await fetch(url).then((result) => result.json());
    // console.log(citys[0]);
    citys.forEach(city => {
        let cityname = document.createElement('div');
        cityname.textContent = city.display_name.split(",")[0];
        suggestionBox.append(cityname);
    })
}

async function getWeatherApi(url) {
    // console.log(viewOption.value)
    json = undefined;
    suggestionBox.style.display = "none";
    input.style.borderRadius = "60px"
    input.value = "";
    weatherBox.innerHTML = "";
    currentBox.innerHTML = "";
    currentBox.style.display = "none";
    cityName.textContent = "";
    msgBox.textContent = "";
    alertBox.innerHTML = "";
    loading.style.display = "block";


    if (!navigator.onLine) {
        loading.style.display = "none";
        msgBox.textContent = "You are now Offline !"
        return;
    }

    let getWeather = await fetch(url);

    if (getWeather.status != 200) {
        loading.style.display = "none";
        msgBox.textContent = "City Not Found !";
        return;
    }

    json = await getWeather.json();
    if (/^\d/.test(json.address)) {
        cityName.textContent = "Current Location :"
    }
    else {
        cityName.textContent = json.address + ' :';
    }
    let temp = "";
    json.alerts.forEach(alert => {
        temp += alert.headline;
    })
    if (temp !== "") {
        alertBox.innerHTML = `<b style="color : red">Alert : </b>`;
        alertBox.innerHTML += temp;
    }

    let currentConditions = json.currentConditions;
    currentBox.innerHTML = `
        <div id='box1'>
            <img src="Icons/${currentConditions.icon}.png" width="100px">
            <div>
                <h1>${Math.round(currentConditions.temp)}°C</h1>
                <p>${currentConditions.conditions}</p>
                <p>Feels like: ${Math.round(currentConditions.feelslike)}°C</p>
            </div>
        </div>
        <div id='box2'>
            <p>💧 Humidity: ${currentConditions.humidity}%</p>
            <p>🌬️ Wind: ${currentConditions.windspeed} km/h</p>
            <p>☀️ UV Index: ${currentConditions.uvindex}</p>
            <p>🌄 Sunrise: ${currentConditions.sunrise}</p>
            <p>🌇 Sunset: ${currentConditions.sunset}</p>
        </div>
    `;
    currentBox.style.display = "flex";

    loading.style.display = "none";
    console.log(json)
    json = json.days.splice(0, 7);
    console.log(json)
    showWeather(json)
}

function showWeather(json) {
    if (json === undefined) {
        document.querySelector("#msg").textContent = "Enter City Name";
        return;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    weatherBox.innerHTML = "";
    if (viewOption.value === 'day') {
        let index = 0;
        json.forEach(day => {
            let weather = document.createElement("div");
            weather.setAttribute('class', 'weather');

            weather.innerHTML = `
                        <img src="Icons/${day.icon}.png" alt="" width="100px">
                        <p>${days[new Date(day.datetime).getDay()]}</p>
                        <h1>${Math.round(day.temp)}&degC</h1>
                        <p>${Math.round((day.temp * 9 / 5) + 32)}\u00B0F</p>
                        <input type="hidden" value="${index++}">
                        `;
            weatherBox.append(weather);
        });
    }
    else {
        let counter = 1;
        json.forEach(day => {
            let dayWeather = document.createElement('div');
            dayWeather.setAttribute('id', "dayWeatherBox");
            let heading = document.createElement('h2');
            heading.setAttribute('id', 'h2');
            heading.textContent = `Day ${counter++} :`;
            weatherBox.append(heading);
            day.hours.forEach(hour => {
                let weather = document.createElement("div");
                weather.setAttribute('class', 'weather');
                weather.innerHTML = `
                            <img src="Icons/${hour.icon}.png" alt="" width="100px">
                            <p>${hour.datetime}</p>
                            <h1>${Math.round(hour.temp)}&degC</h1>
                            <p>${Math.round((hour.temp * 9 / 5) + 32)}\u00B0F</p>
                            `;
                dayWeather.append(weather);
            })
            weatherBox.append(dayWeather);
        });
    }
}


function showPopup(event) {
    let selectDay = json[event.querySelector("input").value];
    let containor = popup.querySelector('#details');
    containor.innerHTML = `
        <h1>${selectDay.datetime} (${event.querySelector('p').textContent})</h1><br>
        <p><b>Conditions : </b> ${selectDay.conditions}</p>
        <p><b>Description : </b> ${selectDay.description}</p>
        <p><b>Wind Speed : </b> ${selectDay.windspeed}</p>
        <P><b>Max Temperature : </b> ${selectDay.tempmax}</P>
        <p><b>Min Temperature : </b> ${selectDay.tempmin}</p>
        <p><b>Humidity : </b> ${selectDay.humidity}</p><br>
        <p><b>Weather in Hours : </b></p><br>
    `;

    let hours = document.createElement('div');
    hours.setAttribute('id', 'hours');

    selectDay.hours.forEach(h => {
        let hour = document.createElement('div');
        hour.setAttribute('class', 'hour');

        hour.innerHTML = `
            <p>${h.datetime}</p>
            <h3>${Math.round(h.temp)}&degC</h3>
            <p>${Math.round((h.temp * 9 / 5) + 32)}\u00B0f</p>
            `;

        hours.append(hour);
    })

    containor.append(hours);

}



