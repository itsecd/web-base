function compute(num1, num2, operation) {
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
                throw new Error("Деление на ноль!");
            }
            result = num1 / num2;
            break;
        default:
            throw new Error("Неизвестная операция");
    }
    return Math.round(result * 1000000) / 1000000;
}

function displayResult(message, isError = false) {
    const resultDiv = document.getElementById('result');
    if (isError) {
        resultDiv.innerHTML = `<span class="error">${message}</span>`;
    } else {
        resultDiv.innerHTML = `Результат: <strong>${message}</strong>`;
    }
}

function handleCalculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;

    if (isNaN(num1) || isNaN(num2)) {
        displayResult("Ошибка: Введите оба числа!", true);
        return;
    }

    try {
        const result = compute(num1, num2, operation);
        displayResult(result);
    } catch (error) {
        displayResult(error.message, true);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('button');
    button.addEventListener('click', handleCalculate);
});
