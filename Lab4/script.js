function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');

    // Обработка ошибок
    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = '<span class="error">Ошибка: Введите оба числа!</span>';
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultDiv.innerHTML = '<span class="error">Ошибка: Деление на ноль!</span>';
                return;
            }
            result = num1 / num2;
            break;
    }

    resultDiv.innerHTML = `Результат: <strong>${result}</strong>`;
}