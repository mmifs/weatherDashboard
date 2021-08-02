$("#date").text(moment().format("dddd, MMMM Do YYYY"));
var cityApi = "https://api.openweathermap.org/geo/1.0/direct?q=toronto&appid=be56721f2765afd4e946bf6cc853af53"


function citySearch(searchedCity){
    searchedCity = document.getElementById("citySearch").value
    cityName = document.querySelector('#city');
    var cityApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&appid=be56721f2765afd4e946bf6cc853af53"
    fetch(cityApi).then((response) => {
        response.json().then(function(data) {
            console.log(data)
            let long = data[0].lon;
            let lat = data[0].lat;
            let rtrnCity = data[0].name;
            let rtrnCtry = data[0].country;

            cityName.innerHTML = rtrnCity + ", " + rtrnCtry;
            console.log("long is", long, "and lat is", lat);
            showWeather(long, lat);

        });
    });
}



function showWeather(lon, lat) {
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=b10b44443a11cb1a96db83079b5f18c5"
    fetch(weatherApi).then((response) => {
        response.json().then(function(data) {
            // current day weather info

            let calcTemp = Math.round((data.current.temp) - 273.15)
            let calcWindSpeed = data.current.wind_speed + " MPH"
            let calcHumidity = data.current.humidity + "%"
            let calcUvIndex = data.current.uvi

            if (data.current.uvi <= 2) {
                $("#UV").addClass("favorable");
                $("#UV").removeClass("moderate");
                $("#UV").removeClass("severe");
              } else if (data.current.uvi <= 5) {
                $("#UV").addClass("moderate");
                $("#UV").removeClass("favorable");
                $("#UV").removeClass("severe");
              } else {
                $("#UV").addClass("severe");
                $("#UV").removeClass("moderate");
                $("#UV").removeClass("favorable");
              }

            var temp = document.querySelector('#temperature');
            temp.innerHTML = calcTemp;

            var windspeed = document.querySelector('#wind');
            windspeed.innerHTML = calcWindSpeed;

            var humidity = document.querySelector('#humid');
            humidity.innerHTML = calcHumidity;

            var UVin = document.querySelector('#UV');
            UVin.innerHTML = calcUvIndex;

            // for loop creates elements for 5 day forecast
            for (i = 1; i <= 5; i++) {
                // set icon for weather
                let icon = 'https://openweathermap.org/img/wn/'+ data.daily[i].weather[0].icon + '@2x.png';
                let imgElem = document.createElement('img');
                imgElem.src = icon
                document.getElementById('icon' + i).innerHTML = '<img src =' + icon + '>'

                // define variables for API pulled data
                let dailyTemp = Math.round((data.daily[i].temp.day) - 273.15)
                let dailyWindSpd = data.daily[i].wind_speed
                let dailyHumidity = data.daily[i].humidity

                // locate elements via query selector per day
                var dTemp = document.querySelector('#dayTemp' + i)
                var dWindSpd = document.querySelector('#dayWind' + i)
                var dHumidity = document.querySelector('#dayHumid' + i)
                $("#" + i).addClass("day");
                // concatenate data with dom
               
                dTemp.innerHTML = "Temperature: " + dailyTemp
                dWindSpd.innerHTML = "Wind Speed: " + dailyWindSpd + "MPH"
                dHumidity.innerHTML = "Humidity: " + dailyHumidity + "%"
            }
        });
    });
    fetch(weatherApi).then((response) =>  {
        response.json().then(function(data) {
            console.log(data)
        });
    });
};

$("#searchBtn").on("click", function() {
    var searchedCity = document.getElementById("citySearch").value
    citySearch()
    console.log(searchedCity);
    })