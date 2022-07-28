const operate = (operation, num1, num2) => {
    if (operation == "add") {
        return num1 + num2;
    } else if (operation == "subtract") {
        return num1 - num2;
    } else if (operation == "multiply") {
        return num1 * num2;
    } else if (operation == "divide") {
        return num1 / num2;
    }
}

// Lights up a button when it is pressed
const isClicked = (e) => {
    e.target.classList.toggle("pressedButton");
    if (e.target.textContent == "AC") {
        presentDisplay.textContent = "";
        pastDisplay.textContent = "";
        num1 = undefined;
        num2 = undefined;
        op = false;
        prevButton = "";
        console.log("CLEAR ALL")
    } else if (e.target.textContent == "+/-") {
        console.log("NEG")
        prevButton = "neg";
    } else if (e.target.textContent == "DEL") {
        console.log("DELETE")
        prevButton = "delete";
    } else if (e.target.classList.contains("num")) {
        if (presentDisplay.textContent == 0 || prevButton == "operation") {
            presentDisplay.textContent = e.target.textContent;
        } else {
            presentDisplay.textContent += e.target.textContent;
        }
        prevButton = "num";
    } else if (e.target.classList.contains("operation")) {
        op = true;

        if (prevButton == "equals") {
            pastDisplay.textContent = num1 + " " + e.target.textContent;;
        } else {
            num1 = presentDisplay.textContent;
            pastDisplay.textContent += num1 + " " + e.target.textContent;
        }
        operation = e.target.id;
        console.log(`OPERATION: ${operation}, NUM1: ${num1}`);
        prevButton = "operation";
    } else if (e.target.textContent == "=") {
        if (op = true) {
            num2 = presentDisplay.textContent;
            pastDisplay.textContent += " " + num2 + " " + e.target.textContent;
            const answer = operate(operation, num1, num2);
            presentDisplay.textContent = answer;

            console.log(`OPERATION: ${operation}, NUM2: ${num2}`)

            num1 = answer;
            num2 = undefined;
            op = false;
            prevButton = "equals";
        }
        console.log("EQUALS");
        console.log(`num1 = ${num1}, num2 = ${num2}`);
    }
    // presentDisplay.textContent += e.target.textContent;
    setTimeout(() => { e.target.classList.toggle("pressedButton"); }, 150);
}

const buttons = document.querySelectorAll(".button");
const presentDisplay = document.getElementById("present-display");
const pastDisplay = document.getElementById("past-display");

let num1 = undefined;
let num2 = undefined;
let op = false;
let operation = undefined;
let prevButton = undefined;
presentDisplay.textContent = 0;
buttons.forEach((button) => {
    button.addEventListener("click", isClicked);
});
