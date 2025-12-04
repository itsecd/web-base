
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error-message');


function calculate() {
    
    errorDiv.style.display = 'none';
    
    const num1Str = num1Input.value.trim();
    const num2Str = num2Input.value.trim();
    const operation = operationSelect.value;
    
    if (num1Str === '' || num2Str === '') {
        showError(' Пожалуйста, заполните оба поля');
        return;
    }
    
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);
    
    if (isNaN(num1) || isNaN(num2)) {
        showError(' Нужно ввести именно числа');
        return;
    }
    
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
            if (num2 === 0) {
                showError(' На ноль делить нельзя');
                return;
            }
            result = num1 / num2;
            break;
            
        default:
            showError(' Что-то пошло не так с операцией');
            return;
    }
    
    if (!isFinite(result)) {
        showError(' Результат получился слишком большим');
        return;
    }
    
    displayResult(result);
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    resultDiv.textContent = '0';
    resultDiv.style.color = '#ff66a3';
}

function displayResult(value) {
    let formattedResult;
    if (Number.isInteger(value)) {
        formattedResult = value.toString();
    } else {
        formattedResult = value.toFixed(4);
        formattedResult = formattedResult.replace(/\.?0+$/, '');
    }
    
    resultDiv.textContent = formattedResult;
    resultDiv.style.color = '#ff66a3';
    
    resultDiv.style.transform = 'scale(1.1)';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
    }, 300);
}

calculateBtn.addEventListener('click', calculate);

num1Input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});

num2Input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});

num1Input.addEventListener('input', function() {
    errorDiv.style.display = 'none';
});

num2Input.addEventListener('input', function() {
    errorDiv.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', function() {
    num1Input.focus();
});