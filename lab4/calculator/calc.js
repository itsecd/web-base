document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса калькулятора
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation-select');
    const calculateButton = document.getElementById('calculate');
    const resultValue = document.getElementById('result-value');
    
    // Обработчик нажатия на кнопку "Вычислить"
    calculateButton.addEventListener('click', calculate);
    
    // Также можно вычислять при нажатии Enter в любом поле ввода
    num1Input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') calculate();
    });
    
    num2Input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') calculate();
    });
    
    // Основная функция вычисления
    function calculate() {
        // Получаем значения из полей ввода
        const num1Str = num1Input.value.trim();
        const num2Str = num2Input.value.trim();
        
        // Проверка на пустые поля
        if (num1Str === '' || num2Str === '') {
            showError('Пожалуйста, заполните оба поля с числами');
            return;
        }
        
        // Преобразуем строки в числа
        const num1 = parseFloat(num1Str.replace(',', '.'));
        const num2 = parseFloat(num2Str.replace(',', '.'));
        
        // Проверка на корректность чисел
        if (isNaN(num1) || isNaN(num2)) {
            showError('Пожалуйста, введите корректные числа');
            return;
        }
        
        // Получаем выбранную операцию
        const operation = operationSelect.value;
        let result;
        let operationSymbol;
        
        // Выполняем выбранную операцию
        try {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    operationSymbol = '+';
                    break;
                case 'subtract':
                    result = num1 - num2;
                    operationSymbol = '−';
                    break;
                case 'multiply':
                    result = num1 * num2;
                    operationSymbol = '×';
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error('Деление на ноль');
                    }
                    result = num1 / num2;
                    operationSymbol = '÷';
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            
            // Проверка на бесконечность или слишком большое число
            if (!isFinite(result)) {
                throw new Error('Результат слишком велик или мал');
            }
            
            // Отображаем результат
            showResult(result);
            
        } catch (error) {
            // Обработка ошибок
            if (error.message === 'Деление на ноль') {
                showError('Ошибка: деление на ноль невозможно');
            } else if (error.message === 'Результат слишком велик или мал') {
                showError('Ошибка: результат слишком велик или мал');
            } else {
                showError(`Ошибка: ${error.message}`);
            }
        }
    }
    
    // Функция отображения результата
    function showResult(value) {
        resultValue.textContent = value;
        resultValue.className = 'calculator__result-value calculator__result-value_success';
        
        // Автоматическое скругление для длинных десятичных дробей
        if (String(value).length > 10) {
            resultValue.textContent = value.toFixed(6);
        }
    }
    
    // Функция отображения ошибки
    function showError(message) {
        resultValue.textContent = message;
        resultValue.className = 'calculator__result-value calculator__result-value_error';
    }
});