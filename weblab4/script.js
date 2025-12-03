document.addEventListener('DOMContentLoaded', function() {
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
        
        if (value === '') {
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
    
    function calculate() {
        // Очистка предыдущих ошибок
        error1Div.textContent = '';
        error2Div.textContent = '';
        resultDiv.textContent = '';
        
        // Валидация чисел
        const num1 = validateNumber(num1Input.value, error1Div);
        const num2 = validateNumber(num2Input.value, error2Div);
        
        if (num1 === null || num2 === null) {
            return;
        }

        const operation = operationSelect.value;
        let result;
        let operationSymbol;
        
        try {
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
            

            result = Math.round(result * 10000) / 10000;
            
            resultDiv.textContent = result;
            resultDiv.style.color = '#333';
            
            addToHistory(`${num1} ${operationSymbol} ${num2} = ${result}`);
            
        } catch (error) {
            resultDiv.textContent = 'Ошибка: ' + error.message;
            resultDiv.style.color = '#e74c3c';
        }
    }
    
    function addToHistory(calculation) {
        calculationHistory.unshift(calculation);
        

        if (calculationHistory.length > 10) {
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

    calculateButton.addEventListener('click', calculate);

    [num1Input, num2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });
});