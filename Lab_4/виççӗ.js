document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const resultContainer = document.getElementById('resultContainer');
    const operationDisplay = document.getElementById('operationDisplay');
    const resultValue = document.getElementById('resultValue');
    const resultStatus = document.getElementById('resultStatus');
    const exampleButtons = document.querySelectorAll('.examples__button');
    
    // Операционные символы для отображения
    const operationSymbols = {
        'add': '+',
        'subtract': '-',
        'multiply': '×',
        'divide': '÷'
    };
    
    // Функция округления с параметром точности
    function roundNumber(number, precision = 6) {
        if (typeof number !== 'number' || isNaN(number)) {
            return number;
        }
        
        const factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    }
    
    // Функция для выполнения вычислений
    function performCalculation(num1, num2, operation) {
        let result, error = false, status = '';
        
        switch(operation) {
            case 'add':
                result = num1 + num2;
                status = 'Сложение выполнено успешно';
                break;
            case 'subtract':
                result = num1 - num2;
                status = 'Вычитание выполнено успешно';
                break;
            case 'multiply':
                result = num1 * num2;
                status = 'Умножение выполнено успешно';
                break;
            case 'divide':
                if (num2 === 0) {
                    error = true;
                    result = "Ошибка: деление на ноль!";
                    status = 'Ошибка вычисления';
                } else {
                    result = roundNumber(num1 / num2);
                    status = 'Деление выполнено успешно';
                }
                break;
            default:
                result = "Неизвестная операция";
                error = true;
                status = 'Ошибка вычисления';
        }
        
        // Возвращаем объект вместо отдельных переменных
        return {
            result: result,
            error: error,
            status: status
        };
    }
    
    // Инициализация значений по умолчанию
    function initializeCalculator() {
        num1Input.value = '15';
        num2Input.value = '7';
        operationSelect.value = 'add';
        
        // Вычисляем первый результат для демонстрации
        setTimeout(() => {
            calculate();
        }, 800);
    }
    
    // Функция для вычисления результата
    function calculate() {
        // Получаем значения из полей ввода
        let num1 = parseFloat(num1Input.value);
        let num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        // Проверка на пустые поля или нечисловые значения
        if (isNaN(num1)) num1 = 0;
        if (isNaN(num2)) num2 = 0;
        
        // Выполняем вычисление через отдельную функцию
        const calculationResult = performCalculation(num1, num2, operation);
        
        // Отображаем результат
        displayResult(num1, num2, operation, calculationResult);
    }
    
    // Функция для отображения результата
    function displayResult(num1, num2, operation, calculationResult) {
        const { result, error: isError, status } = calculationResult;
        
        // Скрываем placeholder и показываем результат
        resultPlaceholder.style.display = 'none';
        resultContainer.classList.remove('result__container--hidden');
        
        // Сбрасываем классы состояния
        resultContainer.classList.remove('result__container--error', 'result__container--success');
        resultStatus.classList.remove('result__status--error', 'result__status--success');
        
        // Отображаем операцию
        const symbol = operationSymbols[operation] || '?';
        operationDisplay.textContent = `${num1} ${symbol} ${num2} =`;
        
        if (isError) {
            // Отображаем ошибку
            resultValue.textContent = result;
            resultContainer.classList.add('result__container--error');
            resultStatus.textContent = status;
            resultStatus.classList.add('result__status--error');
        } else {
            // Отображаем успешный результат
            resultValue.textContent = result;
            resultContainer.classList.add('result__container--success');
            resultStatus.textContent = status;
            resultStatus.classList.add('result__status--success');
            
            // Добавляем анимацию для успешного результата
            resultContainer.style.animation = 'none';
            setTimeout(() => {
                resultContainer.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        }
    }
    
    // Обработчик для кнопки "Вычислить результат"
    calculateButton.addEventListener('click', calculate);
    
    // Обработчики для клавиши Enter в полях ввода
    [num1Input, num2Input, operationSelect].forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calculate();
            }
        });
    });
    
    // Обработчики для быстрых примеров
    exampleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const num1 = this.getAttribute('data-num1');
            const num2 = this.getAttribute('data-num2');
            const operation = this.getAttribute('data-operation');
            
            num1Input.value = num1;
            num2Input.value = num2;
            operationSelect.value = operation;
            
            // Вычисляем результат
            calculate();
            
            // Добавляем анимацию к кнопке
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Валидация ввода
    function setupInputValidation() {
        const inputs = [num1Input, num2Input];
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const value = this.value.trim();
                
                // Если поле пустое или содержит только минус, устанавливаем 0
                if (value === '' || value === '-') {
                    this.value = '0';
                }
                
                // Проверяем, является ли ввод допустимым числом
                if (value !== '' && value !== '-' && !isFinite(value)) {
                    this.value = '0';
                    showTempMessage('Введено недопустимое значение. Установлено значение 0.');
                }
            });
        });
    }
    
    // Функция для временного сообщения
    function showTempMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('temp-message');
        
        // Добавляем стили для анимации
        const style = document.createElement('style');
        style.textContent = `
            .temp-message {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-error);
                color: white;
                padding: 15px 20px;
                border-radius: var(--border-radius-small);
                z-index: 1000;
                box-shadow: var(--shadow-medium);
                font-weight: 500;
                max-width: 300px;
                animation: fadeInOut 3s ease-in-out;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-20px); }
                10% { opacity: 1; transform: translateY(0); }
                90% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(messageDiv);
        
        // Удаляем сообщение через 3 секунды
        setTimeout(() => {
            document.body.removeChild(messageDiv);
            document.head.removeChild(style);
        }, 3000);
    }
    
    // Инициализация валидации и калькулятора
    setupInputValidation();
    initializeCalculator();
});