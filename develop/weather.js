function getCityData(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.weatherKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data){
        var render = displayCityData(data);
        renderToModal(render);
    })
}

function displayCityData(data) {
    var temp = data.main.temp;
    var city = data.name;
    var humid = data.main.humidity;
    var wind = data.wind.speed;
    var feelsLike = data.main.feels_like;
    var clouds = data.clouds.all;
    var html = `
            <h2>${city}</h2>
            <p>Today's Temperature: ${temp}&deg;F</p>
            <p>Feels Like: ${feelsLike}&deg;F</p>
            <p>Humidity: ${humid}%</p>
            <p>Wind Speed: ${wind}mph</p>
            <p>Cloud Conditions: ${clouds}% cloud cover<p>
        `;
    return html;
}

document.getElementById("forecast-button").addEventListener("click", () => {
    const weatherInput = document.querySelector(".weather");
    getCityData(weatherInput.value);
    renderToModal(getPreloader());
})
        

