const head = document.getElementById("head");
const hand = document.getElementById("hand");
const building = document.getElementById("building");

document.addEventListener("scroll", () => {
    let value = window.scrollY;
    head.style.top = value * 0.4 + "px";

})