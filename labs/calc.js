
const sum = (a, b) => a + b

const sub = (a, b) => a - b

const multiplication = (a, b) => a * b

const div = (a, b) => a / b

const OPERATIONS = {
    sum: '+',
    sub: '-',
    multiplication: '*',
    div: '/'
};

let selectedOperation = null;

document.querySelectorAll('.calculator__button').forEach(btn => {
    btn.addEventListener('click', () => {
        selectedOperation = btn.getAttribute('data-operation');
        document.querySelectorAll('.calculator__button').forEach(b => b.classList.remove('.calculator__button-active'));
        btn.classList.add('.calculator__button-active');
    });
});

const calcButton = document.querySelector('.calculator__calc-button');
if (calcButton) {
    document.querySelector('.calculator__calc-button').addEventListener('click', () => {
        const a = parseFloat(document.querySelector('.calculator__input-number-a').value);
        const b = parseFloat(document.querySelector('.calculator__input-number-b').value);
        const output = document.querySelector('.calculator__output');

        if (selectedOperation === null || isNaN(a) || isNaN(b)) {
            output.textContent = "Введите число!";
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
} else {
    console.error('Кнопка не найдена');
}
