document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const clearButton = document.getElementById('clear');
    const clearHistoryButton = document.getElementById('clearHistory');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');
    const errorTextElement = document.querySelector('.calculator__error-text');
    const historyList = document.getElementById('historyList');

    // Загрузка истории из localStorage
    let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];

    // Функция для отображения истории
    function renderHistory() {
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.className = 'calculator__history-item calculator__history-item--empty';
            emptyItem.textContent = 'История пуста';
            historyList.appendChild(emptyItem);
            return;
        }
        
        // Отображаем последние 10 вычислений
        history.slice(-10).reverse().forEach(item => {
            const historyItem = document.createElement('li');
            historyItem.className = 'calculator__history-item';
            
            const expressionSpan = document.createElement('span');
            expressionSpan.className = 'calculator__history-expression';
            expressionSpan.textContent = item.expression;
            
            const resultSpan = document.createElement('span');
            resultSpan.className = 'calculator__history-result';
            resultSpan.textContent = `= ${item.result}`;
            
            historyItem.appendChild(expressionSpan);
            historyItem.appendChild(resultSpan);
            historyList.appendChild(historyItem);
        });
    }

    // Инициализация истории
    renderHistory();

    // Функция для проверки числа
    function isValidNumber(numStr) {
        // Разрешаем отрицательные числа, десятичные дроби
        const numRegex = /^-?\d*\.?\d+$/;
        return numRegex.test(numStr.trim()) && numStr.trim() !== '';
    }

    // Функция для парсинга числа
    function parseNumber(numStr) {
        const num = parseFloat(numStr.trim());
        // Проверяем, что это конечное число
        if (isNaN(num) || !isFinite(num)) {
            return null;
        }
        return num;
    }

    // Функция для выполнения операции
    function calculate(num1, num2, operation) {
        switch(operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно!');
                }
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    // Функция для получения символа операции
    function getOperationSymbol(operation) {
        switch(operation) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '?';
        }
    }

    // Функция для форматирования числа
    function formatNumber(num) {
        // Если число целое, показываем без десятичной части
        if (Number.isInteger(num)) {
            return num.toString();
        }
        // Иначе показываем с округлением до 4 знаков
        return parseFloat(num.toFixed(4)).toString();
    }

    // Функция для отображения результата
    function showResult(result, expression) {
        resultElement.textContent = formatNumber(result);
        resultElement.style.color = '#212529';
        
        // Прячем ошибку если она была показана
        errorElement.style.display = 'none';
        
        // Добавляем в историю
        history.push({
            expression: expression,
            result: formatNumber(result)
        });
        
        // Сохраняем историю в localStorage
        localStorage.setItem('calculatorHistory', JSON.stringify(history));
        
        // Обновляем отображение истории
        renderHistory();
    }

    // Функция для отображения ошибки
    function showError(message) {
        resultElement.textContent = 'Ошибка!';
        resultElement.style.color = '#c92a2a';
        
        errorTextElement.textContent = message;
        errorElement.style.display = 'flex';
        
        // Добавляем анимацию тряски
        errorElement.style.animation = 'none';
        setTimeout(() => {
            errorElement.style.animation = 'shake 0.5s';
        }, 10);
    }

    // Функция для очистки всех полей
    function clearAll() {
        number1Input.value = '';
        number2Input.value = '';
        operationSelect.value = 'add';
        resultElement.textContent = 'Ожидание вычисления...';
        resultElement.style.color = '#212529';
        errorElement.style.display = 'none';
        
        // Фокус на первое поле
        number1Input.focus();
    }

    // Функция для очистки истории
    function clearHistory() {
        if (confirm('Вы уверены, что хотите очистить историю вычислений?')) {
            history = [];
            localStorage.removeItem('calculatorHistory');
            renderHistory();
        }
    }

    // Обработчик кнопки "Вычислить"
    calculateButton.addEventListener('click', function() {
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        const operation = operationSelect.value;
        
        // Проверка ввода
        if (!isValidNumber(num1Str)) {
            showError('Пожалуйста, введите корректное первое число!');
            number1Input.focus();
            return;
        }
        
        if (!isValidNumber(num2Str)) {
            showError('Пожалуйста, введите корректное второе число!');
            number2Input.focus();
            return;
        }
        
        // Парсинг чисел
        const num1 = parseNumber(num1Str);
        const num2 = parseNumber(num2Str);
        
        if (num1 === null) {
            showError('Первое число некорректно!');
            number1Input.focus();
            return;
        }
        
        if (num2 === null) {
            showError('Второе число некорректно!');
            number2Input.focus();
            return;
        }
        
        try {
            // Выполнение вычисления
            const result = calculate(num1, num2, operation);
            
            // Формирование выражения для истории
            const expression = `${formatNumber(num1)} ${getOperationSymbol(operation)} ${formatNumber(num2)}`;
            
            // Отображение результата
            showResult(result, expression);
            
        } catch (error) {
            showError(error.message);
        }
    });

    // Обработчик кнопки "Очистить"
    clearButton.addEventListener('click', clearAll);

    // Обработчик кнопки "Очистить историю"
    clearHistoryButton.addEventListener('click', clearHistory);

    // Обработчик клавиши Enter в полях ввода
    [number1Input, number2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateButton.click();
            }
        });
    });

    // Обработчик клавиши Enter в select
    operationSelect.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateButton.click();
        }
    });

    // Обработчик изменения операции для предпросмотра
    operationSelect.addEventListener('change', function() {
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        
        if (isValidNumber(num1Str) && isValidNumber(num2Str)) {
            const num1 = parseNumber(num1Str);
            const num2 = parseNumber(num2Str);
            
            if (num1 !== null && num2 !== null && num2 !== 0) {
                try {
                    const result = calculate(num1, num2, operationSelect.value);
                    resultElement.textContent = `${formatNumber(num1)} ${getOperationSymbol(operationSelect.value)} ${formatNumber(num2)} = ${formatNumber(result)}`;
                    resultElement.style.color = '#495057';
                } catch (error) {
                    // Игнорируем ошибки при предпросмотре
                }
            }
        }
    });

    // Инициализация
    clearAll();
    
    // Анимация появления
    document.querySelector('.calculator__body').style.opacity = '0';
    document.querySelector('.calculator__body').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.querySelector('.calculator__body').style.transition = 'opacity 0.5s, transform 0.5s';
        document.querySelector('.calculator__body').style.opacity = '1';
        document.querySelector('.calculator__body').style.transform = 'translateY(0)';
    }, 100);
});