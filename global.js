function getImg(src, width = 100) {
    const img = document.createElement("img");
    img.height = 100;
    img.width = width;
    img.style.border = "1px solid black"
    img.style.borderRadius = "50px"
    img.src = src;
    return img;
}
function showLoader() {
    const loader = document.createElement("div");
    loader.id = "searchLoader";
    loader.classList.add("spinner-border");
    return loader
}

function removeLoader() {
    const loader = document.querySelector("#searchLoader");
    if (loader) {
        loader.remove();
    }
}
function getinput() {
    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Search"
    input.id = "SearchButton"
    return input
}
function getbuttonsearch() {
    const button = document.createElement("button")
    button.innerText = "Search"
    button.classList.add("btn", "btn-outline-success")
    button.id = "SearchButton"
    return button

}
function errorH1(error) {
    const eror = document.createElement("h1")
    DOM.content.innerHTML = ""
    DOM.chart.innerHTML = ""
    eror.innerText = error
    eror.style.color = "red"
    eror.style.fontSize = "xx-large"
    eror.style.fontWaight = "bolder"
    return eror
}
function drewcredit() {
    const credit = document.createElement("h4")
    credit.innerText = "© Created By Amit Nahmani"
    credit.id = "credit"
    credit.style.textAlign = "center"
    return credit
}