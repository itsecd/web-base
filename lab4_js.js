function calculator() {
  const num1Input = document.getElementById('num1');
  const num2Input = document.getElementById('num2');
  const operatorSelect = document.getElementById('operator');
  const resultDiv = document.getElementById('result');

  if (!num1Input || !num2Input || !operatorSelect || !resultDiv) {
    console.error(' жи число где, брашка?!');
    return;
  }

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const op = operatorSelect.value;

  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.innerHTML = `
      <img src="67.gif" alt="six" style="height: 50px; margin-right: 10px;">
    `;
    return;
  }

  if (op === '/' && num2 === 0) {
    resultDiv.textContent = 'Ошибка: учи матан 5 класс, бездарь...';
    return;
  }

  let result;
  switch (op) {
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
      result = num1 / num2;
      break;
  }

  resultDiv.textContent = "Этот diddy blud насчитал: "+result;
}