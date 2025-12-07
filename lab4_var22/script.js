function addition(a, b) {
    return a + b;
}

function subtraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        throw new Error("Пожалуйста, не делите на ноль");
    }
    return a / b;
}

const OPERATIONS = {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
    division: "/"
};

function calculate({a, b, operation}) {
    let result = null;

    switch (operation) {
        case OPERATIONS.addition:
            result = addition(a, b);
            break;

        case OPERATIONS.subtraction:
            result = subtraction(a, b);
            break;

        case OPERATIONS.multiplication:
            result = multiplication(a, b);
            break;

        case OPERATIONS.division:
            result = division(a, b);
            break;

        default:
            break;
    }

    return result;
};

const inputANode = document.querySelector('.calculator__first-number');
const inputBNode = document.querySelector('.calculator__second-number');
const selectOperationsNode = document.querySelector('.calculator__select-operations');
const calculateButtonNode = document.querySelector('.calculator__calculate-button');
const resultNode = document.querySelector('.calculator__result');

calculateButtonNode.addEventListener('click', function() {
    const a = Number(inputANode.value);
    const b = Number(inputBNode.value);
    const operation = selectOperationsNode.value;

    try {
        const result = calculate({a, b, operation});
        resultNode.innerHTML = result;
    } catch (error) {
        resultNode.innerHTML = `<span>Ошибка: ${error.message}</span>`;
    }
});