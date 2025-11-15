function calculate() {
    const aEl = document.getElementById("a");
    const bEl = document.getElementById("b");
    const opEl = document.getElementById("op");
    const resultEl = document.getElementById("result");

    if (!aEl || !bEl || !opEl || !resultEl) {
        alert("Не все элементы были найдены!");
        return;
    }

    const a = parseFloat(aEl.value);
    const b = parseFloat(bEl.value);
    const op = opEl.value;

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

    if(Boolean(result) || result === 0){
        document.getElementById("result").innerText = result;
    } else {
        alert("Ошибка в вычисленияx");
    }
}