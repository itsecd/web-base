const ACHIEVEMENTS_STRINGS = {
    "1": ["Начало Арифметики", "Как дважды два!"],
    "2": ["Остепенение", "Возведите число в квадрат"], // Открывает оператор степени
    "3": ["Корень зла", "Извлеките корень из 666"],
    "4": ["Полный беспредел!", "Достигните бесконечности"],
    "5": ["Великая константа", "Аппроксимируйте число π"],
    "6": ["Замечательная константа", "Аппроксимируйте число ⅇ"],
    "7": ["Золотая константа", "Аппроксимируйте число φ"]
}

let ACHIEVEMENTS = {}

window.onload = init;

function log_b(a, b) {
    return Math.log(a) / Math.log(b);
}


// . . .
function init() {
    const l1 = document.getElementById("locked1");
    if (l1) {l1.style.display = "none";} else { console.error("Не удалось получить все элементы."); }
    const l2 = document.getElementById("locked2");
    if (l2) {l2.style.display = "none";} else { console.error("Не удалось получить все элементы."); }
    console.info("Инициализация завершена.");
    create_toast("Добро пожаловать!");
}


function calculate() {
    const a = document.getElementById("operand1");
    const b = document.getElementById("operand2");
    const operator = document.getElementById("op-list");
    const result = document.getElementById("output");

    if (!(a && b && operator && result)) { console.error("Не удалось получить все элементы."); return; }
    if (a.value === "" && b.value == "") { alert("Введите значения для всех операндов."); return; }
    if (operator.value === "") { alert("Оператор не выбран"); return; }

    const num_a = parseFloat(a.value);
    const num_b = parseFloat(b.value);
    if (isNaN(num_a) || isNaN(num_b)) { alert("Только числа."); return; }

    let res;
    switch (operator.value) {
        case "+":
            res = num_a + num_b;
            break;
        case "-":
            res = num_a - num_b;
            break;
        case "*":
            res = num_a * num_b;
            break;
        case "/":
            res = num_a / num_b;
            break;
        case "^":
            res = Math.pow(num_a, num_b);
            break;
        case "log":
            res = log_b(num_a, num_b);
            break;
        default:
            console.error("Ошибка оператора.");
    }

    result.textContent = `Результат: ${res}`
}

function create_toast(text) {
    const toast = document.createElement("div");
    toast.className = "toast-list__achievement-toast";
    toast.textContent = text;
    toast.addEventListener("animationend", function() {toast.remove();});
    const list = document.getElementById("toast-list");
    list.appendChild(toast);
}