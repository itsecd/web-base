document.addEventListener('DOMContentLoaded', function () {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultValue = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.querySelector('.error-text');

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function validateInputs(a, b) {
        if (a === '' || b === '') {
            return { isValid: false, message: 'Пожалуйста, введите оба числа' };
        }

        if (isNaN(a) || isNaN(b)) {
            return { isValid: false, message: 'Пожалуйста, введите корректные числа' };
        }

        return { isValid: true, message: '' };
    }

    function performCalculation(a, b, operation) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);

        switch (operation) {
            case 'add':
                return numA + numB;
            case 'subtract':
                return numA - numB;
            case 'multiply':
                return numA * numB;
            case 'divide':
                if (numB === 0) {
                    throw new Error('Деление на ноль невозможно');
                }
                return numA / numB;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    function formatResult(result) {
        if (!Number.isInteger(result)) {
            const rounded = parseFloat(result.toFixed(10));
            return rounded.toString().replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
        }
        return result.toString();
    }

    function calculate() {
        hideError();

        const a = num1Input.value;
        const b = num2Input.value;
        const operation = operationSelect.value;


        const validation = validateInputs(a, b);
        if (!validation.isValid) {
            showError(validation.message);
            updateResultDisplay('—');
            return;
        }


        try {
            const result = performCalculation(a, b, operation);
            const formattedResult = formatResult(result);
            updateResultDisplay(formattedResult);
        } catch (error) {
            showError(error.message);
            updateResultDisplay('—');
        }
    }


    function updateResultDisplay(value) {
        resultValue.textContent = value;
        resultValue.classList.add('pulse');

        setTimeout(() => {
            resultValue.classList.remove('pulse');
        }, 500);
    }

    calculateBtn.addEventListener('click', calculate);

    [num1Input, num2Input, operationSelect].forEach(element => {
        element.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });

    num1Input.focus();

    function clearErrorOnInput() {
        hideError();
    }

    num1Input.addEventListener('input', clearErrorOnInput);
    num2Input.addEventListener('input', clearErrorOnInput);
    operationSelect.addEventListener('change', clearErrorOnInput);
});