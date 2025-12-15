const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const calculateButton = document.getElementById("calculate-button");
const resultText = document.getElementById("result-text");
const errorText = document.getElementById("error-text");

calculateButton.addEventListener("click", () => {
  resultText.textContent = "";
  errorText.textContent = "";

  const num1Str = num1Input.value;
  const num2Str = num2Input.value;
  const operation = operationSelect.value;

  if (num1Str === "" || num2Str === "") {
    errorText.textContent = "Ошибка: Оба поля должны быть заполнены.";
    return;
  }

  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  if (isNaN(num1) || isNaN(num2)) {
    errorText.textContent = "Ошибка: Вводите только числа.";
    return;
  }

  if (operation === "/" && num2 === 0) {
    errorText.textContent = "Ошибка: Деление на ноль невозможно.";
    return;
  }

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
      result = num1 / num2;
      break;
    default:
      errorText.textContent = "Неизвестная операция.";
      return;
  }

  resultText.textContent = `Результат: ${result}`;
});
