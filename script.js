function calculate() {
    // Получаем элементы
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const operationEl = document.getElementById('operation');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');
    
    // Сбрасываем ошибки и результат
    errorEl.textContent = '';
    resultEl.textContent = '—';
    resultEl.style.color = '#2c3e50';
    
    // Получаем значения
    const num1 = num1El.value.trim();
    const num2 = num2El.value.trim();
    const operation = operationEl.value;
    
    // Проверка 1: Пустые поля
    if (num1 === '' || num2 === '') {
        errorEl.textContent = '❌ Пожалуйста, заполните оба поля!';
        return;
    }
    
    // Преобразуем в числа
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    
    // Проверка 2: Корректные числа
    if (isNaN(a) || isNaN(b)) {
        errorEl.textContent = '❌ Введите корректные числа!';
        return;
    }
    
    // Выполняем операцию
    let result;
    let operationSymbol;
    
    switch (operation) {
        case 'add':
            result = a + b;
            operationSymbol = '+';
            break;
        case 'sub':
            result = a - b;
            operationSymbol = '-';
            break;
        case 'mul':
            result = a * b;
            operationSymbol = '×';
            break;
        case 'div':
            // Проверка 3: Деление на ноль
            if (b === 0) {
                errorEl.textContent = '❌ Деление на ноль невозможно!';
                return;
            }
            result = a / b;
            operationSymbol = '÷';
            break;
        default:
            errorEl.textContent = '❌ Неизвестная операция!';
            return;
    }
    
    // Форматируем результат (убираем лишние нули после запятой)
    if (Number.isInteger(result)) {
        resultEl.textContent = `${a} ${operationSymbol} ${b} = ${result}`;
    } else {
        resultEl.textContent = `${a} ${operationSymbol} ${b} = ${result.toFixed(4)}`;
    }
    
    // Добавляем цвет для положительных/отрицательных результатов
    if (result > 0) {
        resultEl.style.color = '#27ae60';
    } else if (result < 0) {
        resultEl.style.color = '#e74c3c';
    }
    
    // Сбрасываем ошибку, если вычисление прошло успешно
    errorEl.textContent = '✅ Вычисление выполнено успешно!';
    errorEl.style.color = '#27ae60';
}

// Добавляем обработчик нажатия Enter
document.addEventListener('DOMContentLoaded', function() {
    // Обработка Enter в полях ввода
    document.getElementById('num1').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    document.getElementById('num2').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    // Обработка Enter в select
    document.getElementById('operation').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    // Автофокус на первом поле
    document.getElementById('num1').focus();
});