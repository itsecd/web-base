const ops = ["+", "-", "*", "/"];


const selectedOp = document.getElementById("selected-op");
const list = document.getElementById("dropdown-list");


function buildList() {
    list.innerHTML = "";


    ops.forEach((op, index) => {
        const div = document.createElement("div");
        div.className = "calculator__dropdown-item";
        div.textContent = op;


        div.onclick = () => {
            selectedOp.setAttribute("operation-value", op);
            list.classList.add("calculator__dropdown-list--hidden");
        };


        list.appendChild(div);
    });
}


selectedOp.onclick = () => {
    buildList();
    list.classList.toggle("calculator__dropdown-list--hidden");
};



function clearFields() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;

    if (num1 === '' && num2 === '') {
        alert("Уже и так пусто");
        return;
    }

    document.getElementById("num1").value = '';
    document.getElementById("num2").value = '';
    document.getElementById("result").innerText = '';
}



function calculate() {
    const num1El = document.getElementById("num1");
    const num2El = document.getElementById("num2");
    const resultEl = document.getElementById("result");


    if (!num1El || !num2El || !resultEl || !selectedOp) {
        alert("Ошибка: один из элементов не найден на странице!");
        return;
    }

    const num1 = parseFloat(num1El.value);
    const num2 = parseFloat(num2El.value);
    let op = selectedOp.getAttribute("operation-value");

    if (!op) {
        alert("Ошибка выбора операции, используется + по умолчанию");
        op = ops[0]; 
    }



    if (isNaN(num1) || isNaN(num2)) {
        alert("Ошибка ввода");
        return;
    }


    let result;
    switch (op) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : NaN;
            if (isNaN(result)) alert("Деление на 0");
            break;
    }


    document.getElementById("result").innerText = result;
}