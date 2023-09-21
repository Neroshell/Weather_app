const inputBox = document.querySelector('.input-box');
const searchBox = document.querySelector('.search-box');
const errorMessage = document.querySelector('.error');
const key = '8be7cd2f8909a78ab2562af13a549d3e';
const degree = document.querySelector('.degree');
const main = document.querySelector('.main');
const cityName = document.querySelector('.cityname');
const realFeel = document.querySelector('.real_feel');
const humidity = document.querySelector('.humid');
const wind = document.querySelector('.wind');
const pressure = document.querySelector('.pressure');
const weatherImage = document.querySelector('.weather_img');
const videoSource = document.querySelector('.video-source');
const empty = document.querySelector('.empty');


function updateRealTimeDate() {
    const dateElement = document.querySelector('.date_time');
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    dateElement.textContent = formattedDate;
}

function getCountry(country){
    const countryName = new Intl.DisplayNames(['en'], {type: "region"});
    return countryName.of(country);
}

searchBox.addEventListener('click', fetchData);

async function fetchData(){
    const city = inputBox.value;
    const videoSource = document.querySelector('.video-source');

    if (city === '') {
        empty.innerHTML = 'Kindly search for a city';
        errorMessage.innerHTML = ''; // Clear any previous error message
        return; 
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Couldn't fetch weather data, please try again");
        } else {
            errorMessage.innerHTML = ''; // Clear any previous error message
            empty.innerHTML = ''; // Clear the empty input message
        }

        const data = await response.json();
        let region = getCountry(data.sys.country);
        main.innerHTML = data.weather[0].main;
        degree.innerHTML = Math.round(data.main.temp) + '&deg;C';
        cityName.innerHTML = data.name + ', ' + region;
        realFeel.innerHTML =  Math.round(data.main.feels_like) + '&deg;C';
        humidity.innerHTML = data.main.humidity + '%';
        pressure.innerHTML = data.main.pressure + ' hPa';
        wind.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Rain') {
            videoSource.src = 'video/rainvid.mp4';
            const videoBackground = document.getElementById('video-background');
            videoBackground.load(); // Load the new video
            videoBackground.play(); // Play the video
            weatherImage.src = 'images/rainy.png';
        } else if (data.weather[0].main === 'Snow') {
            videoSource.src = 'video/snowfall.mp4';
            const videoBackground = document.getElementById('video-background');
            videoBackground.load(); 
            videoBackground.play(); 
            weatherImage.src = 'images/snow.png';
        } else if (data.weather[0].main === 'Clouds') {
            videoSource.src = 'video/moving_clouds.mp4';
            const videoBackground = document.getElementById('video-background');
            videoBackground.load(); 
            videoBackground.play(); 
            weatherImage.src = 'images/cloudy.png';   
        } else if (data.weather[0].main === 'Clear') {
            videoSource.src = 'video/default.mp4'; // Set the default video source
            const videoBackground = document.getElementById('video-background');
            videoBackground.load(); 
            videoBackground.play(); 
            weatherImage.src = 'images/clear.png';
        } else if (data.weather[0].main === 'Drizzle') {
            videoSource.src = 'video/storm.mp4';
            const videoBackground = document.getElementById('video-background');
            videoBackground.load();
            videoBackground.play(); 
        } else {
            // If none of the conditions match, set a default video source
            videoSource.src = 'video/default.mp4';
            const videoBackground = document.getElementById('video-background');
            videoBackground.load(); 
            videoBackground.play(); 
        }
    }
    catch (err) {
        console.log(err.message)
        errorMessage.innerHTML = err.message;
    }

    updateRealTimeDate();
}        

async function defaultData(){
    

   


    const url = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${key}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Couldn't fetch weather data, please try again");
        } 

        const data = await response.json();
        let region = getCountry(data.sys.country);
        main.innerHTML = data.weather[0].main;
        degree.innerHTML = Math.round(data.main.temp) + '&deg;C';
        cityName.innerHTML = data.name + ', ' + region;
        realFeel.innerHTML =  Math.round(data.main.feels_like) + '&deg;C';
        humidity.innerHTML = data.main.humidity + '%';
        pressure.innerHTML = data.main.pressure + ' hPa';
        wind.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main === 'Rain') {
            videoSource.src = 'video\storm.mp4';
            weatherImage.src = 'images/rainy.png';
        } else if (data.weather[0].main === 'Snow') {
            weatherImage.src = 'images/snow.png';
        } else if (data.weather[0].main === 'Clouds') {
            weatherImage.src = 'images/cloudy.png'; 
        } else if (data.weather[0].main === 'Clear') {
            weatherImage.src = 'images/clear.png';

        };
    }
    catch (err) {
        console.log(err.message)
        errorMessage.innerHTML = err.message;
    }

    updateRealTimeDate()
}

window.addEventListener('load', defaultData);


