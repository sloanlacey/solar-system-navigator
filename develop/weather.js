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
    var html = `
            <h2>${city}</h2>
            <p>temp: ${temp}&deg;F</p>
            <p>humidity: ${humid}%</p>
            <p>wind speed: ${wind}mph</p>
        `;
    return html;
}

document.getElementById("forecast-button").addEventListener("click", () => {
    const weatherInput = document.querySelector(".weather");
    getCityData(weatherInput.value);
    renderToModal(getPreloader());
})
        
