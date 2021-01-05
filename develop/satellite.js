function handleSatelliteImage404Error() {
    $(".modal-content").html(`
        <i class="material-icons">highlight_off</i> Satellite Image Not Found
    `);
}

function handleSatelliteImageOnload() {
    const progress = document.querySelector(".modal-content .progress");
    progress.parentNode.removeChild(progress);      
    document.querySelector(".modal-content img").setAttribute("style", "display: block")
}

function createImgEl(source) {
    let html;
    if (!source) {
        html = `
            <i class="material-icons">
                highlight_off
            </i> City Not Found`;
    } else {
        html = `
            <img
                width="400px"
                height="400px"
                onerror="handleSatelliteImage404Error()"
                onload="handleSatelliteImageOnload()"
                style="display: none"
                src="${source}"
            />    
        `
    };
    return html;
}

function constructSatelliteURL(city) {
    const endpoint = "https://api.nasa.gov/planetary/earth/imagery";
    const cityName  = city.toLowerCase().trim();
    const position = cities[cityName];
    if (!position) return;
    
    const url = `${endpoint}?lon=${position.lon}&lat=${position.lat}&dim=0.15&date=2018-07-25&api_key=${config.nasaKey}`;
    return url;
}

function createSatelliteImage(cityName){
    const imageURL = constructSatelliteURL(cityName);
    const imageEl = createImgEl(imageURL);
    return imageEl;
}

document.getElementById("satellite-button").addEventListener("click", () => {
    // Getting city name from user input
    const satelliteInput = document.querySelector(".satellite");
    
    const content = createSatelliteImage(satelliteInput.value);
    renderToModal(`${getPreloader()}${content}`);

})
