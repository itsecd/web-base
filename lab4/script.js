const selectedOp = document.getElementById('selectedOp');
const operationsList = document.getElementById('operationsList');
const selectItems = document.querySelectorAll('.calculator__select-item');

selectedOp.addEventListener('click', () => {
    operationsList.classList.toggle('calculator__select-items_show');
});

selectItems.forEach(item => {
    item.addEventListener('click', () => {
        selectedOp.textContent = item.textContent;
        selectedOp.dataset.value = item.dataset.value;
        operationsList.classList.remove('calculator__select-items_show');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.calculator__custom-select')) {
        operationsList.classList.remove('calculator__select-items_show');
    }
});

function performCalculation(num1, num2, operation) {
    switch(operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error('Деление на ноль!');
            }
            return num1 / num2;
        default:
            throw new Error('Ошибка операции');
    }
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = selectedOp.dataset.value || '+';
    const resultElement = document.getElementById('result');
    
    if (isNaN(num1) || isNaN(num2)) {
        showResult('Введите оба числа', true);
        return;
    }
    
    try {
        let result = performCalculation(num1, num2, operation);
        
        if (!isFinite(result)) {
            showResult('Слишком большое число', true);
            return;
        }
        
        result = Number.isInteger(result) ? result : parseFloat(result.toFixed(6));
        showResult(result);
        
    } catch (error) {
        showResult(error.message, true);
    }
}

function showResult(value, isError = false) {
    const resultElement = document.getElementById('result');
    
    resultElement.textContent = value;
    
    if (isError) {
        resultElement.classList.add('calculator__result_error');
        resultElement.classList.remove('calculator__result_pulse');
    } else {
        resultElement.classList.remove('calculator__result_error');
        resultElement.classList.add('calculator__result_pulse');
        setTimeout(() => {
            resultElement.classList.remove('calculator__result_pulse');
        }, 300);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        calculate();
    }
});

document.getElementById('num1').focus();

const inputs = document.querySelectorAll('.calculator__number-input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#00d4ff';
        this.style.background = 'rgba(255, 255, 255, 0.08)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = '#333';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});