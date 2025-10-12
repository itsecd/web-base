// Получаем элементы
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate');
const resultOutput = document.getElementById('result');
const errorMessage = document.getElementById('error');

// Функция вычисления
function calculate() {
    // Сбрасываем ошибки
    errorMessage.style.display = 'none';
    // Поля ввода
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    if (isNaN(num1) || isNaN(num2)) {
        showError('Пожалуйста, введите оба числа');
        return;
    }
    let result;
    // Выполняем операцию в зависимости от выбора
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
                showError('Нельзя делить на ноль!');
                return;
            }
            result = num1 / num2;
            break;
    }
    resultOutput.textContent = result;
}
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Назначаем евент
calculateBtn.addEventListener('click', calculate);