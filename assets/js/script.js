// get - gets 1 element
// fetch - retrieves a list
// we will want to use AJAX
// Made by Eli Pruneda
var searchFormEl = document.querySelector('#search-form');
var APIKey = '0653b3dc68ef18d1e33d3b564375a2a1';
var resultContentEl= document.querySelector("#result-content");
var forecastContentEl = document.querySelector('#forecast-content');
const now = dayjs();
const formattedDate = now.format('MM-DD-YYYY');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;

    if (!searchInputVal){
        alert.error("You need a search input value!");
        return;
    }
    // todo: replace last results with new results
    searchAPI(searchInputVal);
    searchForecast(searchInputVal);

}

// print today's weather
function printWeather(resultObj){
    // console.log(resultObj);

    var resultCard = document.createElement('div');
    // style resultCard here

    var resultBody = document.createElement('div');
    // style resultBody here

    resultCard.append(resultBody);

    // this will be the name of the result city
    var titleEl = document.createElement('h2');
    titleEl.textContent = resultObj.name + " " +formattedDate; //check this in the result obj

    var tempEl = document.createElement('p');
    tempEl.innerHTML= `Temp: ${resultObj.main.temp}°F`;

    var windEl = document.createElement('p');
    windEl.innerHTML= `Wind: ${resultObj.wind.speed} MPH`;

    var humidityEl = document.createElement('p');
    humidityEl.innerHTML= `Humidity: ${resultObj.main.humidity}%`;

    resultBody.append(titleEl, tempEl, windEl, humidityEl);
    resultContentEl.append(resultCard);

}

// weather forecast call
function searchAPI(city){
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + APIKey+ '&units=imperial';
    fetch(queryURL)
    .then(function(response){
        if(!response.ok){
            throw response.json();
        }
        return response.json();
    })
    // code good response outcome here
    .then(function (response) {
        // console.log(response);
        if(!response){
            console.log("No results found!");
        } else {
            printWeather(response);
        }
    })
}

function weatherEmoji(weather){
    var weatherIcon
    if(weather === 'Clear'){
        weatherIcon = '☀️';
    }else if (weather==='Clouds'){
        weatherIcon = '☁️';
    }else if (weather==='Rain'){
        weatherIcon = '🌧️';
    }else if(weather==='Snow'){
        weatherIcon = '🌨️';
    }
    return weatherIcon;
}

// 5 day forecast print
function printForecast(resultObj){
    // create a little card for 1 day
    // iterate to repeat this 4 more times to get weather for 5 days
    console.log(resultObj);
    for(var day = 0; day < 33; day +=8){ 
        var dayCard = document.createElement('div');
        dayCard.classList.add('card');
        var dateEl = document.createElement('h2');
        var weathericonEl = document.createElement('h1');
        var tempEl = document.createElement('h3');
        var windEl = document.createElement('h3');
        var humidityEl = document.createElement('h3');


        var date = resultObj.list[day].dt;
        // console.log(date);
        var regDate = new Date(date*1000);
        // console.log(regDate);
        dateEl.textContent = regDate.toLocaleDateString();
        weathericonEl.textContent = weatherEmoji(resultObj.list[day].weather[0].main);
        console.log(weathericonEl.textContent);
        console.log(resultObj.list[day].weather.main);
        tempEl.textContent = `Temp: ${resultObj.list[day].main.temp}°F`;
        windEl.textContent = `Wind: ${resultObj.list[day].wind.speed} MPH`;
        humidityEl.textContent = `Humidity: ${resultObj.list[day].main.humidity}%`;

        dayCard.append(dateEl, weathericonEl, tempEl, windEl, humidityEl);
        forecastContentEl.append(dayCard);
    }

}

// 5 day forecast call
function searchForecast(city){
    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIKey+'&units=imperial';
    fetch(queryURL)
    .then(function(response){
        if(!response.ok){
            throw response.json();
        }
        console.log(response);
        return response.json();
    })
    .then(function(response){
        if(!response){
            console.log('No results found!');
        }else{
            printForecast(response);
        }
    })
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);