const button = document.getElementById("calcBtn");
const resultField = document.getElementById("result");
const resultValue = document.querySelector(".calculator__result-value");

if (button && resultField) {
  button.addEventListener("click", calculate);
} else {
  console.error("Не найден элемент");
}

function calculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const operation = document.getElementById("operation").value;

  resultField.classList.remove("calculator__result--error");

  if (num1 === "" || num2 === "") {
    showError("Ошибочка: введите оба числа");
    return;
  }

  const a = Number(num1);
  const b = Number(num2);
  let result;

  switch (operation) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        showError("Ошибочка: деление на ноль");
        return;
      }
      result = a / b;
      break;
    default:
      showError("Неизвестная операция");
      return;
  }

  resultValue.textContent = result;
}

function showError(message) {
  resultValue.textContent = message;
  resultField.classList.add("calculator__result--error");
}
