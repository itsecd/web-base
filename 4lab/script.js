document.getElementById('calculate').addEventListener('click', () => {
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operation = document.getElementById('operation').value;
  const resultOutput = document.getElementById('result');

  if (!num1Input || !num2Input || !operationSelect || !resultOutput) {
    console.error('Ошибка: один или несколько элементов калькулятора отсутствуют в HTML.');
    return;
  }
  
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);

  resultOutput.textContent = '';
  resultOutput.className = 'calculator__result';

  if (isNaN(num1) || isNaN(num2)) {
    resultOutput.textContent = 'Ошибка: введите оба числа!';
    resultOutput.classList.add('calculator__result--error');
    return;
  }

  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        resultOutput.textContent = 'Ошибка: деление на ноль!';
        resultOutput.classList.add('calculator__result--error');
        return;
      }
      result = num1 / num2;
      break;
    default:
      resultOutput.textContent = 'Неизвестная операция';
      resultOutput.classList.add('calculator__result--error');
      return;
  }

  resultOutput.textContent = result;

});
