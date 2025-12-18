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

function showError(message) {
    errorEl.textContent = message;
}

function clearError() {
    errorEl.textContent = '';
}

function showResult(value) {
    resultEl.textContent = Number.isInteger(value)
        ? value
        : value.toFixed(4);
}

function clearResult() {
    resultEl.textContent = '—';
}

function readInputs() {
    state.a = parseFloat(aInput.value);
    state.b = parseFloat(bInput.value);
    state.op = opSelect.value;
}

function validateState(state) {
    if (isNaN(state.a) || isNaN(state.b)) {
        return 'Please enter both numbers';
    }

    if (state.op === '/' && state.b === 0) {
        return 'Division by zero is not allowed';
    }

    return null;
}

function compute(state) {
    switch (state.op) {
        case '+':
            return state.a + state.b;
        case '-':
            return state.a - state.b;
        case '*':
            return state.a * state.b;
        case '/':
            return state.a / state.b;
        default:
            return null;
    }
}

function calculate() {
    clearError();
    clearResult();

    readInputs();

    const error = validateState(state);
    if (error) {
        showError(error);
        return;
    }

    const result = compute(state);
    showResult(result);
}

button.addEventListener('click', calculate);
