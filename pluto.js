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
    startWikiAjax("pluto");
    renderToModal(getPreloader());
})