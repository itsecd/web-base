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

document.querySelectorAll('.operations__button').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedOperation = btn.getAttribute('data-operation');
    document.querySelectorAll('.operations__button').forEach(b => b.classList.remove('operations__button-active'));
    btn.classList.add('operations__button-active');
  });
});

const calcButton = document.querySelector('.calculator__calc-button');

if (calcButton) {
  document.querySelector('.calculator__calc-button').addEventListener('click', () => {
    const inputA = document.querySelector('.calculator__input-number-a');
    const inputB = document.querySelector('.calculator__input-number-b');
    const a = parseFloat(inputA?.value);
    const b = parseFloat(inputB?.value);
    const output = document.querySelector('.calculator__output');
    const body = document.querySelector('body');

    if (selectedOperation === null || isNaN(a) || isNaN(b)) {
      output.textContent = "Введите число!";
      body.classList.remove('ibas-mode');
      return;
    }

    if (selectedOperation === '/' && b === 0) {
      output.textContent = "Ошибка: деление на ноль!";
      output.classList.add("error");
      body.classList.remove('ibas-mode');
      return;
    }

    let result;
    switch (selectedOperation) {
      case '+': result = sum(a, b); break;
      case '-': result = sub(a, b); break;
      case '*': result = multiplication(a, b); break;
      case '/': result = div(a, b); break;
    }

    if (result === 100503) {
      output.textContent = "ИБАС <3";
      body.classList.add('ibas-mode');
    } else {
      output.textContent = result;
      body.classList.remove('ibas-mode');
    }
  });
} else {
  console.error('Кнопка не найдена');
}
