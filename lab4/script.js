const button = document.getElementById("calc");

if (!button ||
    !document.getElementById("num1") ||
    !document.getElementById("num2") || 
    !document.getElementById("operations") ||
    !document.getElementById("output") 
) {
    alert("Не все элементы найдены на странице!");
    throw new Error("Не все элементы найдены на странице!");
}

button.addEventListener("click", function() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operation = document.getElementById("operations").value;

    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("output").value = "";
        return;
    }

    if (operation == "+") {
        var result = num1 + num2;
    }
    else if (operation == "-") {
        var result = num1 - num2;
    }
    else if (operation == "*") {
        var result = num1 * num2;
    }
    else if (operation == "/") {
        if (num2 === 0) {
            alert("Деление на ноль запрещено!");
            return;
        } else {
            var result = num1 / num2;
        }
    }

    document.getElementById("output").value = result;
});