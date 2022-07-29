const operate = (operation, num1, num2) => {
    if (operation == "add") {
        return Number(num1) + Number(num2);
    } else if (operation == "subtract") {
        return num1 - num2;
    } else if (operation == "multiply") {
        return Math.round((num1 * num2) * 100) / 100;
    } else if (operation == "divide") {
        if (num2 == 0) {
            return "Nah man";
        } else {
            return Math.round((num1 / num2) * 100) / 100;
        }
    }
}

// Returns how long the number is
const getNumLength = (number) => {
    const length = (number + '').replace('.', '').length;
    return length;
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
    } else if (e.target.textContent == "+/-") {     // If +/- is pressed
        console.log(isNaN(presentDisplay.textContent));
        if (isNaN(presentDisplay.textContent) || prevButton == "equals") {
            // Do nothing
        } else {
            presentDisplay.textContent *= -1;
        }
    } else if (e.target.textContent == "DEL") {     // If DEL is pressed
        console.log("DELETE")
        prevButton = "delete";
    } else if (e.target.textContent == ".") {       // If "." is pressed
        if (presentDisplay.textContent.includes(".") || prevButton == "equals") {
            // Do nothing
        } else if (prevButton == "operation" || presentDisplay.textContent == "Nah man") {
            presentDisplay.textContent = e.target.textContent;
            prevButton = "dot";
        } else {
            presentDisplay.textContent += e.target.textContent;
            prevButton = "dot";
        }
    } else if (e.target.classList.contains("num")) {        // If a number is pressed
        if (presentDisplay.textContent == 0 || prevButton == "operation" || presentDisplay.textContent == "Nah man") {
            presentDisplay.textContent = e.target.textContent;
            prevButton = "num";
        } else if (prevButton == "equals") {
            // Do nothing
        } else {
            presentDisplay.textContent += e.target.textContent;
            prevButton = "num";
        }

    } else if (e.target.classList.contains("operation")) {      // If an operation is pressed

        if (prevButton == "operation") {
            // Do nothing
        } else if (presentDisplay.textContent == "Nah man") {
            num1 = 0;
            pastDisplay.textContent = "0" + " " + e.target.textContent;
            presentDisplay.textContent = "";
            operation = e.target.id;
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
        } else if ((prevButton == "num" || prevButton == "dot") && (operation)) {
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

    // If numbers are too long, make font size smaller
    if (getNumLength(presentDisplay.textContent) > 23) {
        presentDisplay.style.fontSize = '10px';
        pastDisplay.style.fontSize = '8px';
    } else if (getNumLength(presentDisplay.textContent) > 15) {
        presentDisplay.style.fontSize = '20px';
        pastDisplay.style.fontSize = '14px';
    } else if (getNumLength(presentDisplay.textContent) > 7) {
        presentDisplay.style.fontSize = '30px';
        pastDisplay.style.fontSize = '18px';
    } else {
        presentDisplay.style.fontSize = '60px';
        pastDisplay.style.fontSize = '24px';
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
