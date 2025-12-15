function updateValue(result) {
    display.textContent = result;
}

function calculate() {
    let result;
    const num1 = parseFloat(number1.value);
    const num2 = parseFloat(number2.value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Введите оба числа!");
        updateValue('-');
        return;
    }

    switch(operatorSelect.value) {
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
                alert("Ошибка: деление на ноль!");
                return;
            } else {
                result = num1 / num2;
            }
            break;
        default:
            return;
    }

    updateValue(result.toFixed(2));
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');

    display = document.getElementById('result');
    number1 = document.getElementById('num1');
    number2 = document.getElementById('num2');
    operatorSelect = document.getElementById('operation');
    calculateButton = document.getElementById('calculate');

    if (!display || !number1 || !number2 || !operatorSelect || !calculateButton) {
        console.error('Ошибка: не найдены элементы HTML');
        return;
    }

    calculateButton.addEventListener('click', calculate);
});
