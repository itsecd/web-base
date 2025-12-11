document.addEventListener("DOMContentLoaded", () => {
    const sum = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const multiplication = (a, b) => a * b;
    const div = (a, b) => a / b;

    const inputA = document.querySelector('input.calculator__input-number-a');
    const inputB = document.querySelector('input.calculator__input-number-b');
    const operationButtons = document.querySelectorAll('button.operations__button');
    const calcButton = document.querySelector('button.calculator__calc-button');
    const output = document.querySelector('div.calculator__output');
    const body = document.querySelector('body');

    if (!inputA || !inputB || operationButtons.length === 0 || !calcButton || !output || !body) {
        console.error('Ошибка: не все элементы найдены на странице!');
        return;
    }

    let selectedOperation = null;

    operationButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedOperation = btn.getAttribute('data-operation');
            operationButtons.forEach(b => b.classList.remove('operations__button-active'));
            btn.classList.add('operations__button-active');
        });
    });

    calcButton.addEventListener('click', () => {
        const a = parseFloat(inputA.value);
        const b = parseFloat(inputB.value);

        if (selectedOperation === null || isNaN(a) || isNaN(b)) {
          if (selectedOperation === null) {
              output.textContent = "Выберите операцию!";
          } else {
              output.textContent = "Введите оба числа!";
          }

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

        if (result === 100503) {
            output.textContent = "ИБАС <3";
            body.classList.add('ibas-mode');
        } else {
            output.textContent = `${a} ${selectedOperation} ${b} = ${result}`;
            body.classList.remove('ibas-mode');
        }
    });
});