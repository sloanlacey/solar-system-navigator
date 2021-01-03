
// Mars Sol API

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

// Mars wikiAPI

function shortenWikiHtmlData(htmlData) {
    const headerTagAt = /<h[0-9]>/g;
    const hTagIndex = htmlData.search(headerTagAt);
    return htmlData.substring(0, hTagIndex);
}

function wikiAPIHandler(data, subject){
    const key = Object.keys(data.query.pages);
    const htmlData = data.query.pages[key[0]].extract;
    const wikiData = shortenWikiHtmlData(htmlData);
    const title = subject.replace(subject.charAt(0), subject.charAt(0).toUpperCase());
    renderToModal(wikiData, title);
}

function startWikiAjax(subject) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${subject}&prop=extracts&format=json&origin=*`;
    
    function makeRequest() {
        const httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
                wikiAPIHandler(JSON.parse(httpRequest.responseText), subject);
            } 
        };
        httpRequest.open('GET', url);
        httpRequest.send();
    }
    makeRequest();
}

document.getElementById("wiki-button").addEventListener("click", () => {    
    startWikiAjax("mars");
    renderToModal(getPreloader());
})