document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    if (!num1Input || !num2Input || !operationSelect || !calculateBtn || 
        !clearBtn || !resultDiv || !errorDiv) {
        console.error('Не удалось найти один или несколько элементов калькулятора');
        return;
    }
    calculateBtn.addEventListener('click', handleCalculate);
    clearBtn.addEventListener('click', handleClear);
});

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
                throw new Error('Ошибка: деление на ноль!');
            }
            return num1 / num2;
        default:
            throw new Error('Неизвестная операция');
    }
}

function showError(message, errorDiv, resultDiv) {
    errorDiv.textContent = message;
    resultDiv.textContent = '—';
}

function handleCalculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    errorDiv.textContent = '';
    resultDiv.textContent = '—';
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    if (isNaN(num1) || isNaN(num2)) {
        showError('Пожалуйста, введите оба числа', errorDiv, resultDiv);
        return;
    }
    
    try {
        const result = calculate(num1, num2, operation);
        // Отображаем результат
        resultDiv.textContent = result.toFixed(2);
    } catch (error) {
        showError(error.message, errorDiv, resultDiv);
    }
}

function handleClear() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    num1Input.value = '';
    num2Input.value = '';
    operationSelect.value = 'add';
    resultDiv.textContent = '—';
    errorDiv.textContent = '';
}
