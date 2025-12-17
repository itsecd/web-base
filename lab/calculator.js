function calculate() {
  const num1El = document.getElementById("num1");
  const num2El = document.getElementById("num2");
  const operationEl = document.getElementById("operation");
  const resultEl = document.getElementById("result");
  const errorEl = document.getElementById("error");

  if (!num1El || !num2El || !operationEl || !resultEl || !errorEl) {
    return;
  }

  errorEl.textContent = "";
  resultEl.textContent = "Результат:";

  if (num1El.value === "" || num2El.value === "") {
    errorEl.textContent = "Ошибка: заполните оба поля";
    return;
  }

  const num1 = Number(num1El.value);
  const num2 = Number(num2El.value);
  const operation = operationEl.value;

  let result;

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;

    case "-":
      result = num1 - num2;
      break;

    case "*":
      result = num1 * num2;
      break;

    case "/":
      if (num2 === 0) {
        errorEl.textContent = "Ошибка: деление на ноль";
        return;
      }
      result = num1 / num2;
      break;

    default:
      errorEl.textContent = "Неизвестная операция";
      return;
  }

  resultEl.textContent = "Результат: " + result;
}