document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultDisplay = document.getElementById('result');
    const resultStatus = document.getElementById('resultStatus');
    const previewNum1 = document.getElementById('previewNum1');
    const previewNum2 = document.getElementById('previewNum2');
    const previewOperator = document.getElementById('previewOperator');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    
    // Массив для хранения истории операций
    let calculationHistory = [];
    
    // Загружаем историю из localStorage
    loadHistory();
    
    // Функция для обновления предпросмотра операции
    function updatePreview() {
        const num1 = number1Input.value || '0';
        const num2 = number2Input.value || '0';
        const operation = operationSelect.value;
        
        previewNum1.textContent = num1;
        previewNum2.textContent = num2;
        
        // Устанавливаем оператор в зависимости от выбранной операции
        switch(operation) {
            case 'add': previewOperator.textContent = '+'; break;
            case 'subtract': previewOperator.textContent = '-'; break;
            case 'multiply': previewOperator.textContent = '×'; break;
            case 'divide': previewOperator.textContent = '÷'; break;
            case 'power': previewOperator.textContent = '^'; break;
            case 'remainder': previewOperator.textContent = '%'; break;
        }
    }
    
    // Функция для валидации ввода
    function validateInput(value) {
        // Проверяем, является ли значение числом
        if (value === '') return { isValid: true, value: null };
        
        const num = parseFloat(value.replace(',', '.'));
        return {
            isValid: !isNaN(num),
            value: num
        };
    }
    
    // Функция для выполнения вычисления операции
    function performCalculation(num1, num2, operation) {
        let result;
        let operationSymbol;
        let description;
        
        switch(operation) {
            case 'add':
                result = num1 + num2;
                operationSymbol = '+';
                description = 'Сложение';
                break;
                
            case 'subtract':
                result = num1 - num2;
                operationSymbol = '-';
                description = 'Вычитание';
                break;
                
            case 'multiply':
                result = num1 * num2;
                operationSymbol = '×';
                description = 'Умножение';
                break;
                
            case 'divide':
                // Проверка деления на ноль
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно');
                }
                result = num1 / num2;
                operationSymbol = '÷';
                description = 'Деление';
                break;
                
            case 'power':
                result = Math.pow(num1, num2);
                operationSymbol = '^';
                description = 'Возведение в степень';
                break;
                
            case 'remainder':
                // Проверка деления на ноль для остатка
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно');
                }
                result = num1 % num2;
                operationSymbol = '%';
                description = 'Остаток от деления';
                break;
                
            default:
                throw new Error('Неизвестная операция');
        }
        
        return {
            result,
            operationSymbol,
            description
        };
    }
    
    // Функция для отображения результата
    function showResult(result, description, isSuccess = true) {
        if (isSuccess) {
            // Проверка на бесконечность
            if (!isFinite(result)) {
                throw new Error('Результат слишком большой или бесконечный');
            }
            
            // Форматируем результат
            let formattedResult;
            if (Number.isInteger(result)) {
                formattedResult = result.toString();
            } else {
                // Ограничиваем количество знаков после запятой
                formattedResult = parseFloat(result.toFixed(10)).toString();
            }
            
            // Отображаем результат
            resultDisplay.textContent = formattedResult;
            resultDisplay.classList.add('result-pulse');
            
            // Устанавливаем статус
            resultStatus.textContent = `${description} выполнено успешно`;
            resultStatus.style.color = '#28a745';
            
            return formattedResult;
        } else {
            // Отображение ошибки
            resultDisplay.textContent = 'Ошибка';
            resultStatus.textContent = `Ошибка: ${result}`;
            resultStatus.style.color = '#dc3545';
            return null;
        }
    }
    
    // Функция для выполнения вычисления
    function calculate() {
        // Сбрасываем стили ошибок
        resetErrors();
        
        // Валидируем ввод
        const validation1 = validateInput(number1Input.value);
        const validation2 = validateInput(number2Input.value);
        
        let hasError = false;
        
        // Проверяем первое число
        if (!validation1.isValid) {
            showError(number1Input, 'Введите корректное число');
            hasError = true;
        }
        
        // Проверяем второе число
        if (!validation2.isValid) {
            showError(number2Input, 'Введите корректное число');
            hasError = true;
        }
        
        // Если есть ошибки валидации, прерываем выполнение
        if (hasError) {
            resultStatus.textContent = 'Ошибка: введите корректные числа';
            resultStatus.style.color = '#dc3545';
            return;
        }
        
        // Получаем числовые значения
        const num1 = validation1.value || 0;
        const num2 = validation2.value || 0;
        const operation = operationSelect.value;
        
        try {
            // Используем новую функцию для выполнения вычисления
            const calculation = performCalculation(num1, num2, operation);
            
            // Используем функцию для отображения результата
            const formattedResult = showResult(calculation.result, calculation.description, true);
            
            // Добавляем операцию в историю
            addToHistory(num1, num2, calculation.operationSymbol, formattedResult, calculation.description);
            
        } catch (error) {
            // Обработка ошибок вычисления
            showResult(error.message, '', false);
        }
        
        // Удаляем класс анимации через время
        setTimeout(() => {
            resultDisplay.classList.remove('result-pulse');
        }, 500);
    }
    
    // Функция для добавления операции в историю
    function addToHistory(num1, num2, operator, result, description) {
        const historyItem = {
            num1,
            num2,
            operator,
            result,
            description,
            timestamp: new Date().toLocaleTimeString()
        };
        
        // Добавляем в начало массива
        calculationHistory.unshift(historyItem);
        
        // Ограничиваем историю 10 последними операциями
        if (calculationHistory.length > 10) {
            calculationHistory = calculationHistory.slice(0, 10);
        }
        
        // Обновляем отображение истории
        updateHistoryDisplay();
        
        // Сохраняем историю в localStorage
        saveHistory();
    }
    
    // Функция для обновления отображения истории
    function updateHistoryDisplay() {
        // Очищаем список
        historyList.innerHTML = '';
        
        if (calculationHistory.length === 0) {
            // Показываем сообщение об отсутствии истории
            historyList.innerHTML = `
                <div class="history-empty">
                    <i class="fas fa-clock"></i>
                    <p>Здесь будут отображаться ваши последние вычисления</p>
                </div>
            `;
            return;
        }
        
        // Добавляем элементы истории
        calculationHistory.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-operation">
                    <span>${item.num1} ${item.operator} ${item.num2} =</span>
                    <span style="margin-left: 10px; font-size: 0.9rem; color: #6c757d;">${item.timestamp}</span>
                </div>
                <div class="history-result">${item.result}</div>
            `;
            historyList.appendChild(historyElement);
        });
    }
    
    // Функция для очистки истории
    function clearHistory() {
        calculationHistory = [];
        updateHistoryDisplay();
        localStorage.removeItem('calculatorHistory');
    }
    
    // Функция для сохранения истории в localStorage
    function saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
    }
    
    // Функция для загрузки истории из localStorage
    function loadHistory() {
        const savedHistory = localStorage.getItem('calculatorHistory');
        if (savedHistory) {
            calculationHistory = JSON.parse(savedHistory);
            updateHistoryDisplay();
        }
    }
    
    // Функция для сброса всех ошибок
    function resetErrors() {
        number1Input.classList.remove('error-input');
        number2Input.classList.remove('error-input');
        
        // Удаляем все сообщения об ошибках
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }
    
    // Функция для отображения ошибки
    function showError(inputElement, message) {
        inputElement.classList.add('error-input');
        
        // Создаем элемент с сообщением об ошибке
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // Вставляем после input
        inputElement.parentNode.appendChild(errorElement);
    }
    
    // Функция для очистки всех полей
    function clearAll() {
        number1Input.value = '';
        number2Input.value = '';
        operationSelect.value = 'add';
        resultDisplay.textContent = '0';
        resultStatus.textContent = 'Введите числа и нажмите "Вычислить"';
        resultStatus.style.color = '#6c757d';
        
        // Сбрасываем предпросмотр
        updatePreview();
        
        // Сбрасываем ошибки
        resetErrors();
    }
    
    // Назначаем обработчики событий
    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Обновляем предпросмотр при изменении ввода
    number1Input.addEventListener('input', updatePreview);
    number2Input.addEventListener('input', updatePreview);
    operationSelect.addEventListener('change', updatePreview);
    
    // Обработка нажатия клавиши Enter
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
        
        if (event.key === 'Escape') {
            clearAll();
        }
    });
    
    // Инициализируем предпросмотр
    updatePreview();
    
    // Пример заполнения для демонстрации
    setTimeout(() => {
        if (calculationHistory.length === 0) {
            number1Input.value = '15';
            number2Input.value = '3';
            updatePreview();
        }
    }, 500);
});