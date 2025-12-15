function updateValue(result) {
    display.textContent = result;
}

function showError(message) {
    errorDisplay.textContent = message;
}

function clearError() {
    errorDisplay.textContent = '';
}

function calculate() {
    clearError();
    
    let result;
    const num1 = parseFloat(number1.value);
    const num2 = parseFloat(number2.value);

    if (isNaN(num1) || isNaN(num2)) {
        showError('Введите оба числа!');
        updateValue('—');
        return;
    }

    switch(operatorSelect.value) {
        case 'add':
            result = num1 + num2;
            break;
        case 'sub':
            result = num1 - num2;
            break;
        case 'mul':
            result = num1 * num2;
            break;
        case 'div':
            if (num2 === 0) {
                showError('Ошибка: деление на ноль!');
                updateValue('—');
                return;
            } else {
                result = num1 / num2;
            }
            break;
        default:
            showError('Неизвестная операция!');
            return;
    }

    updateValue(result.toFixed(2));
}

function clear() {
    number1.value = '';
    number2.value = '';
    operatorSelect.value = 'add';
    updateValue('—');
    clearError();
    number1.focus();
    console.log('✅ Поля очищены');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');

    display = document.getElementById('result');
    number1 = document.getElementById('num1');
    number2 = document.getElementById('num2');
    operatorSelect = document.getElementById('operation');
    calculateButton = document.getElementById('calculateBtn');
    clearButton = document.getElementById('clearBtn');
    errorDisplay = document.getElementById('error');

    if (!display || !number1 || !number2 || !operatorSelect || !calculateButton) {
        console.error('❌ Ошибка: не найдены элементы HTML');
        return;
    }

    console.log('✅ Все элементы найдены');

    calculateButton.addEventListener('click', calculate);
    console.log('✅ Обработчик клика на вычисление привязан');

    if (clearButton) {
        clearButton.addEventListener('click', clear);
        console.log('✅ Обработчик клика на очистку привязан');
    }

    number1.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });

    number2.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });

    console.log('✅ Обработчики Enter привязаны');
    console.log('✅ Калькулятор полностью готов к работе!');
});
