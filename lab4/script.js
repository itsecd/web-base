const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate');
const resultDiv = document.getElementById('result');

calculateBtn.addEventListener('click', () => {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const op = operationSelect.value;

    if (isNaN(num1) || isNaN(num2)) {
        resultDiv.textContent = 'Ошибка: неккоректный ввод!';
        return;
    }

    let result;
    switch(op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            if (num2 === 0) {
                resultDiv.textContent = 'Ошибка: деление на ноль!';
                return;
            }
            result = num1 / num2; 
            break;
        default: result = 'Ошибка'; 
    }

    resultDiv.textContent = 'Результат: ' + result;
});