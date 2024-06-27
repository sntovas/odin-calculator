const numButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equals = document.querySelector(".equals-btn");
const clear = document.querySelector(".clear-btn");
const display = document.querySelector(".display");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;


equals.addEventListener("click", evaluate);
clear.addEventListener("click", reset);


numButtons.forEach((button) => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => setOperation(button.textContent));
})

clear.addEventListener("click", clearDisplay);




function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function appendNumber(num) {
    if(display.textContent === "0" || shouldResetScreen) {
        clearDisplay();
    }
    display.textContent += num;
}

function clearDisplay() {
    display.textContent = "";
    shouldResetScreen = false;
}

function reset() {
    display.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function setOperation(operator) {
    if(currentOperation !== null) evaluate()
    firstOperand = display.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if(currentOperation === null || shouldResetScreen) {
        return;
    }
    if(currentOperation === "/" && display.textContent === "0") {
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = display.textContent;
    display.textContent = operate(currentOperation, firstOperand, secondOperand);
    currentOperation = null;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            if(b === 0) return null
            else return divide(a, b);
        default:
            return null;
    }
}