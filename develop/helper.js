function renderToModal(htmlEl, title="") {
    let content;
    if (title !== "") {
        content = `<h4>${title}</h4>${htmlEl}`
    } else {
        content = htmlEl;
    }
    // content = title !== "" ? `<h4>${title}</h4>${htmlEl}`: htmlEl;

    $(`.modal-content`).html(content);
    $(".modal").modal({
        onCloseEnd: function() {
            document.querySelector("body").setAttribute("style", "overflow: visible");
        }
    });
    $(".modal").modal("open");
}

function getPreloader(){
    return `
    <div class="progress">
        <div class="indeterminate"></div>
    </div>
    `;
}
$(document).ready(function() {
    $('.sidenav').sidenav();
});