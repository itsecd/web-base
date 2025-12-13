const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculate');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');


function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}


function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    resultDiv.textContent = '—';
}


function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    if (isNaN(num1) || isNaN(num2)) {
        showError('Пожалуйста, введите оба числа');
        return;
    }
    
    clearError();
    
    let result;
    let operationName;

    if (operation === 'add') {
        result = num1 + num2;
        operationName = '+';
    } else if (operation === 'subtract') {
        result = num1 - num2;
        operationName = '-';
    } else if (operation === 'multiply') {
        result = num1 * num2;
        operationName = '×';
    } else if (operation === 'divide') {
        if (num2 === 0) {
            showError('На ноль делить нельзя!');
            return;
        }
        result = num1 / num2;
        operationName = '÷';
    } else {
        showError('Неизвестная операция');
        return;
    }
    resultDiv.innerHTML = `${num1} ${operationName} ${num2} = <span style="color: red;">${result}</span>`;
}

calculateButton.addEventListener('click', calculate);

num1Input.addEventListener('input', clearError);
num2Input.addEventListener('input', clearError);
operationSelect.addEventListener('change', clearError);


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