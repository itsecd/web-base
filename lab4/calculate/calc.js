// Простой калькулятор - только основные функции

document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const firstNumberInput = document.getElementById('firstNumber');
    const secondNumberInput = document.getElementById('secondNumber');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculateButton');
    const resultValue = document.getElementById('resultValue');
    
    // Элементы для отображения ошибок
    const errorFirst = document.getElementById('errorFirst');
    const errorSecond = document.getElementById('errorSecond');
    const errorOperation = document.getElementById('errorOperation');
    
    // Функция для очистки ошибок
    function clearErrors() {
        errorFirst.textContent = '';
        errorSecond.textContent = '';
        errorOperation.textContent = '';
        
        firstNumberInput.classList.remove('error');
        secondNumberInput.classList.remove('error');
    }
    
    // Функция для проверки ввода
    function validateInputs() {
        let isValid = true;
        clearErrors();
        
        // Проверка первого числа
        if (firstNumberInput.value === '') {
            errorFirst.textContent = 'Введите первое число';
            firstNumberInput.classList.add('error');
            isValid = false;
        } else if (!isFinite(firstNumberInput.value)) {
            errorFirst.textContent = 'Введите корректное число';
            firstNumberInput.classList.add('error');
            isValid = false;
        }
        
        // Проверка второго числа
        if (secondNumberInput.value === '') {
            errorSecond.textContent = 'Введите второе число';
            secondNumberInput.classList.add('error');
            isValid = false;
        } else if (!isFinite(secondNumberInput.value)) {
            errorSecond.textContent = 'Введите корректное число';
            secondNumberInput.classList.add('error');
            isValid = false;
        }
        
        // Проверка деления на ноль
        if (operationSelect.value === 'divide' && parseFloat(secondNumberInput.value) === 0) {
            errorSecond.textContent = 'Деление на ноль невозможно';
            secondNumberInput.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Функция для выполнения вычисления
    function calculate() {
        if (!validateInputs()) {
            resultValue.textContent = 'Ошибка!';
            resultValue.style.color = '#ff4757';
            return;
        }
        
        const a = parseFloat(firstNumberInput.value);
        const b = parseFloat(secondNumberInput.value);
        const operation = operationSelect.value;
        
        let result;
        
        // Выполняем выбранную операцию
        switch(operation) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                result = a / b;
                break;
            default:
                result = 'Ошибка операции';
        }
        
        // Форматируем результат
        if (typeof result === 'number') {
            if (result % 1 === 0) {
                resultValue.textContent = result;
            } else {
                // Ограничиваем до 6 знаков после запятой
                resultValue.textContent = result.toFixed(6).replace(/\.?0+$/, '');
            }
            resultValue.style.color = '#667eea';
        } else {
            resultValue.textContent = result;
            resultValue.style.color = '#ff4757';
        }
    }
    
    // Функция для обработки нажатия клавиши Enter
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    }
    
    // Назначаем обработчики событий
    calculateButton.addEventListener('click', calculate);
    
    // Обработка нажатия Enter в полях ввода
    firstNumberInput.addEventListener('keypress', handleKeyPress);
    secondNumberInput.addEventListener('keypress', handleKeyPress);
    
    // Очистка ошибок при изменении значений
    firstNumberInput.addEventListener('input', clearErrors);
    secondNumberInput.addEventListener('input', clearErrors);
    operationSelect.addEventListener('change', clearErrors);
    
    // Фокусируемся на первом поле ввода
    firstNumberInput.focus();
});