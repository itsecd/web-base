const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const clearBtn = document.getElementById('clear-btn');
const resultElement = document.getElementById('result');
const operationIcon = document.getElementById('operation-icon');
const calculationInfo = document.getElementById('calculation-info');
const hint1 = document.getElementById('hint1');
const hint2 = document.getElementById('hint2');
operationSelect.addEventListener('change', updateOperationIcon);

function updateOperationIcon() {
    const operation = operationSelect.value;
    let iconClass = 'fas fa-plus';
    
    switch(operation) {
        case 'add':
            iconClass = 'fas fa-plus';
            break;
        case 'subtract':
            iconClass = 'fas fa-minus';
            break;
        case 'multiply':
            iconClass = 'fas fa-times';
            break;
        case 'divide':
            iconClass = 'fas fa-divide';
            break;
    }
    
    operationIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

function validateInputs() {
    let isValid = true;
    
    if (num1Input.value.trim() === '') {
        showHintError(hint1, 'Введите первое число');
        highlightInputError(num1Input);
        isValid = false;
    } else if (isNaN(parseFloat(num1Input.value))) {
        showHintError(hint1, 'Введите корректное число');
        highlightInputError(num1Input);
        isValid = false;
    } else {
        showHintSuccess(hint1, '✓ Корректное число');
        highlightInputSuccess(num1Input);
    }
    
    if (num2Input.value.trim() === '') {
        showHintError(hint2, 'Введите второе число');
        highlightInputError(num2Input);
        isValid = false;
    } else if (isNaN(parseFloat(num2Input.value))) {
        showHintError(hint2, 'Введите корректное число');
        highlightInputError(num2Input);
        isValid = false;
    } else {
        showHintSuccess(hint2, '✓ Корректное число');
        highlightInputSuccess(num2Input);
    }
    
    return isValid;
}

function showHintError(hintElement, message) {
    hintElement.textContent = message;
    hintElement.style.color = '#7a1c24ff';
}

function showHintSuccess(hintElement, message) {
    hintElement.textContent = message;
    hintElement.style.color = '#7a1c24ff';
}

function highlightInputError(inputElement) {
    inputElement.style.borderColor = '#742027ff';
    inputElement.style.boxShadow = '0 0 0 3px rgba(255, 71, 87, 0.2)';
}

function highlightInputSuccess(inputElement) {
    inputElement.style.borderColor = '#61e899ff';
    inputElement.style.boxShadow = '0 0 0 3px rgba(46, 213, 115, 0.2)';
}

function resetInputStyles() {
    [num1Input, num2Input].forEach(input => {
        input.style.borderColor = '#e0e0e0';
        input.style.boxShadow = 'none';
    });
    
    [hint1, hint2].forEach(hint => {
        hint.textContent = 'Введи любое число';
        hint.style.color = '#777';
    });
}

function calculate() {
 
    if (!validateInputs()) {
        resultElement.innerHTML = 'Ошибка ввода';
        resultElement.className = 'error';
        calculationInfo.textContent = 'Пожалуйста, исправьте ошибки в полях ввода';
        return;
    }
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    const calculationResult = performCalculation(num1, num2, operation);
    
    handleCalculationResult(calculationResult, num1, num2);
}

function performCalculation(num1, num2, operation) {
    let result;
    let operationSymbol = '';
    let errorMessage = '';
    
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
                return {
                    type: 'division_by_zero_error',
                    errorMessage: 'Деление на ноль невозможно',
                    displayMessage: 'Ошибка: Деление на ноль'
                };
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        default:
            return {
                type: 'unknown_operation_error',
                errorMessage: 'Неизвестная операция',
                displayMessage: 'Ошибка: Неизвестная операция'
            };
    }
    
    return {
        type: 'success',
        result: result,
        operationSymbol: operationSymbol
    };
}

function handleCalculationResult(calculationResult, num1, num2) {
    if (calculationResult.type === 'division_by_zero_error') {
       
        resultElement.innerHTML = calculationResult.displayMessage;
        resultElement.className = 'error';
        calculationInfo.textContent = calculationResult.errorMessage;
        highlightInputError(num2Input);
        showHintError(hint2, 'Нельзя делить на ноль');
        return;
    }
    
    if (calculationResult.type === 'unknown_operation_error') {
        resultElement.innerHTML = calculationResult.displayMessage;
        resultElement.className = 'error';
        calculationInfo.textContent = calculationResult.errorMessage;
        return;
    }
    
    if (calculationResult.type === 'success') {
        displaySuccessResult(
            calculationResult.result,
            calculationResult.operationSymbol,
            num1,
            num2
        );
    }
}

function displaySuccessResult(result, operationSymbol, num1, num2) {
    const formattedResult = parseFloat(result.toFixed(10));
    resultElement.innerHTML = formattedResult;
    resultElement.className = 'success';
    
    calculationInfo.textContent = `${num1} ${operationSymbol} ${num2} = ${formattedResult}`;
    
    resultElement.classList.add('result-animate');
    setTimeout(() => {
        resultElement.classList.remove('result-animate');
    }, 300);
}

function clearAll() {
    num1Input.value = '';
    num2Input.value = '';
    operationSelect.selectedIndex = 0;
    resultElement.innerHTML = '<p>1) введи числа</p><p>2) выбери операцию</p>';
    resultElement.className = 'info';
    calculationInfo.textContent = '';
    
    resetInputStyles();
    updateOperationIcon();
    
    num1Input.focus();
}

calculateBtn.addEventListener('click', calculate);

clearBtn.addEventListener('click', clearAll);

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

num1Input.addEventListener('keypress', handleEnterKey);
num2Input.addEventListener('keypress', handleEnterKey);
operationSelect.addEventListener('keypress', handleEnterKey);

function resetResultOnInput() {
    if (resultElement.className !== 'info') {
        resultElement.innerHTML = '<p>1) введи числа</p><p>2) выбери операцию</p>';
        resultElement.className = 'info';
        calculationInfo.textContent = '';
        resetInputStyles();
    }
}

num1Input.addEventListener('input', resetResultOnInput);
num2Input.addEventListener('input', resetResultOnInput);
operationSelect.addEventListener('change', resetResultOnInput);

window.addEventListener('DOMContentLoaded', function() {
    updateOperationIcon();
    num1Input.focus();
    num1Input.addEventListener('focus', function() {
        hint1.textContent = 'Можно использовать десятичные числа (например: 3.14)';
    });
    
    num1Input.addEventListener('blur', function() {
        if (num1Input.value.trim() === '') {
            hint1.textContent = 'Введи любое число';
        }
    });
    
    num2Input.addEventListener('focus', function() {
        hint2.textContent = 'Можно использовать десятичные числа (например: -2.5)';
    });
    
    num2Input.addEventListener('blur', function() {
        if (num2Input.value.trim() === '') {
            hint2.textContent = 'Введи любое число';
        }
    });
});