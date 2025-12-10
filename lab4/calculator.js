document.addEventListener('DOMContentLoaded', () => {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');
    const calculateButton = document.getElementById('calculate-btn');
    const formElement = document.getElementById('calculator-form');

    if (
        !number1Input ||
        !number2Input ||
        !operationSelect ||
        !resultElement ||
        !errorElement ||
        !calculateButton ||
        !formElement
    ) {
        console.error('Ошибка: один или несколько элементов формы калькулятора не найдены!');
        return;
    }

    function showError(message) {
        errorElement.textContent = message;
    }

    function clearError() {
        errorElement.textContent = '';
    }

    function calculate() {
        clearError();

        const value1 = number1Input.value.trim();
        const value2 = number2Input.value.trim();

        if (value1 === '' || value2 === '') {
            showError('Пожалуйста, заполните оба поля с числами.');
            resultElement.textContent = '—';
            return;
        }

        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            showError('Введены некорректные значения. Используйте только числа.');
            resultElement.textContent = '—';
            return;
        }

        const operation = operationSelect.value;
        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    showError('Деление на ноль невозможно.');
                    resultElement.textContent = '—';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                showError('Неизвестная операция.');
                resultElement.textContent = '—';
                return;
        }

        const rounded = Math.round(result * 1e12) / 1e12;
        resultElement.textContent = rounded;
    }

    calculateButton.addEventListener('click', calculate);

    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        calculate();
    });
});