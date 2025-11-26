document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".top-wrapper__input");
    const select = document.querySelector(".top-wrapper__selection");
    const button = document.querySelector(".bottom-wrapper__result");
    const output = document.querySelector(".main-wrapper__output");

    button.addEventListener("click", () => {
        const num1 = parseFloat(inputs[0].value);
        const num2 = parseFloat(inputs[1].value);
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
        }

        output.textContent = "Результат: " + result;
    });
});
