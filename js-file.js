isClicked = (e) => {
    e.target.classList.toggle("pressedButton");
    setTimeout(() => { e.target.classList.toggle("pressedButton"); }, 150);
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener("click", isClicked);
});