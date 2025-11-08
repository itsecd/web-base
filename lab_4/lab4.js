const button = document.getElementById("calc");

button.addEventListener("click", function () {
  const num1 = parseFloat(document.getElementById("num1").value);
  const operation = document.getElementById("operation").value;
  const num2 = parseFloat(document.getElementById("num2").value);
  if (isNaN(num1) || isNaN(num2)) {
    return;
  }
  let result;
  if (operation === "+") {
    result = num1 + num2;
  }
  if (operation === "-") {
    result = num1 - num2;
  }
  if (operation === "*") {
    result = num1 * num2;
  }
  if (operation === "/") {
    if (num2 === 0) {
      alert("Поздравляю! Вы все сломали! Давайте попробуем снова.");
      return;
    } else {
      result = num1 / num2;
    }
  }
  document.getElementById("result").textContent = "Результат: " + result;
});
