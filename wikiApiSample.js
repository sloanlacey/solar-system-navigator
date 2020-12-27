function renderInfoToModal(htmlEl) {
    $(".modal-content .wiki-container").html(htmlEl);
}
function shortenHtmlData(htmlData) {
    const headerTagAt = /(<h)[0-9](>)/g;
    const hTagIndex = htmlData.search(headerTagAt);
    return htmlData.substring(0, hTagIndex);
}

function wikiAPIHandler(data){
    const key = Object.keys(data.query.pages);
    const htmlData = data.query.pages[key[0]].extract;
    const shorten = shortenHtmlData(htmlData);
    renderInfoToModal(shorten);
}

function startWikiAjax() {
    const url = "https://en.wikipedia.org/w/api.php?action=query&titles=earth&prop=extracts&format=json&origin=*";
    
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

document.querySelector(".modal-trigger").addEventListener("click", () => {    
    const modal = document.querySelector(".modal");
    startWikiAjax();
    M.Modal.init(modal, {});
})