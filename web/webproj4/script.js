console.log("Script loaded")

document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateButton = document.getElementById("btn");
  const resultElement = document.getElementById("outputField");

  num1Input.value = "15";
  num2Input.value = "5";

  function calculateResult(num1, num2, operation) {
    switch (operation) {
      case "addition":
        return num1 + num2;
      case "subtraction":
        return num1 - num2;
      case "multiplication":
        return num1 * num2;
      case "division":
        if (num2 === 0) {
          throw new Error("Деление на ноль");
        }
        return num1 / num2;
      default:
        throw new Error("Неизвестная операция");
    }
  }

  function validateInputs(num1Str, num2Str) {
    const num1 = parseFloat(num1Str);
    const num2 = parseFloat(num2Str);
    
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Введите оба числа");
    }
    
    return { num1, num2 };
  }

  // Форматирование результата
  function formatResult(result) {
    return parseFloat(result.toFixed(10));
  }

  // Работа с DOM: отображение результата
  function displayResult(value) {
    resultElement.textContent = `${value}`;
    resultElement.className = "";
  }

  // Работа с DOM: отображение ошибки
  function displayError(message) {
    resultElement.textContent = `Ошибка: ${message}`;
    resultElement.className = "error";
  }

  // Основная функция-обработчик
  function handleCalculation() {
    try {
      const { num1, num2 } = validateInputs(num1Input.value, num2Input.value);
      const operation = operationSelect.value;
      
      const result = calculateResult(num1, num2, operation);
      
      const formattedResult = formatResult(result);
      displayResult(formattedResult);
      
    } catch (error) {
      displayError(error.message);
    }
  }

  calculateButton.addEventListener("click", handleCalculation);
});
