document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateButton = document.getElementById("calculate");
  const resultElement = document.getElementById("result");
  const errorElement = document.getElementById("error");

  function validateInputs(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
      return "Пожалуйста, введите оба числа";
    }
    return null;
  }

  function performCalculation(num1, num2, operation) {
    switch (operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        if (num2 === 0) {
          return { error: "Деление на ноль невозможно" };
        }
        return num1 / num2;
      default:
        return { error: "Неизвестная операция" };
    }
  }

  function updateResult(result) {
    resultElement.textContent = result;
  }

  function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.add("calculator__error--visible");
  }

  function clearError() {
    errorElement.textContent = "";
    errorElement.classList.remove("calculator__error--visible");
  }

  function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    clearError();

    const validationError = validateInputs(num1, num2);
    if (validationError) {
      showError(validationError);
      updateResult("-");
      return;
    }

    const calculationResult = performCalculation(num1, num2, operation);

    if (typeof calculationResult === "object" && calculationResult.error) {
      showError(calculationResult.error);
      updateResult("-");
      return;
    }

    updateResult(calculationResult);
  }

  calculateButton.addEventListener("click", calculate);

  [num1Input, num2Input].forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        calculate();
      }
    });
  });
});
