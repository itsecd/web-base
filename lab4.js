document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateBtn = document.getElementById("calculate");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  function calculate(num1, num2, operation) {
    switch (operation) {
      case "add":
        return num1 + num2;
      case "subtract":
        return num1 - num2;
      case "multiply":
        return num1 * num2;
      case "divide":
        if (num2 === 0) {
          throw new Error("Деление на ноль!");
        }
        return num1 / num2;
      default:
        throw new Error("Неизвестная операция");
    }
  }

  function validateInputs(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Пожалуйста, введите оба числа");
    }
  }

  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    resultDiv.textContent = "0";
    resultDiv.style.color = "#000000";
  }

  function showResult(result) {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
    resultDiv.textContent = result;
    resultDiv.style.color = "#000000";
  }

  calculateBtn.addEventListener("click", function () {
    try {
      const num1 = parseFloat(num1Input.value);
      const num2 = parseFloat(num2Input.value);
      const operation = operationSelect.value;

      validateInputs(num1, num2);

      const result = calculate(num1, num2, operation);

      showResult(result);
    } catch (error) {
      showError(error.message);
    }
  });

  [num1Input, num2Input].forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        calculateBtn.click();
      }
    });
  });
});
