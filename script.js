document.addEventListener('DOMContentLoaded', function() {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultElement = document.getElementById('result');
    const error1Element = document.getElementById('error1');
    const error2Element = document.getElementById('error2');
    const historyList = document.getElementById('history-list');
    
    let operationsHistory = [];

    function updateHistory() {
        historyList.innerHTML = '';
        
        if (operationsHistory.length === 0) {
            historyList.innerHTML = '<div class="history-empty">Transaction history is empty</div>';
            return;
        }
        
        const recentHistory = operationsHistory.slice(-5).reverse();
        
        recentHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = item;
            historyList.appendChild(historyItem);
        });
    }
    
    function addToHistory(num1, num2, operation, result) {
        let operationSymbol;
        switch(operation) {
            case 'add': operationSymbol = '+'; break;
            case 'subtract': operationSymbol = '-'; break;
            case 'multiply': operationSymbol = '×'; break;
            case 'divide': operationSymbol = '÷'; break;
            default: operationSymbol = '?';
        }
        
        const historyEntry = `${num1} ${operationSymbol} ${num2} = ${result}`;
        operationsHistory.push(historyEntry);
        updateHistory();
    }
    
    function validateInput() {
        let isValid = true;

        error1Element.textContent = '';
        error2Element.textContent = '';

        if (number1Input.value === '') {
            error1Element.textContent = 'Please enter the first number';
            isValid = false;
        } else if (isNaN(parseFloat(number1Input.value))) {
            error1Element.textContent = 'Please enter a valid number';
            isValid = false;
        }
        
        if (number2Input.value === '') {
            error2Element.textContent = 'Please enter the second number';
            isValid = false;
        } else if (isNaN(parseFloat(number2Input.value))) {
            error2Element.textContent = 'Please enter a valid number';
            isValid = false;
        }
        
        if (operationSelect.value === 'divide' && parseFloat(number2Input.value) === 0) {
            error2Element.textContent = 'Division by zero is impossible';
            isValid = false;
        }
        
        return isValid;
    }
    
    function calculate() {
        if (!validateInput()) {
            resultElement.textContent = '—';
            resultElement.style.color = '#ff0000ff';
            return;
        }
        
        const num1 = parseFloat(number1Input.value);
        const num2 = parseFloat(number2Input.value);
        const operation = operationSelect.value;
        
        let result;
        
        switch(operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            default:
                result = NaN;
        }
        
        if (isNaN(result)) {
            resultElement.textContent = 'Calculation error';
            resultElement.style.color = '#e74c3c';
        } else if (!isFinite(result)) {
            resultElement.textContent = 'Infinity';
            resultElement.style.color = '#e74c3c';
        } else {
            const formattedResult = Math.abs(result) > 1e10 || (Math.abs(result) < 1e-10 && result !== 0) 
                ? result.toExponential(5) 
                : parseFloat(result.toFixed(10)).toString();
            
            resultElement.textContent = formattedResult;
            resultElement.style.color = '#ff0000ff';
            
            addToHistory(num1, num2, operation, formattedResult);
        }
    }
    
    calculateButton.addEventListener('click', calculate);
    
    number1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    number2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    operationSelect.addEventListener('change', function() {
        if (this.value === 'divide' && parseFloat(number2Input.value) === 0) {
            error2Element.textContent = 'Деление на ноль невозможно';
        } else {
            error2Element.textContent = '';
        }
    });
    
    updateHistory();

    number1Input.focus();
});