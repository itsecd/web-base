document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateButton = document.getElementById("calculate");
  const resultElement = document.getElementById("result");
  const errorElement = document.getElementById("error");

  function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    errorElement.classList.remove("calculator__error--visible");
    errorElement.textContent = "";

    if (isNaN(num1) || isNaN(num2)) {
      showError("Пожалуйста, введите оба числа");
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
        if (num2 === 0) {
          showError("Деление на ноль невозможно");
          return;
        }
        result = num1 / num2;
        break;
      default:
        showError("Неизвестная операция");
        return;
    }

    resultElement.textContent = result;
  }

  function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.add("calculator__error--visible");
    resultElement.textContent = "-";
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
