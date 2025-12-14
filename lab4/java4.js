function calculate() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const resultDiv = document.getElementById('result');

    if (!num1Input || !num2Input || !operationSelect || !resultDiv) {
        console.error('Один из элементов не найден.');
        resultDiv.innerHTML = '<span class="error">Произошла ошибка. Пожалуйста, обновите страницу.</span>';
        return;
    }

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.innerHTML = '<span class="error">Введите корректные числа!</span>';
        return;
    }

    let result;

    switch(operation) {
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
                resultDiv.innerHTML = '<span class="error">Деление на ноль запрещено!</span>';
                return;
            }
            result = num1 / num2;
            break;
        default:
            resultDiv.innerHTML = '<span class="error">Неизвестная операция!</span>';
            return;
    }

    resultDiv.innerHTML = `= ${result}`;
}