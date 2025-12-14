

document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultDiv = document.getElementById('result');
    const resultContainer = document.getElementById('resultContainer');
    const operationIcons = document.querySelectorAll('.operation-icons__item');
    
    // Функция для получения значений из формы
    function getFormValues() {
        return {
            num1: parseFloat(num1Input.value) || 0,
            num2: parseFloat(num2Input.value) || 0,
            operation: operationSelect.value
        };
    }
    
    // Функция для выполнения вычислений
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
                    throw new Error("Деление на ноль невозможно");
                }
                return num1 / num2;
            default:
                throw new Error("Неизвестная операция");
        }
    }
    
    // Функция для получения символа операции
    function getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operation] || '?';
    }
    
    // Функция для отображения результата
    function showResult(message, isError = false) {
        resultDiv.textContent = message;
        
        // Удаляем старые классы
        resultContainer.classList.remove('calculator__result--success', 'calculator__result--error');
        
        // Добавляем новый класс
        resultContainer.classList.add(isError ? 'calculator__result--error' : 'calculator__result--success');
        
        // Прокручиваем к результату
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Функция для установки активной иконки операции
    function setActiveOperationIcon(operation) {
        operationIcons.forEach(icon => {
            icon.classList.remove('operation-icons__item--active');
            if (icon.dataset.operation === operation) {
                icon.classList.add('operation-icons__item--active');
            }
        });
    }
    
    // Функция для сброса формы
    function resetForm() {
        num1Input.value = '';
        num2Input.value = '';
        operationSelect.value = 'add';
        resultDiv.textContent = 'Результат появится здесь';
        resultContainer.classList.remove('calculator__result--success', 'calculator__result--error');
        setActiveOperationIcon('add');
        num1Input.focus();
    }
    
    // Обработчик вычисления
    function handleCalculate() {
        try {
            const { num1, num2, operation } = getFormValues();
            
            // Проверка валидности ввода
            if (isNaN(num1) || isNaN(num2)) {
                showResult("Ошибка: Введите оба числа", true);
                return;
            }
            
            // Выполнение расчета
            const result = calculate(num1, num2, operation);
            const symbol = getOperationSymbol(operation);
            
            // Форматирование результата
            let formattedResult;
            if (result % 1 === 0) {
                formattedResult = result.toString();
            } else {
                formattedResult = parseFloat(result.toFixed(10)).toString();
            }
            
            showResult(`${num1} ${symbol} ${num2} = ${formattedResult}`, false);
            
        } catch (error) {
            showResult(`Ошибка: ${error.message}`, true);
        }
    }
    
    // Инициализация обработчиков событий
    function initEventListeners() {
        // Кнопка вычисления
        calculateBtn.addEventListener('click', handleCalculate);
        
        // Кнопка сброса
        resetBtn.addEventListener('click', resetForm);
        
        // Нажатие Enter в полях ввода
        num1Input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleCalculate();
        });
        
        num2Input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleCalculate();
        });
        
        // Клик по иконкам операций
        operationIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                const operation = this.dataset.operation;
                operationSelect.value = operation;
                setActiveOperationIcon(operation);
            });
        });
        
        // Изменение операции в селекте
        operationSelect.addEventListener('change', function() {
            setActiveOperationIcon(this.value);
        });
    }
    
    // Инициализация при загрузке
    setActiveOperationIcon('add');
    initEventListeners();
});