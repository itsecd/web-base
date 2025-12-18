const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error-message');
const inputFields = [num1Input, num2Input];

function hideError() {
    errorDiv.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    resultDiv.textContent = '0';
    resultDiv.classList.add('error');
}

function validateInputs(num1Str, num2Str) {
    if (num1Str === '' || num2Str === '') {
        showError('Пожалуйста, заполните оба поля');
        return { isValid: false };
    }
    
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);
    
    if (isNaN(num1) || isNaN(num2)) {
        showError('Нужно ввести именно числа');
        return { isValid: false };
    }
    
    return { isValid: true, num1, num2 };
}

function calculateResult(num1, num2, operation) {
    switch(operation) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 === 0) {
                showError('На ноль делить нельзя');
                return null;
            }
            return num1 / num2;
        default:
            showError('Что-то пошло не так с операцией');
            return null;
    }
}

function formatResult(value) {
    if (!isFinite(value)) {
        showError('Результат получился слишком большим');
        return null;
    }
    
    if (Number.isInteger(value)) {
        return value.toString();
    }
    
    let formatted = value.toFixed(4);
    formatted = formatted.replace(/\.?0+$/, '');
    return formatted;
}

function displayResult(value) {
    const formatted = formatResult(value);
    if (formatted === null) return;
    
    resultDiv.textContent = formatted;
    resultDiv.classList.remove('error');
    
    resultDiv.style.transform = 'scale(1.1)';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
    }, 300);
}

function calculate() {
    hideError();
    resultDiv.classList.remove('error');
    
    const num1Str = num1Input.value.trim();
    const num2Str = num2Input.value.trim();
    const operation = operationSelect.value;
    
    const validation = validateInputs(num1Str, num2Str);
    if (!validation.isValid) return;
    
    const { num1, num2 } = validation;
    const result = calculateResult(num1, num2, operation);
    
    if (result === null) return;
    
    displayResult(result);
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

calculateBtn.addEventListener('click', calculate);

inputFields.forEach(field => {
    field.addEventListener('keypress', handleEnterKey);
    field.addEventListener('input', hideError);
});

window.addEventListener('DOMContentLoaded', () => {
    num1Input.focus();
});
