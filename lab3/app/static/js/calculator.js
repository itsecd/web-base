function calculator() {
  const num1 = document.getElementById("num-1").value;
  const num2 = document.getElementById("num-2").value;
  const operation = document.getElementById("operation").value;
  const output = document.getElementById("output");

  const num1_parsed = parseFloat(num1);
  const num2_parsed = parseFloat(num2);

  if (isNaN(num1_parsed) || isNaN(num2_parsed)) {
    alert("Поддерживаются только числа");
    return;
  }

  let result;
  switch (operation) {
    case "+":
      result = num1_parsed + num2_parsed;
      break;
    case "-":
      result = num1_parsed - num2_parsed;
      break;
    case "*":
      result = num1_parsed * num2_parsed;
      break;
    case "/":
      if (num2_parsed === 0) {
        alert("Деление на ноль невозможно");
        return;
      }
      result = num1_parsed / num2_parsed;
      break;
    default:
      alert("Поддерживаются только: + - * /");
      return;
  }

  output.textContent = `Ответ: ${result}`;
}
