const operationButtons = document.querySelectorAll('[data-operation]');
const outputElement = document.querySelector('.js-output');
const inputA = document.querySelector('.js-number-a');
const inputB = document.querySelector('.js-number-b');

function sum(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function multiplication(a, b){
    return a * b;
}

function div(a, b){
    return a / b;
}

const OPERATIONS = {
    sum: '+',
    sub: '-',
    multiplication: '*',
    div: '/'
};

let selectedOperation = null;

document.querySelectorAll('[data-operation]').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedOperation = btn.getAttribute('data-operation');
        document.querySelectorAll('[data-operation]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

document.querySelector('.js-btn-calc').addEventListener('click', () => {
    const a = parseFloat(document.querySelector('.js-number-a').value);
    const b = parseFloat(document.querySelector('.js-number-b').value);
    const output = document.querySelector('.js-output');

    if (selectedOperation === null || isNaN(a) || isNaN(b)) {
        output.textContent = "Выберите операцию";
        return;
    }

    if (selectedOperation === '/' && b === 0) {
        output.textContent = "Ошибка: деление на ноль!";
        output.classList.add("error");
        return;
    }

    let result;
    switch (selectedOperation) {
        case '+': result = sum(a, b); break;
        case '-': result = sub(a, b); break;
        case '*': result = multiplication(a, b); break;
        case '/': result = div(a, b); break;
    }
    output.textContent = result;
});

function calculate ({a, b, operation}){
    let result = null;
    switch (operation){
        case OPERATIONS.sum:
            result = sum(a, b);
            break;
        case OPERATIONS.sub:
            result = sub(a, b);
            break;
        case OPERATIONS.multiplication:
            result = multiplication(a, b);
            break;
        case OPERATIONS.div:
            result = div(a, b);
            break;
        default:
            break;
    }
    return result;
}