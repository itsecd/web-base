const num1 = document.querySelector('.inputs__input-form--num1');
const num2 = document.querySelector('.inputs__input-form--num2');
const operation = document.querySelector('.inputs__select--operation');
const output = document.querySelector('.result__output');
const button = document.querySelector('.calc__button');
const historyList = document.querySelector('.history__list');

if (!num1 || !num2 || !operation || !output || !button || !historyList) {
  console.error('Interface Error☠ ');
} else {
  button.addEventListener('click', () => {
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    if (isNaN(a) || isNaN(b)) {
      output.textContent = "Error: input must be a number!";
      return;
    }
    let result;
    let opSymbol;
    switch (operation.value) {
      case 'add':
        result = a + b;
        opSymbol = '+';
        break;
      case 'subtract':
        result = a - b;
        opSymbol = '-';
        break;
      case 'multiply':
        result = a * b;
        opSymbol = '×';
        break;
      case 'divide':
        if (b === 0) {
          output.textContent = "Error: divide by Zero!";
          return;
        }
        result = a / b;
        opSymbol = '÷';
        break;
      default:
        result = 0;
    }
    result = parseFloat(result.toFixed(2));
    // вывод результата
    output.textContent = result;
    // создаём элемент истории
    const item = document.createElement('div');
    item.className = 'history__item';
    item.textContent = `${a} ${opSymbol} ${b} = ${result}`;
    // добавляем в историю
    historyList.appendChild(item);
  });
}
