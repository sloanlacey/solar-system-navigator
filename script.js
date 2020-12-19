function renderToPage(img) {
    const containerEl = document.getElementById("satelliteImage");
    const imgEl = document.createElement("img");
    imgEl.src = img;
    containerEl.appendChild(imgEl);
}

function requestSatelliteImage(city) {
    const endpoint = "https://api.nasa.gov/planetary/earth/imagery";
    const position = cities[city.toLowerCase()];
    if (!position) return;
    // const url = endpoint + "?lon=" + position.lon + "&lan=" + position.lat + "&dim=0.25&api_key=" + config.key
    const url = `${endpoint}?lon=${position.lon}&lat=${position.lat}&dim=0.15&api_key=${config.key}`;

    renderToPage(url);
}

requestSatelliteImage("seattle");