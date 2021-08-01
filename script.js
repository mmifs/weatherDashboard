$("#date").text(moment().format("dddd, MMMM Do YYYY"));
var cityApi = "https://api.openweathermap.org/geo/1.0/direct?q=toronto&appid=be56721f2765afd4e946bf6cc853af53"


function citySearch(searchedCity){
    searchedCity = document.getElementById("citySearch").value
    var cityApi = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchedCity + "&appid=be56721f2765afd4e946bf6cc853af53"
    fetch(cityApi).then((response) => {
        response.json().then(function(data) {
            console.log(data)
            let long = data[0].lon;
            let lat = data[0].lat;
            console.log("long is", long, "and lat is", lat);
            showWeather(long, lat);

        });
    });
}


function showWeather(lon, lat) {
        console.log(lon, lat);
        var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=b10b44443a11cb1a96db83079b5f18c5"
        fetch(weatherApi).then((response) => {
            response.json().then(function(data) {
                console.log(data)
                let calcTemp = Math.round((data.current.temp) - 273.15)
                console.log(calcTemp)
                let calcWindSpeed = data.current.wind_speed + " MPH"
                console.log(calcWindSpeed)
                let calcHumidity = data.current.humidity + "%"
                console.log(calcHumidity)
                let calcUvIndex = data.current.uvi
                console.log(calcUvIndex)
                var temp = document.querySelector('#temperature');
                temp.text = calcTemp;
                
        });
    });
};

$("#searchBtn").on("click", function() {
    var searchedCity = document.getElementById("citySearch").value
    citySearch()
    console.log(searchedCity);
    })