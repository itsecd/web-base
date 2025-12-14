// Находим элементы на странице
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
const resultDiv = document.getElementById('result');

// Функция для вычисления
function calculate() {
    // Получаем числа
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    
    // Проверка чисел
    if (isNaN(a) || isNaN(b)) {
        resultDiv.textContent = "Введите числа!";
        resultDiv.className = "calculator__result-value calculator__result-value_error";
        return;
    }
    
    // Выполняем операцию
    const op = operation.value;
    let result;
    
    if (op === 'add') {
        result = a + b;
    } else if (op === 'subtract') {
        result = a - b;
    } else if (op === 'multiply') {
        result = a * b;
    } else if (op === 'divide') {
        if (b === 0) {
            resultDiv.textContent = "На 0 делить нельзя!";
            resultDiv.className = "calculator__result-value calculator__result-value_error";
            return;
        }
        result = a / b;
    }
    
    // Округляем если много цифр после запятой
    if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(4));
    }
    
    // Показываем результат
    resultDiv.textContent = result;
    resultDiv.className = "calculator__result-value calculator__result-value_success";
}

// Функция для сброса
function reset() {
    num1.value = '';
    num2.value = '';
    operation.value = 'add';
    resultDiv.textContent = '0';
    resultDiv.className = "calculator__result-value";
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
window.addEventListener('load', function() {
    num1.focus();
});