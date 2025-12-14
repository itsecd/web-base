document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculate');
  const num1InputEl = document.getElementById('num1');
  const num2InputEl = document.getElementById('num2');
  const operationEl = document.getElementById('operation');
  const resultDiv = document.getElementById('result');

  if (!calculateBtn || !num1InputEl || !num2InputEl || !operationEl || !resultDiv) {
    let errorContainer = resultDiv;
    if (!errorContainer) { // Если нет result
      errorContainer = document.createElement('div');
      errorContainer.id = 'result';
      errorContainer.style.color = 'red';
      errorContainer.style.padding = '10px';
      errorContainer.style.backgroundColor = '#ffebee';
      document.body.appendChild(errorContainer);
    }
    errorContainer.textContent = 'Критическая ошибка: не хватает элементов калькулятора.';
    errorContainer.style.color = 'red';
    return;
  }

  calculateBtn.addEventListener('click', () => {
    const num1Input = num1InputEl.value.trim();
    const num2Input = num2InputEl.value.trim();
    const operation = operationEl.value;

    resultDiv.textContent = '';
    resultDiv.style.color = '#333';

    if (num1Input === '' || num2Input === '') {
      resultDiv.textContent = 'Ошибка: Заполните оба поля!';
      resultDiv.style.color = 'red';
      return;
    }

    const num1 = parseFloat(num1Input);
    const num2 = parseFloat(num2Input);

    if (isNaN(num1) || isNaN(num2)) {
      resultDiv.textContent = 'Ошибка: Введите корректные числа!';
      resultDiv.style.color = 'red';
      return;
    }

    let result;
    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          resultDiv.textContent = 'Ошибка: Деление на ноль!';
          resultDiv.style.color = 'red';
          return;
        }
        result = num1 / num2;
        break;
      default:
        resultDiv.textContent = 'Ошибка: Неизвестная операция.';
        resultDiv.style.color = 'red';
        return;
    }

    resultDiv.textContent = String(result);
  });
});