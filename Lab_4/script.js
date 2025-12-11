const ops = ["+", "-", "*", "/"];
let currentIndex = 0;


const selectedOp = document.getElementById("selected-op");
const list = document.getElementById("dropdown-list");


function buildList() {
    list.innerHTML = "";


    ops.forEach((op, index) => {
        const div = document.createElement("div");
        div.className = "dropdown-item";
        div.textContent = op;


        div.onclick = () => {
            currentIndex = index;
            selectedOp.textContent = op;
            list.classList.add("hidden");
        };


        list.appendChild(div);
    });
}


selectedOp.onclick = () => {
    buildList();
    list.classList.toggle("hidden");
};

function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const op = ops[currentIndex];


    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("result").innerText = "Ошибка ввода";
        return;
    }


    let result;
    switch (op) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num2 !== 0 ? num1 / num2 : "Деление на 0"; break;
    }


    document.getElementById("result").innerText = result;
}