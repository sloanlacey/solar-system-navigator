const apiKey = "91ab1f166a22407eaa1886ec52afbc9a";

function getCityData(city) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(data){
        var render = displayCityData(data);
        const modal = document.querySelector("#modal2");
        renderToModal2(render);
    })
}

function displayCityData(data) {
    console.log(data);
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
        return html
}

function renderToModal2(weatherEl) {
    console.log(weatherEl);
    const imageContainer = document.querySelector(".modal-content2 .weather-container");
    while (imageContainer.hasChildNodes()){
        imageContainer.removeChild(imageContainer.firstChild);
    }
    var temp = $(".weather-container").append(weatherEl);
    console.log(temp);
    $("#modal2").modal();
    $("#modal2").modal("open");
}

        document.getElementById("forecast-button").addEventListener("click", () => {
            const weatherInput = document.querySelector(".weather");
            const modal = document.querySelector("#modal2");
            getCityData(weatherInput.value); 
        })
        

