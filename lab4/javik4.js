document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculate);
    }
});

function calculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const resultElement = document.getElementById('result');

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    
    resultElement.textContent = '';
    resultElement.className = 'calculator__result';

  
    if (isNaN(num1)) {
        showError('Ошибка: первое число некорректно');
        return;
    }
    if (isNaN(num2)) {
        showError('Ошибка: второе число некорректно');
        return;
    }
    if (operation === 'divide' && num2 === 0) {
        showError('Ошибка: деление на ноль!');
        return;
    }

    let result;
    switch (operation) {
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
            showError('Неизвестная операция');
            return;
    }

    resultElement.textContent = `Результат: ${result}`;
}

function showError(message) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    resultElement.className = 'calculator__result calculator__result--error';
}