const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const calculateButton = document.getElementById("calculate-button");
const resultText = document.getElementById("result-text");
const errorText = document.getElementById("error-text");

function clearOutput() {
  resultText.textContent = "";
  errorText.textContent = "";
}

function displayResult(result) {
  const formattedResult = parseFloat(result.toFixed(8));
  resultText.textContent = `Результат: ${formattedResult}`;
}

function displayError(message) {
  errorText.textContent = message;
}

function validateInputs(num1, num2, operation, num1Str, num2Str) {
  if (num1Str === "" || num2Str === "") {
    return "Ошибка: Оба поля должны быть заполнены.";
  }
  if (isNaN(num1) || isNaN(num2)) {
    return "Ошибка: Вводите только числа.";
  }
  if (operation === "/" && num2 === 0) {
    return "Ошибка: Деление на ноль невозможно.";
  }
  return null;
}

function calculate(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      throw new Error("Ошибка: Неизвестная операция.");
  }
}

function handleCalculateClick() {
  clearOutput();

  const num1Str = num1Input.value;
  const num2Str = num2Input.value;
  const operation = operationSelect.value;

  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  const errorMessage = validateInputs(num1, num2, operation, num1Str, num2Str);
  if (errorMessage) {
    displayError(errorMessage);
    return;
  }

  try {
    const result = calculate(num1, num2, operation);
    displayResult(result);
  } catch (error) {
    displayError(error.message);
  }
}

calculateButton.addEventListener("click", handleCalculateClick);
