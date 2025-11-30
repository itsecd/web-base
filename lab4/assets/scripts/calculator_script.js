document.addEventListener("DOMContentLoaded", () => {
    const select = document.querySelector("select.top-wrapper__selection");
    const button = document.querySelector("button.bottom-wrapper__calculate");
    const output = document.querySelector("span.output__text");
    const input1 = document.getElementById("num1");
    const input2 = document.getElementById("num2");
    if (!select || !button || !output || !input1 || !input2) return;


    button.addEventListener("click", () => {
        const num1 = parseFloat(input1.value);
        const num2 = parseFloat(input2.value);
        const op = select.value;

        if (isNaN(num1) || isNaN(num2)) {
            output.textContent = "Введите оба числа!";
            return;
        }
        if (op === "/" && num2 === 0) {
            output.textContent = "На ноль делить нельзя!";
            return;
        }

        let result;
        switch (op) {
            case "+": 
                result = num1 + num2;
                break;
            case "-": 
                result = num1 - num2; 
                break;
            case "*": 
                result = num1 * num2; 
                break;
            case "/": 
                result = num1 / num2; 
                break;
            default:
                output.textContent = "Операция не поддерживается!"
                return;
        }
        output.textContent = "Результат: " + result;
    });
});
