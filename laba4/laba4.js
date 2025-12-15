document.addEventListener("DOMContentLoaded", function () {
  try {
    const num1Input = document.getElementById("num1");
    const num2Input = document.getElementById("num2");
    const operationSelect = document.getElementById("operation");
    const calculateBtn = document.getElementById("calculate");
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    const requiredElements = {
      num1Input,
      num2Input,
      operationSelect,
      calculateBtn,
      resultDiv,
      errorDiv,
    };

    for (const [name, element] of Object.entries(requiredElements)) {
      if (!element) {
        throw new Error(`Элемент ${name} не найден`);
      }
    }

    function calculate() {
      errorDiv.textContent = "";
      resultDiv.textContent = "—";

      const num1 = parseFloat(num1Input.value);
      const num2 = parseFloat(num2Input.value);
      const operation = operationSelect.value;

      if (isNaN(num1) || isNaN(num2)) {
        errorDiv.textContent = "Пожалуйста, введите оба числа";
        return;
      }

      let result;

      switch (operation) {
        case "add":
          result = num1 + num2;
          break;
        case "subtract":
          result = num1 - num2;
          break;
        case "multiply":
          result = num1 * num2;
          break;
        case "divide":
          if (num2 === 0) {
            errorDiv.textContent = "Ошибка: деление на ноль невозможно";
            return;
          }
          result = num1 / num2;
          break;
        default:
          errorDiv.textContent = "Неизвестная операция";
          return;
      }

      if (Number.isInteger(result)) {
        resultDiv.textContent = result;
      } else {
        resultDiv.textContent = parseFloat(result.toFixed(4));
      }
    }

    calculateBtn.addEventListener("click", calculate);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        calculate();
      }
    });
  } catch (error) {
    console.error("Ошибка инициализации калькулятора:", error.message);

    const errorDiv = document.getElementById("error");
    if (errorDiv) {
      errorDiv.textContent = `Ошибка: ${error.message}`;
      errorDiv.style.color = "#e74c3c";
    }

    const calculateBtn = document.getElementById("calculate");
    if (calculateBtn) {
      calculateBtn.disabled = true;
      calculateBtn.textContent = "Ошибка инициализации";
      calculateBtn.style.backgroundColor = "#95a5a6";
    }
  }
});
