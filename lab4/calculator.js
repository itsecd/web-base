function calculateOperation(num1, num2, operation) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Деление на ноль невозможно");
      }
      return a / b;
    default:
      throw new Error("Неверная операция");
  }
}

function validateInput(num1, num2) {
  if (!num1.trim() || !num2.trim()) {
    return "Ошибка: введите оба числа";
  }

  if (isNaN(parseFloat(num1)) || isNaN(parseFloat(num2))) {
    return "Ошибка: введите корректные числа";
  }

  return null;
}

function handleCalculate() {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const operation = document.getElementById("operation").value;
  const resultElement = document.getElementById("result");

  const validationError = validateInput(num1, num2);
  if (validationError) {
    resultElement.textContent = validationError;
    resultElement.className = "result error";
    return;
  }

  try {
    const result = calculateOperation(num1, num2, operation);
    resultElement.textContent = result;
    resultElement.className = "result";
  } catch (error) {
    resultElement.textContent = error.message;
    resultElement.className = "result error";
  }
}

function initCalculator() {
  const calculateButton = document.getElementById("calculateBtn");
  if (calculateButton) {
    calculateButton.addEventListener("click", handleCalculate);
  }

  const inputs = document.querySelectorAll("#num1, #num2");
  inputs.forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleCalculate();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initCalculator);