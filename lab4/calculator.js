function calculate() {

  try {

    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const operation = document.getElementById("operation").value;
    const resultField = document.getElementById("result");
    const errorField = document.getElementById("error");

    errorField.textContent = "";
    resultField.textContent = "Результат: —";

    if (num1 === "" || num2 === "") {
      errorField.textContent = "Пожалуйста, введите оба числа 💔";
      return;
    }

    const a = Number(num1);
    const b = Number(num2);
    let result;

    if (operation === "/" && b === 0) {
      errorField.textContent = "На ноль делить нельзя 😾";
      return;
    }

    switch (operation) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        result = a / b;
        break;
    }

    resultField.textContent = `Результат: ${result}`;

  } catch (error) {
    console.error("Ошибка калькулятора:", error);
  }
}
