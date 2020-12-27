function constructMoonURL() {
    function makeRequest() {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://moonapi.p.rapidapi.com/1606888400",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d62e6f34f0msha0a4e23e56f8267p1e1473jsnb6ca869e4a1e",
                "x-rapidapi-host": "moonapi.p.rapidapi.com"
            }
        };

        $.ajax(settings).then(function (response) {
            var render = displayMoonResponse(response);
            renderToModal(render)
        });
    }
    makeRequest();
}

function displayMoonResponse(response) {
    var age = response.moon.age;
    var illum = response.moon.illumination;
    var stage = response.moon.stage;
    var html = `
            <h2>Today's Moon Info</h2>
            <p>Days since New Moon: ${age} days</p>
            <p>Illumination: ${illum} lux</p>
            <p>Phase: ${stage}</p>
        `;
    return html;
}


document.querySelector(".modal-trigger").addEventListener("click", () => {
    // const satelliteInput = document.querySelector(".satellite");
    const modal = document.querySelector(".modal");
    constructMoonURL();
    M.Modal.init(modal, {});
})


$(document).ready(function () {
    $('.sidenav').sidenav();
});