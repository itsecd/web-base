function calculate() {
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const operationEl = document.getElementById('operation');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');


    if (!num1El || !num2El || !operationEl || !resultEl || !errorEl) {
        console.error('Один из элементов не найден на странице');
        return;
    }


    const num1 = num1El.value.trim();
    const num2 = num2El.value.trim();
    const operation = operationEl.value;


    errorEl.textContent = '';


    if (num1 === '' || num2 === '') {
        errorEl.textContent = 'Пожалуйста, заполните оба поля.';
        return;
    }


    const a = Number(num1);
    const b = Number(num2);


    if (isNaN(a) || isNaN(b)) {
    errorEl.textContent = 'Ввод должен быть числом.';
    return;
    }


    let result;
    switch (operation) {
        case 'add': result = a + b; break;
        case 'sub': result = a - b; break;
        case 'mul': result = a * b; break;
        case 'div':
        if (b === 0) {
                errorEl.textContent = 'Деление на ноль невозможно!';
                return;
            }
            result = a / b;
            break;
        default:
            errorEl.textContent = 'Неизвестная операция!';
            return;
    }


    resultEl.textContent = result;
}