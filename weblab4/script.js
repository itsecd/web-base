document.addEventListener('DOMContentLoaded', function() {
    const ROUND_PRECISION = 10000;
    const MAX_HISTORY_ITEMS = 10;
    
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const error1Div = document.getElementById('error1');
    const error2Div = document.getElementById('error2');
    const historyList = document.getElementById('history-list');
    
    let calculationHistory = [];
    
    function validateNumber(value, errorDiv) {
        errorDiv.textContent = '';
        
        if (value.trim() === '') {
            errorDiv.textContent = 'Поле не может быть пустым';
            return null;
        }
        
        const num = parseFloat(value);
        if (isNaN(num)) {
            errorDiv.textContent = 'Введите корректное число';
            return null;
        }
        
        return num;
    }
    
    function compute(num1, num2, operation) {
        let result, operationSymbol;
        
        switch(operation) {
            case 'add':
                result = num1 + num2;
                operationSymbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                operationSymbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                operationSymbol = '×';
                break;
            case 'divide':
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно');
                }
                result = num1 / num2;
                operationSymbol = '÷';
                break;
            default:
                throw new Error('Неизвестная операция');
        }

        result = Math.round(result * ROUND_PRECISION) / ROUND_PRECISION;
        
        return { result, operationSymbol };
    }
    function updateResult(message, isError = false) {
        resultDiv.textContent = message;
        resultDiv.style.color = isError ? '#e74c3c' : '#333';
    }
    
    function addToHistory(num1, operationSymbol, num2, result) {
        const historyItem = `${num1} ${operationSymbol} ${num2} = ${result}`;
        calculationHistory.unshift(historyItem);
        
        if (calculationHistory.length > MAX_HISTORY_ITEMS) {
            calculationHistory.pop();
        }
        
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        
        calculationHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history__item';
            historyItem.textContent = item;
            historyList.appendChild(historyItem);
        });
    }
    
    function calculate() {
        error1Div.textContent = '';
        error2Div.textContent = '';
        resultDiv.textContent = '';
        
        const num1 = validateNumber(num1Input.value, error1Div);
        const num2 = validateNumber(num2Input.value, error2Div);
        
        if (num1 === null || num2 === null) {
            return;
        }
        
        const operation = operationSelect.value;
        
        try {
            const { result, operationSymbol } = compute(num1, num2, operation);
            updateResult(result);
            addToHistory(num1, operationSymbol, num2, result);
            
        } catch (error) {
            updateResult('Ошибка: ' + error.message, true);
        }
    }
    
    calculateButton.addEventListener('click', calculate);
    [num1Input, num2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
});