let currentInput = '0';
let operationString = '';
let previousInput = '';
let operation = null;
let shouldReset = false;

const resultDisplay = document.getElementById('result');
const operationDisplay = document.getElementById('operation');

function updateDisplay() {
    resultDisplay.textContent = currentInput;
    operationDisplay.textContent = operationString;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        currentInput += number;
    }
    
    // Update operation string
    if (operation) {
        operationString = `${previousInput} ${operation} ${currentInput}`;
    }
    
    updateDisplay();
}

function appendDecimal() {
    if (shouldReset) {
        currentInput = '0.';
        shouldReset = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '0' && operationString === '') return;
    
    if (operation !== null && !shouldReset) {
        calculate();
    }
    
    operation = op;
    previousInput = currentInput;
    operationString = `${previousInput} ${operation}`;
    shouldReset = true;
    updateDisplay();
}

function calculate() {
    if (operation === null || shouldReset) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    operationString = `${previousInput} ${operation} ${currentInput} =`;
    currentInput = result.toString();
    operation = null;
    shouldReset = true;
    updateDisplay();
}

function squareRoot() {
    operationString = `√(${currentInput})`;
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    shouldReset = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    operationString = '';
    previousInput = '';
    operation = null;
    shouldReset = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    
    // Update operation string
    if (operation) {
        operationString = `${previousInput} ${operation} ${currentInput}`;
    }
    
    updateDisplay();
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('calculatorTheme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('calculatorTheme');
if (savedTheme) {
    setTheme(savedTheme);
}

// Initialize
updateDisplay();