const title = document.querySelector("#title");

const CLINKED_CLASS = "clicked"

function handleClick() {
    title.classList.toggle(CLINKED_CLASS)
}

function init() {
    title.addEventListener("click", handleClick);
}

init();