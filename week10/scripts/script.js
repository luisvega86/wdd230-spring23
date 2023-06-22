// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const apikey = '8d1039b8dfb3d22677437362ebb6ef15'

const url = `https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&&appid=${apikey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)}</strong>`;
    
    const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = desc;
}