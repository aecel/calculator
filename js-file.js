const operate = (operation, num1, num2) => {
    if (operation == "add") {
        return Number(num1) + Number(num2);
    } else if (operation == "subtract") {
        return num1 - num2;
    } else if (operation == "multiply") {
        return num1 * num2;
    } else if (operation == "divide") {
        if (num2 == 0) {
            return "Nah man";
        } else {
            return Math.round((num1 / num2)*100)/100;
        }
    }
}


const isClicked = (e) => {

    // Lights up a button when it is pressed
    e.target.classList.toggle("pressedButton");
    setTimeout(() => { e.target.classList.toggle("pressedButton"); }, 150);

    if (e.target.textContent == "AC") {     // If AC is pressed
        presentDisplay.textContent = 0;
        pastDisplay.textContent = "";
        num1 = undefined;
        num2 = undefined;
        operation = undefined;
        prevButton = undefined;
        console.log("CLEAR ALL")
    } else if (e.target.textContent == "+/-") {     // If +/- is pressed
        console.log("NEG")
        prevButton = "neg";
    } else if (e.target.textContent == "DEL") {     // If DEL is pressed
        console.log("DELETE")
        prevButton = "delete";
    } else if (e.target.classList.contains("num")) {        // If a number is pressed
        if (presentDisplay.textContent == 0 || prevButton == "operation") {
            presentDisplay.textContent = e.target.textContent;
        } else {
            presentDisplay.textContent += e.target.textContent;
        }
        prevButton = "num";
    } else if (e.target.classList.contains("operation")) {      // If an operation is pressed

        if (prevButton == "operation") {
            // Do nothing
        } else if (prevButton == "equals") {
            pastDisplay.textContent = num1 + " " + e.target.textContent;
            presentDisplay.textContent = "";
            operation = e.target.id;
        } else if (num1 == undefined) {
            num1 = presentDisplay.textContent;
            pastDisplay.textContent = num1 + " " + e.target.textContent;
            presentDisplay.textContent = "";
            operation = e.target.id;
        } else if (prevButton == "num") {
            num2 = presentDisplay.textContent;
            const answer = operate(operation, num1, num2);
            pastDisplay.textContent = answer + " " + e.target.textContent;
            presentDisplay.textContent = "";
            num1 = answer;
            num2 = undefined;
            operation = e.target.id;
        }

        prevButton = "operation";
    } else if (e.target.textContent == "=") {       // If = is pressed
        if (prevButton == "equals") {
            // Do nothing
        } else if ((prevButton == "num") && (operation)) {
            num2 = presentDisplay.textContent;
            pastDisplay.textContent += " " + num2 + " " + e.target.textContent;
            const answer = operate(operation, num1, num2);
            presentDisplay.textContent = answer;

            if (typeof answer == "number") {        // Check if answer is not equal to "Nah man"
                num1 = answer;
            } else {
                num1 = undefined;
            }
            num2 = undefined;
            operation = undefined;
            prevButton = "equals";
        }

    }
    
}

const buttons = document.querySelectorAll(".button");
const presentDisplay = document.getElementById("present-display");
const pastDisplay = document.getElementById("past-display");

let num1 = undefined;
let num2 = undefined;
let op = false;
let operation = undefined;
let prevButton = undefined;
let prevOperation = undefined;
presentDisplay.textContent = 0;
buttons.forEach((button) => {
    button.addEventListener("click", isClicked);
});
