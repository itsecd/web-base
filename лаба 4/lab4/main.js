document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы DOM
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    
    // Функция для отображения ошибки
    function showError(message) {
        resultDiv.innerHTML = `<span class="error-text">${message}</span>`;
        resultDiv.className = "result error";
    }
    
    // Функция для отображения результата
    function showResult(num1, num2, operationSymbol, result) {
        const formattedResult = `${num1} ${operationSymbol} ${num2} = <strong>${result}</strong>`;
        resultDiv.innerHTML = formattedResult;
        resultDiv.className = "result success";
    }
    
    // Функция для выполнения всех вычислений
    function calculate() {
        // Получаем значения из полей ввода
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        // Проверяем, что оба числа являются валидными числами
        if (isNaN(num1) || isNaN(num2)) {
            showError("Пожалуйста, введите оба числа");
            return;
        }
        
        // Выполняем вычисление через отдельную функцию
        const calculation = performCalculation(num1, num2, operation);
        
        // Обрабатываем результат
        if (calculation.success) {
            showResult(calculation.num1, calculation.num2, 
                      calculation.operationSymbol, calculation.result);
        } else {
            showError(calculation.message);
        }
    }
    
    // Обработчик события для кнопки "Вычислить"
    calculateBtn.addEventListener('click', calculate);
    
    // Обработчики событий для клавиши Enter
    num1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    num2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    // Автозаполнение примерами для демонстрации
    window.addEventListener('load', function() {
        num1Input.value = "12";
        num2Input.value = "4";
        
        // Выполнить автоматический расчет при загрузке
        setTimeout(calculate, 100);
    });
});