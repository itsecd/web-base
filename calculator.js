document.addEventListener('DOMContentLoaded', function () {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const error1Div = document.getElementById('error1');
    const error2Div = document.getElementById('error2');

    if (!number1Input || !number2Input || !operationSelect ||
        !calculateButton || !resultDiv || !error1Div || !error2Div) {
        console.error('Один или несколько элементов калькулятора не найдены');
        return;
    }
    function validateNumber(input, errorDiv) {
        const value = input.value.trim();

        if (value === '') {
            errorDiv.textContent = 'Поле не может быть пустым';
            input.style.borderColor = '#AC3B69';
            return null;
        }

        if (!isFinite(value)) {
            errorDiv.textContent = 'Введите корректное число';
            input.style.borderColor = '#AC3B69';
            return null;
        }

        errorDiv.textContent = '';
        input.style.borderColor = '#123C69';
        return parseFloat(value);
    }

    function calculate(num1, num2, operation) {
        switch (operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно');
                }
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    function formatOperation(num1, num2, operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return `${num1} ${symbols[operation]} ${num2}`;
    }

    function displayResult(operationString, result) {
        resultDiv.innerHTML = `
                    <div class="result-value__result-equation">${operationString}</div>
                    <div>= ${result}</div>
                `;
    }

    calculateButton.addEventListener('click', function () {
        error1Div.textContent = '';
        error2Div.textContent = '';
        number1Input.style.borderColor = '#AC3B69';
        number2Input.style.borderColor = '#AC3B69';
        const num1 = validateNumber(number1Input, error1Div);
        const num2 = validateNumber(number2Input, error2Div);
        if (num1 === null || num2 === null) {
            resultDiv.innerHTML = '<span class="result-value__placeholder">Исправьте ошибки ввода</span>';
            return;
        }

        try {
            const operation = operationSelect.value;
            const result = calculate(num1, num2, operation);
            const operationString = formatOperation(num1, num2, operation);

            displayResult(operationString, result);

        } catch (error) {
            resultDiv.innerHTML = `<span style="color: #AC3B69; font-weight: bold;">Ошибка: ${error.message}</span>`;
        }
    });
    number1Input.addEventListener('input', function () {
        if (error1Div.textContent) {
            error1Div.textContent = '';
            number1Input.style.borderColor = '#AC3B69';
        }
    });

    number2Input.addEventListener('input', function () {
        if (error2Div.textContent) {
            error2Div.textContent = '';
            number2Input.style.borderColor = '#AC3B69';
        }
    });

    [number1Input, number2Input].forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calculateButton.click();
            }
        });
    });

    number1Input.value = '2';
    number2Input.value = '2';
});