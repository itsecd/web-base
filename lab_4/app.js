function calculate() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const op = document.getElementById("op").value;

    if (!document.getElementById("a") || !document.getElementById("b") || !document.getElementById("op")) {
        alert("Не все элементы были найдены!");
        return;
    }

    if (isNaN(a) || isNaN(b)) {
        alert("Введите оба числа!");
        return;
    }

    let result;
    if (op === "+") {
        result = a + b;
    } else if (op === "-") {
        result = a - b;
    } else if (op === "*") {
        result = a * b;
    } else if (op === "/") {
        if (b === 0) {
            alert("Деление на ноль невозможно!");
            return;
        }
        result = a / b;
    } else {
        alert("Неправильная операция");
        return;
    }

    if (result !== undefined) {
        document.getElementById("result").innerText = result;
    } else {
        alert("Ошибка в вычислениях");
    }
}