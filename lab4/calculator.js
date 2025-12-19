document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы с проверкой
    const elements = {
        num1: document.getElementById('num1'),
        num2: document.getElementById('num2'),
        operation: document.getElementById('operation'),
        calculateBtn: document.getElementById('calculate'),
        resetBtn: document.getElementById('reset'),
        resultDisplay: document.getElementById('result'),
        historyList: document.getElementById('history')
    };

    // Проверяем, все ли элементы найдены
    const missingElements = [];
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            missingElements.push(key);
            console.error(`Элемент с id="${key}" не найден на странице`);
        }
    }

    // Если какие-то элементы не найдены, выводим сообщение и останавливаем выполнение
    if (missingElements.length > 0) {
        const errorMessage = `Не удалось найти элементы: ${missingElements.join(', ')}. 
                             Калькулятор не может работать корректно.`;
        
        if (elements.resultDisplay) {
            elements.resultDisplay.innerHTML = `
                <div class="calculator__result-error">
                    <div style="font-size: 3rem; color: #ff416c; margin-bottom: 10px;">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div style="font-size: 1.2rem; font-weight: bold; color: #dc3545;">
                        Ошибка загрузки!
                    </div>
                    <div style="margin-top: 10px; color: #6c757d; font-size: 0.9rem;">
                        ${errorMessage}
                    </div>
                </div>
            `;
        } else {
            // Если даже resultDisplay не найден, выводим в консоль
            console.error(errorMessage);
            alert('Ошибка загрузки калькулятора. Проверьте консоль для подробностей.');
        }
        return; // Прекращаем выполнение скрипта
    }

    // Функция для вычисления результата
    function calculate() {
        const num1 = parseFloat(elements.num1.value);
        const num2 = parseFloat(elements.num2.value);
        const operation = elements.operation.value;

        // Проверка на валидность ввода
        if (isNaN(num1) || isNaN(num2)) {
            showError('Пожалуйста, введите оба числа');
            return;
        }

        let result;
        let expression;

        try {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    expression = `${num1} + ${num2}`;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    expression = `${num1} - ${num2}`;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    expression = `${num1} × ${num2}`;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error('Деление на ноль невозможно');
                    }
                    result = num1 / num2;
                    expression = `${num1} ÷ ${num2}`;
                    break;
                case 'power':
                    result = Math.pow(num1, num2);
                    expression = `${num1}^${num2}`;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }

            // Проверка на бесконечность
            if (!isFinite(result)) {
                throw new Error('Результат слишком большой');
            }

            showResult(result, expression);
            addToHistory(expression, result, 'success');

        } catch (error) {
            showError(error.message);
            addToHistory(`${num1} ${getOperationSymbol(operation)} ${num2}`, error.message, 'error');
        }
    }

    // Функция для отображения результата
    function showResult(result, expression) {
        elements.resultDisplay.innerHTML = `
            <div class="calculator__result-success">
                <div style="font-size: 0.9rem; color: #6c757d; margin-bottom: 5px;">
                    <i class="fas fa-calculator"></i> ${expression} =
                </div>
                <div style="font-size: 2.5rem; font-weight: bold; color: #00b09b;">
                    ${result}
                </div>
                <div style="margin-top: 10px; color: #28a745;">
                    <i class="fas fa-check-circle"></i> Успешно вычислено
                </div>
            </div>
        `;
    }

    // Функция для отображения ошибки
    function showError(message) {
        elements.resultDisplay.innerHTML = `
            <div class="calculator__result-error">
                <div style="font-size: 3rem; color: #ff416c; margin-bottom: 10px;">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div style="font-size: 1.2rem; font-weight: bold; color: #dc3545;">
                    Ошибка!
                </div>
                <div style="margin-top: 10px; color: #6c757d;">
                    ${message}
                </div>
            </div>
        `;
    }

    // Функция для добавления в историю
    function addToHistory(expression, result, type) {
        const historyItem = document.createElement('div');
        historyItem.className = `calculator__history-item calculator__history-item--${type}`;
        
        const now = new Date();
        const time = now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });

        if (type === 'success') {
            historyItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${expression}</strong> = <span style="color: #00b09b;">${result}</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #6c757d;">
                        ${time}
                    </div>
                </div>
            `;
        } else {
            historyItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${expression}</strong> - <span style="color: #ff416c;">${result}</span>
                    </div>
                    <div style="font-size: 0.8rem; color: #6c757d;">
                        ${time}
                    </div>
                </div>
            `;
        }

        elements.historyList.insertBefore(historyItem, elements.historyList.firstChild);

        // Ограничиваем историю 10 записями
        if (elements.historyList.children.length > 10) {
            elements.historyList.removeChild(elements.historyList.lastChild);
        }
    }

    // Функция для получения символа операции
    function getOperationSymbol(operation) {
        switch (operation) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            case 'power': return '^';
            default: return '?';
        }
    }

    // Функция для сброса
    function resetCalculator() {
        elements.num1.value = '';
        elements.num2.value = '';
        elements.operation.value = 'add';
        elements.resultDisplay.innerHTML = `
            <div class="calculator__result-placeholder">
                <i class="fas fa-arrow-down"></i>
                <p>Здесь появится результат вычислений</p>
            </div>
        `;
        elements.historyList.innerHTML = '';
        elements.num1.focus();
    }

    // Обработчики событий (добавляем проверку на существование)
    if (elements.calculateBtn) {
        elements.calculateBtn.addEventListener('click', calculate);
    }
    
    if (elements.resetBtn) {
        elements.resetBtn.addEventListener('click', resetCalculator);
    }

    // Обработка нажатия Enter
    [elements.num1, elements.num2, elements.operation].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calculate();
                }
            });
        }
    });

    // Фокусировка на первом поле при загрузке
    if (elements.num1) {
        elements.num1.focus();
    }

    // Добавляем пример в историю при загрузке
    setTimeout(() => {
        if (elements.historyList) {
            addToHistory('5 + 3', 8, 'success');
        }
    }, 1000);
});