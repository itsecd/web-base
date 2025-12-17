function calculate() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let operation = document.getElementById("operation").value;
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").innerText = "Ошибка: введите числа";
        return;
    }

    if (operation === "+") {
        result = num1 + num2;
    } else if (operation === "-") {
        result = num1 - num2;
    } else if (operation === "*") {
        result = num1 * num2;
    } else if (operation === "/") {
        if (num2 === 0) {
            document.getElementById("result").innerText = "Ошибка: деление на ноль";
            return;
        }
        result = num1 / num2;
    }

    document.getElementById("result").innerText = "Результат: " + result;
}