function renderInfoToModal(htmlEl) {
    $(".modal-content .wiki-container").html(htmlEl);
    // while (elementContainer.hasChildNodes()){
    //     elementContainer.removeChild(elementContainer.firstChild);
    // }
}

function handleSatelliteImage404Error() {
    const imgEl = document.querySelector(".modal-content .image-container img");
    //FIXME: Replace this with image indicating that there is an error
    imgEl.src = "./assets/card1.jpg";
}

function createImgEl(source) {
    let imgEl = document.createElement("img");
    imgEl.setAttribute("width", "400px");
    imgEl.setAttribute("height", "400px");
    imgEl.setAttribute("onerror", "handleSatelliteImage404Error()");
    imgEl.src = source;

    return imgEl;
}

function wikiAPIHandler(data){
    const key = Object.keys(data.query.pages);
    const htmlData = data.query.pages[key[0]].extract;
    renderInfoToModal(htmlData);
}


function constructSatelliteURL() {
    const url = "https://en.wikipedia.org/w/api.php?action=query&titles=earth&prop=extracts&format=json&origin=*";
    // const cityName  = city.toLowerCase().trim();
    // const position = cities[cityName];
    // FIXME: Ask user to type in a valid city name
    // if (!position) return;
    
    // const url = `${endpoint}?lon=${position.lon}&lat=${position.lat}&dim=0.15&api_key=${config.key}`;
    // return url;
    
    function makeRequest() {
        const httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
                wikiAPIHandler(JSON.parse(httpRequest.responseText));
            } 
        };
        httpRequest.open('GET', url);
        httpRequest.send();
      }
    makeRequest();
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
    //const content = 
    constructSatelliteURL();
    // createSatelliteImage(satelliteInput.value);
    // renderImageToModal(content);

    M.Modal.init(modal, {});
})

$(document).ready(function() {
    $('.sidenav').sidenav();
});