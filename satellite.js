function renderImageToModal(imgEl) {
    const imageContainer = document.querySelector(".modal-content .image-container");
    while (imageContainer.hasChildNodes()){
        imageContainer.removeChild(imageContainer.firstChild);
    }
    imageContainer.append(imgEl);
}

function handleSatelliteImage404Error() {
    const imgEl = document.querySelector(".modal-content .image-container img");
    //FIXME: Replace this with image indicating that there is an error
    imgEl.src = "./card1.jpg";
}

function createImgEl(source) {
    let imgEl = document.createElement("img");
    imgEl.setAttribute("width", "400px");
    imgEl.setAttribute("height", "400px");
    imgEl.setAttribute("onerror", "handleSatelliteImage404Error()");
    imgEl.src = source;

    return imgEl;
}

function constructSatelliteURL(city) {
    const endpoint = "https://api.nasa.gov/planetary/earth/imagery";
    const cityName  = city.toLowerCase().trim();
    const position = cities[cityName];
    // FIXME: Ask user to type in a valid city name
    if (!position) return;
    
    const url = `${endpoint}?lon=${position.lon}&lat=${position.lat}&dim=0.15&api_key=${config.key}`;
    return url;
}

function createSatelliteImage(cityName){
    const imageURL = constructSatelliteURL(cityName);
    const imageEl = createImgEl(imageURL);
    return imageEl;
}

document.querySelector(".modal-trigger").addEventListener("click", () => {
    // Getting city name from user input
    const satelliteInput = document.querySelector(".satellite");
    
    const modal = document.querySelector(".modal");
    const content = createSatelliteImage(satelliteInput.value);
    renderImageToModal(content);

    M.Modal.init(modal, {});
})

$(document).ready(function() {
    $('.sidenav').sidenav();
});