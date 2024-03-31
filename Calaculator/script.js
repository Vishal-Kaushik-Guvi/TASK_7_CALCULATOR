document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    let calculationHistory = JSON.parse(localStorage.getItem('calcHistory')) || [];

    document.addEventListener('keydown', (event) => {
        const key = event.key;
    
        if (key === 'Enter') {
            evaluateExpression();
        } else if (event.shiftKey) {
            shiftKey(event);
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === 'Backspace') {
            event.preventDefault(); // Prevent default action
            deleteLastCharacter();
        } else if (isValidInput(key)) {
            event.preventDefault(); // Prevent default action for keys like '2'
            KEYS(key);
        } else {
            event.preventDefault(); // Prevents the default action for invalid keys
            alert('Only numbers, decimal point (.) and operators (+, -, *, /, %) are allowed!');
        }
    });
    

    // Event listener for mouse clicks on buttons
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (isValidInput(value)) {
                KEYS(value);
            } else if (value === '=') {
                evaluateExpression();
            } else if (value === 'C') {
                clearDisplay();
            } else if (value === '⌫') {
                deleteLastCharacter();
            } else if (value === 'MC') {
                clearAllCalculations();
            } else if (value === 'ML') {
                removeLastCalculation();
            } else {
                alert('Invalid input!');
            }
        });
    });

    // Function to check if the input is valid (numbers, decimal point, or operators)
    function isValidInput(input) {
        return /[0-9.+\-*\/%]/.test(input);
    }

    // Function to append input to display
    function KEYS(input) {
        display.value += input;
    }

    // Function to clear the display
    function clearDisplay() {
        display.value = '';
    }

    // Function to delete the last character from the display
    function deleteLastCharacter() {
        display.value = display.value.slice(0, -1);
    }

    // Function to evaluate the expression
    function evaluateExpression() {
        try {
            const expression = display.value;
            const result = eval(expression);
            const calculation = `${expression} = ${result}`; // Format calculation history
            display.value = result;
            addToHistory(calculation);
        } catch (error) {
            display.value = 'Error';
        }
    }

    // Function to add calculation to history
    function addToHistory(calculation) {
        calculationHistory.push(calculation);
        updateHistoryDisplay();
    }

    // Function to remove the last calculation from history
    function removeLastCalculation() {
        calculationHistory.pop();
        updateHistoryDisplay();
    }

    // Function to clear all calculations from history
    function clearAllCalculations() {
        calculationHistory = [];
        updateHistoryDisplay();
    }

    // Function to update calculation history display
    function updateHistoryDisplay() {
        localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
        historyList.innerHTML = '';
        calculationHistory.forEach((calculation) => {
            const listItem = document.createElement('li');
            listItem.textContent = calculation;
            historyList.appendChild(listItem);
        });
    }

    // Function to handle Shift key
    function shiftKey(event) {
        // Handle shift key action here
        console.log('Shift key pressed');
        // Example: You can add specific functionality when shift key is pressed
    }

    // Load history from localStorage on page load
    updateHistoryDisplay();
});
