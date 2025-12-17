function calculate() {
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operationSelect = document.getElementById('operation');
  const resultEl = document.getElementById('result');

  if (!num1Input || !num2Input || !operationSelect || !resultEl) {
    console.error("Один или несколько элементов не найдены!");
    return;
  }

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const op = operationSelect.value;

  resultEl.classList.remove('error');

  if (isNaN(num1) || isNaN(num2)) {
    resultEl.textContent = "Пожалуйста, введите оба числа";
    resultEl.classList.add('error');
    return;
  }

  if (op === '/' && num2 === 0) {
    resultEl.textContent = "Деление на ноль невозможно";
    resultEl.classList.add('error');
    return;
  }

  let res;
  switch (op) {
    case '+': res = num1 + num2; break;
    case '-': res = num1 - num2; break;
    case '*': res = num1 * num2; break;
    case '/': res = num1 / num2; break;
    default: res = 'Ошибка';
  }

  const formatted = parseFloat(res.toFixed(10));
  resultEl.textContent = `= ${formatted}`;
}