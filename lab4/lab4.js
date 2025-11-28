document.addEventListener('DOMContentLoaded', function () {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    if (!num1Input || !num2Input || !operationSelect || !calculateBtn || !resultDiv || !errorDiv) {
        console.error('Не все необходимые элементы найдены на странице');
        return;
    }

    calculateBtn.addEventListener('click', handleCalculation);

    function handleCalculation() {
        clearDisplay();
        clearInputErrors();

        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;

        if (!validateInput(num1, num2)) {
            displayError('Пожалуйста, введите корректные числа в оба поля');
            markInvalidInputs(num1, num2);
            return;
        }

        const calculationResult = performCalculation(num1, num2, operation);

        const displayFunction = typeof calculationResult === 'number'
            ? displayResult
            : displayError;

        displayFunction(calculationResult);
    }

    function clearDisplay() {
        errorDiv.textContent = '';
        resultDiv.textContent = '-';
        resultDiv.className = 'calculator__result-value';
    }

    function clearInputErrors() {
        num1Input.classList.remove('calculator__input--error');
        num2Input.classList.remove('calculator__input--error');
    }

    function markInvalidInputs(num1, num2) {
        if (isNaN(num1)) {
            num1Input.classList.add('calculator__input--error');
        }
        if (isNaN(num2)) {
            num2Input.classList.add('calculator__input--error');
        }
        resultDiv.classList.add('calculator__result-value--error');
    }

    function validateInput(num1, num2) {
        return !isNaN(num1) && !isNaN(num2);
    }

    function performCalculation(num1, num2, operation) {
        switch (operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) {
                    return 'Ошибка: деление на ноль невозможно';
                }
                return num1 / num2;
            default:
                return 'Неизвестная операция';
        }
    }

    function displayResult(result) {
        resultDiv.textContent = result;
        resultDiv.classList.remove('calculator__result-value--error');
    }

    function displayError(errorMessage) {
        errorDiv.textContent = errorMessage;
        resultDiv.textContent = 'Ошибка';
        resultDiv.classList.add('calculator__result-value--error');
    }
});