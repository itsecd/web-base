document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы интерфейса с проверкой на существование
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation-select');
    const calculateButton = document.getElementById('calculate');
    const resultValue = document.getElementById('result-value');
    
    // Проверяем, что все необходимые элементы найдены
    if (!num1Input || !num2Input || !operationSelect || !calculateButton || !resultValue) {
        console.error('Один из необходимых элементов калькулятора не найден');
        alert('Ошибка загрузки калькулятора. Пожалуйста, перезагрузите страницу.');
        return;
    }
    
    // Инициализация калькулятора
    initCalculator();
    
    // Функция инициализации калькулятора
    function initCalculator() {
        // Создаем элемент для отображения результата
        let resultElement = document.createElement('div');
        resultElement.className = 'result-text';
        
        // Добавляем элемент для результата
        resultValue.appendChild(resultElement);
        
        // Инициализация результата
        updateResult('—', 'placeholder');
        
        // Навешиваем обработчики событий
        setupEventListeners();
        
        // Фокус на первом поле при загрузке
        setTimeout(() => {
            num1Input.focus();
        }, 500);
    }
    
    // Функция настройки обработчиков событий
    function setupEventListeners() {
        // Обработчик нажатия на кнопку "Вычислить"
        calculateButton.addEventListener('click', calculate);
        
        // Обработчик нажатия Enter в полях ввода
        num1Input.addEventListener('keyup', handleEnterKey);
        num2Input.addEventListener('keyup', handleEnterKey);
        operationSelect.addEventListener('keyup', handleEnterKey);
    }
    
    // Обработчик нажатия клавиши Enter
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    }
    
    // Основная функция вычисления
    function calculate() {
        // Получаем значения из полей ввода
        const num1Str = num1Input.value.trim();
        const num2Str = num2Input.value.trim();
        
        // Проверка на пустые поля
        if (num1Str === '' || num2Str === '') {
            updateResult('Введите оба числа', 'error');
            shakeInputs();
            return;
        }
        
        // Преобразуем строки в числа
        const num1 = parseFloat(num1Str.replace(',', '.'));
        const num2 = parseFloat(num2Str.replace(',', '.'));
        
        // Проверка на корректность чисел
        if (isNaN(num1) || isNaN(num2)) {
            updateResult('Некорректные числа', 'error');
            shakeInputs();
            return;
        }
        
        // Получаем выбранную операцию
        const operation = operationSelect.value;
        
        // Выполняем выбранную операцию
        performCalculation(num1, num2, operation);
    }
    
    // Функция выполнения расчета
    function performCalculation(num1, num2, operation) {
        let result;
        
        try {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error('Деление на ноль');
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            
            // Проверка на бесконечность или слишком большое число
            if (!isFinite(result)) {
                throw new Error('Слишком большое число');
            }
            
            // Форматируем результат
            const formattedResult = formatResult(result);
            
            // Отображаем результат
            updateResult(formattedResult, 'success');
            
            // Анимация успешного вычисления
            animateSuccess();
            
        } catch (error) {
            // Обработка ошибок
            handleCalculationError(error);
        }
    }
    
    // Функция обработки ошибок расчета
    function handleCalculationError(error) {
        let errorMessage;
        
        switch (error.message) {
            case 'Деление на ноль':
                errorMessage = 'Деление на ноль невозможно';
                break;
            case 'Слишком большое число':
                errorMessage = 'Слишком большое число';
                break;
            default:
                errorMessage = `Ошибка: ${error.message}`;
        }
        
        updateResult(errorMessage, 'error');
        shakeInputs();
    }
    
    // Функция форматирования результата
    function formatResult(value) {
        // Если число целое, отображаем без десятичных знаков
        if (Number.isInteger(value)) {
            return value.toString();
        }
        
        // Для дробных чисел ограничиваем количество знаков после запятой
        const rounded = Math.round(value * 1000000) / 1000000;
        
        // Преобразуем в строку и удаляем лишние нули
        let resultStr = rounded.toString();
        
        // Если число слишком длинное, используем экспоненциальную запись
        if (resultStr.length > 12) {
            return rounded.toExponential(6);
        }
        
        return resultStr;
    }
    
    // Функция обновления результата
    function updateResult(value, type = 'placeholder') {
        const resultElement = resultValue.querySelector('.result-text');
        
        if (!resultElement) {
            console.error('Элемент результата не найден');
            return;
        }
        
        resultElement.textContent = value;
        resultElement.className = 'result-text';
        
        if (type === 'success') {
            resultElement.classList.add('success');
        } else if (type === 'error') {
            resultElement.classList.add('error');
        }
        
        // Анимация появления нового результата
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            resultElement.style.transition = 'all 0.3s ease';
            resultElement.style.opacity = '1';
            resultElement.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Анимация встряхивания при ошибке
    function shakeInputs() {
        const inputs = [num1Input, num2Input];
        
        inputs.forEach(input => {
            if (!input) return;
            
            input.style.transition = 'none';
            input.style.transform = 'translateX(0)';
            
            // Быстрая анимация встряхивания
            setTimeout(() => {
                input.style.transition = 'transform 0.1s ease';
                input.style.transform = 'translateX(-5px)';
                
                setTimeout(() => {
                    input.style.transform = 'translateX(5px)';
                    
                    setTimeout(() => {
                        input.style.transform = 'translateX(-5px)';
                        
                        setTimeout(() => {
                            input.style.transform = 'translateX(5px)';
                            
                            setTimeout(() => {
                                input.style.transform = 'translateX(0)';
                            }, 50);
                        }, 50);
                    }, 50);
                }, 50);
            }, 10);
        });
    }
    
    // Анимация успешного вычисления
    function animateSuccess() {
        const resultElement = resultValue.querySelector('.result-text');
        
        if (!resultElement) return;
        
        resultElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            resultElement.style.transform = 'scale(1)';
        }, 200);
    }
});