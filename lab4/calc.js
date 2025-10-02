
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const output = document.getElementById('output');
const button = document.getElementById('calculate');
const historyList = document.getElementById('history-list');

button.addEventListener('click', () => {
  const a = parseFloat(num1.value);
  const b = parseFloat(num2.value);

  if (isNaN(a) || isNaN(b)) {
    output.textContent = "Ошибка: введите числа!";
    return;
  }

  let result;
  let opSymbol;

  switch(operation.value) {
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
        output.textContent = "Ошибка: деление на ноль!";
        return;
      }
      result = a / b;
      opSymbol = '÷';
      break;
    default:
      result = 0;
  }
  result = parseFloat(result.toFixed(2));
  // dывод результата
  output.textContent = result;

  // cоздаём элемент истории
  const item = document.createElement('div');
  item.className = 'history-item';
  item.textContent = `${a} ${opSymbol} ${b} = ${result}`;

  // добавляем в историю
  historyList.appendChild(item);
});

