const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const operationSelect = document.getElementById("operation");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");

function calculate(num1, num2, operation) {
  if (isNaN(num1) || isNaN(num2)) {
    return { error: "Некорректный ввод чисел" };
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
      if (num2 === 0) {
        return { error: "Деление на ноль запрещено" };
      }
      result = num1 / num2;
      break;
    default:
      return { error: "Неизвестная операция" };
  }

  result = Number(result.toFixed(6));

  return { result };
}

function handleCalculate() {
  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const operation = operationSelect.value;

  const calculation = calculate(num1, num2, operation);

  if (calculation.error) {
    resultDiv.textContent = "Ошибка: " + calculation.error;
  } else {
    resultDiv.textContent = "Результат: " + calculation.result;
  }
}

calculateBtn.addEventListener("click", handleCalculate);
