function initCalculator() {
  const firstInput = document.getElementById('calculator__first-number');
  const secondInput = document.getElementById('calculator__second-number');
  const operationSelect = document.getElementById('calculator__operation');
  const resultOutput = document.getElementById('calculator__result-output');
  const calculateButton = document.querySelector('.calculator__button');

  calculateButton.addEventListener('click', () => {
    const first = parseFloat(firstInput.value);
    const second = parseFloat(secondInput.value);
    const operation = operationSelect.value;

    if (isNaN(first) || isNaN(second)) {
      resultOutput.textContent = 'Ошибка: введите корректные числа';
      return;
    }

    if (operation === '/' && second === 0) {
      resultOutput.textContent = 'Ошибка: деление на ноль невозможно';
      return;
    }

    let result;
    switch (operation) {
      case '+': result = first + second; break;
      case '-': result = first - second; break;
      case '*': result = first * second; break;
      case '/': result = first / second; break;
    }

    resultOutput.textContent = 'Результат: ' + result;
  });
}

document.addEventListener('DOMContentLoaded', initCalculator);