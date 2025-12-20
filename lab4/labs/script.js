document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        num1Input: document.getElementById('num1'),
        num2Input: document.getElementById('num2'),
        operationSelect: document.getElementById('operation'),
        calculateBtn: document.getElementById('calculateBtn'),
        resultValue: document.getElementById('resultValue'),
        errorMessage: document.getElementById('errorMessage'),
        errorText: document.querySelector('.error-message__text')
    };

    const missingElements = [];
    for (const [key, element] of Object.entries(elements)) {
        if (!element) {
            missingElements.push(key);
            console.error(`Элемент ${key} не найден на странице`);
        }
    }

    if (missingElements.length > 0) {
        console.error('Не удалось найти элементы:', missingElements.join(', '));
        return;
    }

    function hideError() {
        elements.errorMessage.classList.add('error-message--hidden');
    }

    function showError(message) {
        elements.errorText.textContent = message;
        elements.errorMessage.classList.remove('error-message--hidden');
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
        return result.toString();
    }

    function calculate() {
        hideError();

        const a = elements.num1Input.value;
        const b = elements.num2Input.value;
        const operation = elements.operationSelect.value;

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
        elements.resultValue.textContent = value;
        elements.resultValue.classList.add('pulse');

        setTimeout(() => {
            elements.resultValue.classList.remove('pulse');
        }, 500);
    }

    elements.calculateBtn.addEventListener('click', calculate);

    [elements.num1Input, elements.num2Input, elements.operationSelect].forEach(element => {
        element.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calculate();
            }
        });
    });

    elements.num1Input.focus();

    function clearErrorOnInput() {
        hideError();
    }

    elements.num1Input.addEventListener('input', clearErrorOnInput);
    elements.num2Input.addEventListener('input', clearErrorOnInput);
    elements.operationSelect.addEventListener('change', clearErrorOnInput);
});