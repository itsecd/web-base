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
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const op = ops[currentIndex];


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