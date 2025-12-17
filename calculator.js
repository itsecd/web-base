// Основные элементы DOM
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

// Обновление иконки операции при изменении выбора
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

// Функция для валидации ввода
function validateInputs() {
    let isValid = true;
    
    // Проверка первого числа
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
    
    // Проверка второго числа
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

// Вспомогательные функции для отображения подсказок
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

// Функция для сброса стилей ввода
function resetInputStyles() {
    [num1Input, num2Input].forEach(input => {
        input.style.borderColor = '#e0e0e0';
        input.style.boxShadow = 'none';
    });
    
    [hint1, hint2].forEach(hint => {
        hint.textContent = 'Введите любое число';
        hint.style.color = '#777';
    });
}

// Основная функция вычисления
function calculate() {
    // Сначала валидируем ввод
    if (!validateInputs()) {
        resultElement.textContent = 'Ошибка ввода';
        resultElement.className = 'error';
        calculationInfo.textContent = 'Пожалуйста, исправьте ошибки в полях ввода';
        return;
    }
    
    // Получаем значения
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    let result;
    let operationSymbol = '';
    let errorMessage = '';
    
    // Выполняем выбранную операцию
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
            // Проверка деления на ноль
            if (num2 === 0) {
                errorMessage = 'Деление на ноль невозможно';
                resultElement.textContent = 'Ошибка: Деление на ноль';
                resultElement.className = 'error';
                calculationInfo.textContent = errorMessage;
                highlightInputError(num2Input);
                showHintError(hint2, 'Нельзя делить на ноль');
                return;
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        default:
            errorMessage = 'Неизвестная операция';
    }
    
    // Если не было ошибок, отображаем результат
    if (!errorMessage) {
        // Форматируем результат
        const formattedResult = parseFloat(result.toFixed(10));
        resultElement.textContent = formattedResult;
        resultElement.className = 'success';
        
        // Показываем информацию о вычислении
        calculationInfo.textContent = `${num1} ${operationSymbol} ${num2} = ${formattedResult}`;
        
        // Добавляем небольшую анимацию к результату
        resultElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            resultElement.style.transform = 'scale(1)';
        }, 300);
    }
}

// Функция для очистки всех полей
function clearAll() {
    num1Input.value = '';
    num2Input.value = '';
    operationSelect.selectedIndex = 0;
    resultElement.textContent = 'Введите числа и выберите операцию';
    resultElement.className = 'info';
    calculationInfo.textContent = '';
    
    resetInputStyles();
    updateOperationIcon();
    
    // Фокус на первое поле ввода
    num1Input.focus();
}

// Обработчики событий
calculateBtn.addEventListener('click', calculate);

clearBtn.addEventListener('click', clearAll);

// Обработчик нажатия клавиши Enter
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        calculate();
    }
}

num1Input.addEventListener('keypress', handleEnterKey);
num2Input.addEventListener('keypress', handleEnterKey);
operationSelect.addEventListener('keypress', handleEnterKey);

// Сброс результата при изменении ввода
function resetResultOnInput() {
    if (resultElement.className !== 'info') {
        resultElement.textContent = 'Введите числа и выберите операцию';
        resultElement.className = 'info';
        calculationInfo.textContent = '';
        resetInputStyles();
    }
}

num1Input.addEventListener('input', resetResultOnInput);
num2Input.addEventListener('input', resetResultOnInput);
operationSelect.addEventListener('change', resetResultOnInput);

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    updateOperationIcon();
    num1Input.focus();
    
    // Добавляем подсказки при фокусе
    num1Input.addEventListener('focus', function() {
        hint1.textContent = 'Можно использовать десятичные числа (например: 3.14)';
    });
    
    num1Input.addEventListener('blur', function() {
        if (num1Input.value.trim() === '') {
            hint1.textContent = 'Введите любое число';
        }
    });
    
    num2Input.addEventListener('focus', function() {
        hint2.textContent = 'Можно использовать десятичные числа (например: -2.5)';
    });
    
    num2Input.addEventListener('blur', function() {
        if (num2Input.value.trim() === '') {
            hint2.textContent = 'Введите любое число';
        }
    });
});