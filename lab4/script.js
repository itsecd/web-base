// Валидация входных данных
function validateInputs(num1, num2, operation) {
    if (num1 === '' || num2 === '') {
        return { isValid: false, message: '❌ Пожалуйста, заполните оба поля!' };
    }
    
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    if (isNaN(a) || isNaN(b)) {
        return { isValid: false, message: '❌ Введите корректные числа!' };
    }
    
    if (operation === 'div' && b === 0) {
        return { isValid: false, message: '❌ Деление на ноль невозможно!' };
    }
    
    if (!['add', 'sub', 'mul', 'div'].includes(operation)) {
        return { isValid: false, message: '❌ Неизвестная операция!' };
    }
    
    return { isValid: true, a, b };
}

// Выполнение математической операции
function performOperation(a, b, operation) {
    let result;
    let operationSymbol;
    
    switch (operation) {
        case 'add':
            result = a + b;
            operationSymbol = '+';
            break;
        case 'sub':
            result = a - b;
            operationSymbol = '-';
            break;
        case 'mul':
            result = a * b;
            operationSymbol = '×';
            break;
        case 'div':
            result = a / b;
            operationSymbol = '÷';
            break;
        default:
            throw new Error('Неизвестная операция');
    }
    
    return { result, operationSymbol };
}

// Форматирование результата
function formatResult(a, b, operationSymbol, result) {
    const formattedResult = Number.isInteger(result) 
        ? result 
        : result.toFixed(4);
    
    return `${a} ${operationSymbol} ${b} = ${formattedResult}`;
}

// Обновление интерфейса
function updateUI(resultElement, errorElement, result, error, isSuccess) {
    // Очищаем предыдущие значения
    resultElement.textContent = '—';
    errorElement.textContent = '';
    
    if (error) {
        errorElement.textContent = error;
        errorElement.style.color = '#e74c3c';
        errorElement.classList.remove('calculator__error_success');
        return;
    }
    
    if (result !== undefined) {
        resultElement.textContent = result;
        errorElement.textContent = '✅ Вычисление выполнено успешно!';
        errorElement.style.color = '#27ae60';
        errorElement.classList.add('calculator__error_success');
        
        // Цвет для положительных/отрицательных результатов
        const resultValue = parseFloat(result.split('=')[1].trim());
        if (resultValue > 0) {
            resultElement.style.color = '#27ae60';
        } else if (resultValue < 0) {
            resultElement.style.color = '#e74c3c';
        } else {
            resultElement.style.color = '#2c3e50';
        }
    }
}

// Основная функция
function calculate() {
    // Получаем элементы DOM
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const operationEl = document.getElementById('operation');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');
    
    // Получаем значения
    const num1 = num1El.value.trim();
    const num2 = num2El.value.trim();
    const operation = operationEl.value;
    
    // Валидация
    const validation = validateInputs(num1, num2, operation);
    if (!validation.isValid) {
        updateUI(resultEl, errorEl, null, validation.message, false);
        return;
    }
    
    try {
        // Выполнение операции
        const operationResult = performOperation(validation.a, validation.b, operation);
        
        // Форматирование результата
        const formattedResult = formatResult(
            validation.a, 
            validation.b, 
            operationResult.operationSymbol, 
            operationResult.result
        );
        
        // Обновление UI
        updateUI(resultEl, errorEl, formattedResult, null, true);
    } catch (error) {
        updateUI(resultEl, errorEl, null, `❌ Ошибка: ${error.message}`, false);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const operationEl = document.getElementById('operation');
    
    // Обработка Enter
    const handleEnter = function(e) {
        if (e.key === 'Enter') calculate();
    };
    
    num1El.addEventListener('keypress', handleEnter);
    num2El.addEventListener('keypress', handleEnter);
    operationEl.addEventListener('keypress', handleEnter);
    
    // Автофокус на первом поле
    num1El.focus();
});