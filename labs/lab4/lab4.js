document.addEventListener("DOMContentLoaded", function () {
    const PRECISION = 5;
    const ROUND_CONST = 10 ** PRECISION;

    const firstInput = document.getElementById("number1");
    const secondInput = document.getElementById("number2");
    const opSelect = document.getElementById("operation");
    const btnCalc = document.getElementById("btnCalc");
    const outResult = document.getElementById("outResult");
    const outError = document.getElementById("error");

    if (
        !firstInput ||
        !secondInput ||
        !opSelect ||
        !btnCalc ||
        !outResult ||
        !outError
    ) {
        throw new Error(
            "Ошибка: один или нескольких элементов интерфейса не найдено."
        );
    }

    function checkNumber(value) {
        const trimmed = value.trim();
        if (trimmed === "") {
            throw new Error("Поле не должно быть пустым");
        }

        const num = Number(trimmed);

        if (String(num) === "NaN" || !isFinite(num)) {
            throw new Error("Введите корректное число");
        }

        return num;
    }

    function compute(a, b, kind) {
        switch (kind) {
            case "add":
                return a + b;

            case "sub":
                return a - b;

            case "mul":
                return a * b;

            case "div":
                if (b === 0) {
                    throw new Error("Деление на ноль невозможно");
                }
                return a / b;

            default:
                throw new Error("Неизвестная операция");
        }
    }

    function displayError(text) {
        outError.textContent = text;
    }

    function clearError() {
        outError.textContent = "";
    }

    function displayResult(val) {
        outResult.textContent = val;
    }

    function clearResult() {
        outResult.textContent = "—";
    }

    function process() {
        clearError();
        clearResult();

        try {
            const x = checkNumber(firstInput.value);
            const y = checkNumber(secondInput.value);
            const op = opSelect.value;

            let res = compute(x, y, op);
            res = Math.round(res * ROUND_CONST) / ROUND_CONST;
            displayResult(res);
        } catch (err) {
            displayError(err.message || err);
        }
    }

    btnCalc.addEventListener("click", process);

    [firstInput, secondInput].forEach(function (inp) {
        inp.addEventListener("keypress", function (ev) {
            if (ev.key === "Enter") {
                process();
            }
        });

        inp.addEventListener("input", clearError);
    });
});
