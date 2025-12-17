const OPERATIONS = {
    sum: '+',
    sub: '-',
    multiplication: '*',
    div: '/'
};

const sum = (a, b) => a + b
const sub = (a, b) => a - b
const multiplication = (a, b) => a * b
const div = (a, b) => a / b

let selectedOperation = null;

document.querySelectorAll('.operations__button').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedOperation = btn.getAttribute('data-operation');
    });
});

const calcButton = document.querySelector('.calculator__calculate-button');
if (calcButton) {
    document.querySelector('.calculator__calculate-button').addEventListener('click', () => {
        const inputA = document.querySelector('.calculator__input-first');
        const inputB = document.querySelector('.calculator__input-second');

        if (!inputA || !inputB) {
            output.textContent = "Поля ввода не найдены, увы(";
            return;
        }
        
        const a = parseFloat(inputA?.value);
        const b = parseFloat(inputB?.value);

        const output = document.querySelector('.calculator__output');
        
        if (selectedOperation === '/' && b === 0) {
            output.textContent = "Деление на ноль(";
            output.classList.add("error");
            return;
        }
        if (selectedOperation === null || isNaN(a) || isNaN(b)) {
            output.textContent = "Введите число и выберите операцию.";
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
} else {
    console.error('Кнопка не найдена, увынск(');

}
