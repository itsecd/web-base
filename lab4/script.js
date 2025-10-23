const ACHIEVEMENTS_STRINGS = {
    "2x2": { "text": ["Начало Арифметики", "Как дважды два!"], "active": false, 
        "condition": (a, b, op, res) => (a === 2 && b === 2 && (op === "*" || op === "+")) },
    "pow": { "text": ["Остепенение", "Возведите число в квадрат"], "active": false,
        "condition": (a, b, op, res) => (a === b && op === "*"),
        "unlock": () => { const l1 = document.getElementById("locked1"); l1.style.display = "block"; }
    }, // Открывает оператор степени
    "666": { "text":["Корень зла", "Извлеките корень из 666"], "active": false,
        "condition": (a, b, op, res) => (a === 666 && b === (1/2) && op === "^")
    },
    "inf": { "text":["Полный беспредел!", "Достигните бесконечности"], "active": false,
        "condition": (a, b, op, res) => (!isFinite(res) && !isNaN(res))
    },
    "nan": { "text":["Что-то сломалось...", "Получите NaN"], "active": false,
        "condition": (a, b, op, res) => (isNaN(res))
    },
    "i": { "text":["Мнимый успех", "Попытайтесь получить мнимое число"], "active": false,
        "condition": (a, b, op, res) => (a < 0 && Math.abs(b) === (1/2) && op === "^")
    },
    "0": { "text":["Не по правилам", "Разделите на 0"], "active": false,
        "condition": (a, b, op, res) => (b === 0 && op === "/")
    },
    "pi": { "text":["Великая константа", "Аппроксимируйте число π"], "active": false,
        "condition": (a, b, op, res) => (Math.abs(res - Math.PI) < 0.001)
    },
    "e": {  "text":["Замечательная константа", "Аппроксимируйте число ⅇ"], "active": false,
        "condition": (a, b, op, res) => (Math.abs(res - Math.E) < 0.001),
        "unlock": () => {const l2 = document.getElementById("locked2"); l2.style.display = "block";}
    }, // Открывает логарифмирование
    "phi": { "text":["Золотая константа", "Аппроксимируйте число φ"], "active": false,
        "condition": (a, b, op, res) => (Math.abs(res - PHI) < 0.001)
    }
}

const PHI = 1.61803398874

function log_b(a, b) {
    return Math.log(a) / Math.log(b);
}


// . . .
window.onload = init;
function init() {
    const l1 = document.getElementById("locked1");
    if (l1) {l1.style.display = "none";} else { console.error("Не удалось получить все элементы."); }
    const l2 = document.getElementById("locked2");
    if (l2) {l2.style.display = "none";} else { console.error("Не удалось получить все элементы."); }
    console.info("Инициализация завершена.");
    create_toast("Добро пожаловать!");
}

function achievements(a, b, op, res) {
    /* Выглядит куда опрятнее, чем кучка if-выражений */
    Object.values(ACHIEVEMENTS_STRINGS).forEach( (achievement) => {
        if (!achievement["active"] && achievement["condition"](a, b, op, res)) {
            create_toast(achievement["text"]);
            achievement["active"] = true;
            if (achievement["unlock"]) achievement["unlock"]();
        }
    });
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