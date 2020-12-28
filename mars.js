function constructMarsURL() {
    function makeRequest() {
        queryURL = `https://api.maas2.apollorion.com`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var render = displayMarsResponse(response);
            console.log(response);
            renderToModal(render);
        })
    }
    makeRequest();
   ;
}

function displayMarsResponse(response) {
    var day = response.sol;
    var mintemp = response.min_temp;
    var maxtemp = response.max_temp;
    var atmosphere = response.atmo_opacity;
    var html = `
            <h2>Today's Mars Info</h2>
            <p>Mars Sol: day ${day}</p>
            <p>Minimum Temperature: ${mintemp} degrees Celsius</p>
            <p>Maximum Temperature: ${maxtemp} degrees Celsius</p>
            <p>Atmospheric Conditions: ${atmosphere}</p>
        `;
    return html;
}


document.querySelector(".modal-trigger").addEventListener("click", () => {
    // const satelliteInput = document.querySelector(".satellite");
    const modal = document.querySelector(".modal");
    constructMarsURL();
    M.Modal.init(modal, {});
})


$(document).ready(function () {
    $('.sidenav').sidenav();
});