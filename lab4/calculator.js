document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const resultDisplay = document.getElementById('result');
    const historyList = document.getElementById('history');

    // Функция для вычисления результата
    function calculate() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;

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
        resultDisplay.innerHTML = `
            <div class="result-success">
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
        resultDisplay.innerHTML = `
            <div class="result-error">
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
        historyItem.className = `history-item ${type}`;
        
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

        historyList.insertBefore(historyItem, historyList.firstChild);

        // Ограничиваем историю 10 записями
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
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
        num1Input.value = '';
        num2Input.value = '';
        operationSelect.value = 'add';
        resultDisplay.innerHTML = `
            <div class="result-placeholder">
                <i class="fas fa-arrow-down"></i>
                <p>Здесь появится результат вычислений</p>
            </div>
        `;
        historyList.innerHTML = '';
        num1Input.focus();
    }

    // Обработчики событий
    calculateBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', resetCalculator);

    // Обработка нажатия Enter
    [num1Input, num2Input, operationSelect].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });

    // Фокусировка на первом поле при загрузке
    num1Input.focus();

    // Добавляем пример в историю при загрузке
    setTimeout(() => {
        addToHistory('5 + 3', 8, 'success');
    }, 1000);
});