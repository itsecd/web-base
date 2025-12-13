console.log("Script loaded")

document.addEventListener("DOMContentLoaded", function () {
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateButton = document.getElementById("btn");
  const resultElement = document.getElementById("outputField");

  // Установка начальных значений для удобства тестирования
  num1Input.value = "15";
  num2Input.value = "5";

  // Функция вычисления результата
  function calculate() {
    // Получаем значения из полей ввода
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    // Проверяем, что оба числа введены корректно
    if (isNaN(num1) || isNaN(num2)) {
      resultElement.textContent = "Ошибка: введите оба числа";
      resultElement.className = "error";
      return;
    }

    let result;

    switch (operation) {
      case "addition":
        result = num1 + num2;
        break;
      case "subtraction":
        result = num1 - num2;
        break;
      case "multiplication":
        result = num1 * num2;
        break;
      case "division":
        // Проверка деления на ноль
        if (num2 === 0) {
          resultElement.textContent = "Ошибка: деление на ноль";
          resultElement.className = "error";
          return;
        }
        result = num1 / num2;
        break;
    }

    // Форматируем результат (убираем лишние нули после запятой)
    const formattedResult = parseFloat(result.toFixed(10));

    // Отображаем результат
    resultElement.textContent = `${formattedResult}`;
    resultElement.className = "";
  }

  // Назначаем обработчик события на кнопку "Вычислить"
  calculateButton.addEventListener("click", calculate);
});
