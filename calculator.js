const state = {
    a: null,
    b: null,
    op: '+'
};

const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const opSelect = document.getElementById('op');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const button = document.getElementById('calcBtn');

function calculate() {
    errorEl.textContent = '';
    resultEl.textContent = '—';

    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const op = opSelect.value;

    if (isNaN(a) || isNaN(b)) {
        errorEl.textContent = 'Please enter both numbers';
        return;
    }

    if (op === '/' && b === 0) {
        errorEl.textContent = 'Division by zero is not allowed';
        return;
    }

    let result;
    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }

    resultEl.textContent = Number.isInteger(result)
        ? result
        : result.toFixed(4);
}

button.addEventListener('click', calculate);
