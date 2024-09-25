// Define a Calculator class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;

        this.clear();
    }

    // Clear the calculator
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    // Delete the last digit from the current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Append a number to the current operand
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Choose an operation and perform computation if previous operand exists
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // Perform the selected operation on previous and current operands
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    // Format a number for display
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update the display with the current and previous operands
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
                this.previousOperand
            )} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }
}

// Get all number buttons
const numberButtons = document.querySelectorAll("[data-number]");
// Get all operation buttons
const operationButtons = document.querySelectorAll("[data-operation]");
// Get the equals button
const equalsButton = document.querySelector("[data-equals]");
// Get the delete button
const deleteButton = document.querySelector("[data-delete]");
// Get the all clear button
const allClearButton = document.querySelector("[data-clear]");
// Get the previous operand text element
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
// Get the current operand text element
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// Create a new calculator instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to number buttons
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listeners to operation buttons
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listener to equals button
equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add event listener to delete button
deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
});

// Add event listener to all clear button
allClearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
});
