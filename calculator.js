function isValidNumber(numStr) {
    const numRegex = /^-?\d*\.?\d+$/;
    return numRegex.test(numStr.trim()) && numStr.trim() !== '';
}

function parseNumber(numStr) {
    const num = parseFloat(numStr.trim());
    if (isNaN(num) || !isFinite(num)) {
        return null;
    }
    return num;
}

function calculate(num1, num2, operation) {
    switch(operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 === 0) {
                throw new Error('Деление на ноль невозможно!');
            }
            return num1 / num2;
        default:
            throw new Error('Неизвестная операция');
    }
}

function getOperationSymbol(operation) {
    switch(operation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '?';
    }
}

function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString();
    }
    return parseFloat(num.toFixed(4)).toString();
}

document.addEventListener('DOMContentLoaded', () => {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('clear');
    const clearHistoryButton = document.getElementById('clearHistory');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');
    const errorTextElement = document.querySelector('.calculator__error-text');
    const historyList = document.getElementById('historyList');

    let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    function renderHistory() {
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.className = 'calculator__history-item calculator__history-item--empty';
            emptyItem.textContent = 'История пуста';
            historyList.appendChild(emptyItem);
            return;
        }
        
        history.slice(-10).reverse().forEach(item => {
            const historyItem = document.createElement('li');
            historyItem.className = 'calculator__history-item';
            
            const expressionSpan = document.createElement('span');
            expressionSpan.className = 'calculator__history-expression';
            expressionSpan.textContent = item.expression;
            
            const resultSpan = document.createElement('span');
            resultSpan.className = 'calculator__history-result';
            resultSpan.textContent = `= ${item.result}`;
            
            historyItem.appendChild(expressionSpan);
            historyItem.appendChild(resultSpan);
            historyList.appendChild(historyItem);
        });
    }

    function showResult(result, expression) {
        resultElement.textContent = formatNumber(result);
        resultElement.style.color = '#212529';
        errorElement.style.display = 'none';
        
        history.push({
            expression: expression,
            result: formatNumber(result)
        });
        
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
        renderHistory();
    }

    function showError(message) {
        resultElement.textContent = 'Ошибка!';
        resultElement.style.color = '#c92a2a';
        errorTextElement.textContent = message;
        errorElement.style.display = 'flex';
        
        errorElement.style.animation = 'none';
        setTimeout(() => {
            errorElement.style.animation = 'shake 0.5s';
        }, 10);
    }

    function clearAll() {
        number1Input.value = '';
        number2Input.value = '';
        operationSelect.value = 'add';
        resultElement.textContent = 'Ожидание вычисления...';
        resultElement.style.color = '#212529';
        errorElement.style.display = 'none';
        number1Input.focus();
    }

    function clearHistory() {
        if (confirm('Вы уверены, что хотите очистить историю вычислений?')) {
            history = [];
            localStorage.removeItem('calculatorHistory');
            renderHistory();
        }
    }

    renderHistory();

    calculateButton.addEventListener('click', () => {
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        const operation = operationSelect.value;
        
        if (!isValidNumber(num1Str)) {
            showError('Пожалуйста, введите корректное первое число!');
            number1Input.focus();
            return;
        }
        
        if (!isValidNumber(num2Str)) {
            showError('Пожалуйста, введите корректное второе число!');
            number2Input.focus();
            return;
        }
        
        const num1 = parseNumber(num1Str);
        const num2 = parseNumber(num2Str);
        
        if (num1 === null) {
            showError('Первое число некорректно!');
            number1Input.focus();
            return;
        }
        
        if (num2 === null) {
            showError('Второе число некорректно!');
            number2Input.focus();
            return;
        }
        
        try {
            const result = calculate(num1, num2, operation);
            const expression = `${formatNumber(num1)} ${getOperationSymbol(operation)} ${formatNumber(num2)}`;
            showResult(result, expression);
        } catch (error) {
            showError(error.message);
        }
    });

    clearButton.addEventListener('click', clearAll);

    clearHistoryButton.addEventListener('click', clearHistory);

    [number1Input, number2Input].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateButton.click();
            }
        });
    });

    operationSelect.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateButton.click();
        }
    });

    operationSelect.addEventListener('change', () => {
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        
        if (isValidNumber(num1Str) && isValidNumber(num2Str)) {
            const num1 = parseNumber(num1Str);
            const num2 = parseNumber(num2Str);
            
            if (num1 !== null && num2 !== null && num2 !== 0) {
                try {
                    const result = calculate(num1, num2, operationSelect.value);
                    resultElement.textContent = `${formatNumber(num1)} ${getOperationSymbol(operationSelect.value)} ${formatNumber(num2)} = ${formatNumber(result)}`;
                    resultElement.style.color = '#495057';
                } catch (error) {
                }
            }
        }
    });

    clearAll();
    
    document.querySelector('.calculator__body').style.opacity = '0';
    document.querySelector('.calculator__body').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.calculator__body').style.transition = 'opacity 0.5s, transform 0.5s';
        document.querySelector('.calculator__body').style.opacity = '1';
        document.querySelector('.calculator__body').style.transform = 'translateY(0)';
    }, 100);
});