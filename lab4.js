function initCalculator() {
  const firstInput = document.querySelector('.inputs__num--first');
  const secondInput = document.querySelector('.inputs__num--second');
  const SelectedOperation = document.querySelector('.inputs__select');
  const resOutput = document.querySelector('.calc__result');
  const find = document.querySelector('.calc__find');

  if (!firstInput || !secondInput || !SelectedOperation || !resOutput || !find) {
    console.error('Может, чего-то не хвататет?)');
    return;
  }

  find.addEventListener('click', () => {
    const first = parseFloat(firstInput.value);
    const second = parseFloat(secondInput.value);
    const operation = SelectedOperation.value;

    if (isNaN(first) || isNaN(second)) {
      resOutput.textContent = 'Кажется, это не очень похоже на число';
      return;
    }

    if (operation === '/' && second === 0) {
      resOutput.textContent = 'А ты рисковый';
      return;
    }

    let result;
    switch (operation) {
      case '+': result = first + second; break;
      case '-': result = first - second; break;
      case '*': result = first * second; break;
      case '/': result = first / second; break;
    }

    resOutput.textContent = 'Результат: ' + result;
  });
}

document.addEventListener('DOMContentLoaded', initCalculator);
