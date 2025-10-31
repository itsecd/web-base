function calculate() {
  const num1 = document.getElementById("num1").value.trim();
  const num2 = document.getElementById("num2").value.trim();
  const operation = document.getElementById("operation").value;
  let resultElement = document.getElementById("result");

  if (!num1 || !num2) {
    resultElement.textContent = "Ошибка: введите оба числа";
    return;
  }

  try {
    switch (operation) {
      case "+":
        resultElement.textContent = parseFloat(num1) + parseFloat(num2);
        break;
      case "-":
        resultElement.textContent = parseFloat(num1) - parseFloat(num2);
        break;
      case "*":
        resultElement.textContent = parseFloat(num1) * parseFloat(num2);
        break;
      case "/":
        if (parseFloat(num2) === 0)
          throw new Error("Деление на ноль невозможно");
        resultElement.textContent = parseFloat(num1) / parseFloat(num2);
        break;
      default:
        resultElement.textContent = "Ошибка: неверная операция";
    }
  } catch (error) {
    resultElement.textContent = error.message;
  }
}
