document.addEventListener("DOMContentLoaded", () => {
  const num1Input = document.getElementById("calculator__num1");
  const num2Input = document.getElementById("calculator__num2");
  const operationSelect = document.getElementById("calculator__operation");
  const button = document.getElementById("calculator__button");
  const resultValue = document.getElementById("calculator__result-value");

 
  if (!num1Input || !num2Input || !operationSelect || !button || !resultValue) {
    console.error("Ошибка: один или несколько HTML-элементов отсутствуют.");
    return;
  }


  function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const op = operationSelect.value;


    if (isNaN(num1) || isNaN(num2)) {
      resultValue.textContent = "Ошибка: введите числа!";
      return;
    }

    let result;
    switch (op) {
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
          resultValue.textContent = "Ошибка: деление на ноль!";
          return;
        }
        result = num1 / num2;
        break;
      default:
        resultValue.textContent = "Ошибка: выберите операцию!";
        return;
    }

    resultValue.textContent = result;
  }


  button.addEventListener("click", calculate);


  num1Input.addEventListener("keypress", e => e.key === "Enter" && calculate());
  num2Input.addEventListener("keypress", e => e.key === "Enter" && calculate());
});