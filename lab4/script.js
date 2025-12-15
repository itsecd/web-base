// Находим элементы на странице
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
const resultDiv = document.getElementById('result');

// Функции для работы с DOM
function showError(message) {
    resultDiv.textContent = message;
    resultDiv.className = "calculator__result-value calculator__result-value_error";
}

function showSuccess(value) {
    resultDiv.textContent = value;
    resultDiv.className = "calculator__result-value calculator__result-value_success";
}

function resetResult() {
    resultDiv.textContent = '0';
    resultDiv.className = "calculator__result-value";
}

// Функция для получения чисел из полей ввода
function getNumbers() {
    const a = parseFloat(num1.value.replace(',', '.'));
    const b = parseFloat(num2.value.replace(',', '.'));
    return { a, b };
}

// Функция валидации чисел
function validateNumbers(a, b) {
    if (isNaN(a) || isNaN(b)) {
        return "Введите числа!";
    }
    return null; // Ошибок нет
}

// Чистая функция вычислений (без DOM операций)
function calculateOperation(a, b, operationType) {
    switch(operationType) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                throw new Error("На 0 делить нельзя!");
            }
            return a / b;
        default:
            throw new Error("Неизвестная операция");
    }
}

// Функция для форматирования результата
function formatResult(result) {
    if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(4));
        // Убираем лишние нули в конце
        result = parseFloat(result.toString());
    }
    return result;
}

// Основная функция вычисления
function calculate() {
    // Получаем числа
    const { a, b } = getNumbers();
    
    // Валидация
    const validationError = validateNumbers(a, b);
    if (validationError) {
        showError(validationError);
        return;
    }
    
    // Получаем операцию
    const op = operation.value;
    
    try {
        // Вычисляем результат
        let result = calculateOperation(a, b, op);
        
        // Форматируем результат
        result = formatResult(result);
        
        // Показываем результат
        showSuccess(result);
    } catch (error) {
        // Обрабатываем ошибки вычислений
        showError(error.message);
    }
}

// Функция для сброса
function reset() {
    num1.value = '';
    num2.value = '';
    operation.value = 'add';
    resetResult();
    num1.focus();
}

// Назначаем действия кнопкам
calculateBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', reset);

// Enter для вычисления
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculate();
    }
});

// Фокусируемся на первом поле при загрузке
window.addEventListener('DOMContentLoaded', function() {
    num1.focus();
    
    // Валидация при вводе
    [num1, num2].forEach(input => {
        input.addEventListener('input', function() {
            // Убираем ошибку при вводе
            resetResult();
        });
    });
});
