const ACHIEVEMENTS_STRINGS = {
    "2x2": ["Начало Арифметики", "Как дважды два!"],
    "pow": ["Остепенение", "Возведите число в квадрат"], // Открывает оператор степени
    "666": ["Корень зла", "Извлеките корень из 666"],
    "inf": ["Полный беспредел!", "Достигните бесконечности"],
    "nan": ["Что-то сломалось...", "Получите NaN"],
    "i": ["Мнимый успех", "Попытайтесь получить мнимое число"],
    "0": ["Не по правилам", "Разделите на 0"],
    "pi": ["Великая константа", "Аппроксимируйте число π"],
    "e": ["Замечательная константа", "Аппроксимируйте число ⅇ"], // Открывает логарифмирование
    "phi": ["Золотая константа", "Аппроксимируйте число φ"]
}
const PHI = 1.61803398874

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

function achievements(a, b, op, res) {
    /* Это такой себе код, но и я не JS разработчик */
    if (a === 2 && b === 2 && (op === "*" || op === "+") && !ACHIEVEMENTS["2x2"]) {
        ACHIEVEMENTS["2x2"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["2x2"]);
    }
    if (a === b && op === "*" && !ACHIEVEMENTS["pow"]) {
        ACHIEVEMENTS["pow"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["pow"]);
        const l1 = document.getElementById("locked1");
        l1.style.display = "block";
    }
    if (!isFinite(res) && !isNaN(res) && !ACHIEVEMENTS["inf"]) {
        ACHIEVEMENTS["inf"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["inf"]);
    }
    if (isNaN(res) && !ACHIEVEMENTS["nan"]) {
        ACHIEVEMENTS["nan"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["nan"]);
    }
    if (a === 666 && b === (1/2) && op === "^" && !ACHIEVEMENTS["666"]) {
        ACHIEVEMENTS["666"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["666"]);
    }
    if (Math.abs(res - Math.PI) < 0.001 && !ACHIEVEMENTS["pi"]) {
        ACHIEVEMENTS["pi"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["pi"]);
    }
    if (Math.abs(res - Math.E) < 0.001 && !ACHIEVEMENTS["e"]) {
        ACHIEVEMENTS["e"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["e"]);
        const l2 = document.getElementById("locked2");
        l2.style.display = "block";
    }
    if (Math.abs(res - PHI) < 0.001 && !ACHIEVEMENTS["phi"]) {
        ACHIEVEMENTS["phi"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["phi"]);
    }
    if (a < 0 && Math.abs(b) === (1/2) && op === "^" && !ACHIEVEMENTS["i"]) {
        ACHIEVEMENTS["i"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["i"]);
    }
    if ( b === 0 && op === "/" && !ACHIEVEMENTS["0"]) {
        ACHIEVEMENTS["0"] = true;
        create_toast(ACHIEVEMENTS_STRINGS["0"]);
    }
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
    achievements(num_a, num_b, operator.value, res);
}

function create_toast(text) {
    const toast = document.createElement("div");
    toast.className = "toast-list__achievement-toast";
    if (Array.isArray(text)) {
        text.forEach((string) => {const p = document.createElement("p");  p.textContent = string; p.className = "achievement-toast__string"; toast.appendChild(p);});
    }
    else {
        toast.textContent = text;
    }
    toast.addEventListener("animationend", function() {toast.remove();});
    const list = document.getElementById("toast-list");
    list.appendChild(toast);
}