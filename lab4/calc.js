document.addEventListener('DOMContentLoaded', function () {
    const number1Input = document.getElementById('number1');
    const number2Input = document.getElementById('number2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('result');

    if (!number1Input || !number2Input || !operationSelect || !calculateBtn || !resultDisplay) {
        console.error('Ошибка: один или несколько необходимых элементов не найдены в DOM.');
        return;
    }

    function calculate() {
        try {
            const num1 = parseFloat(number1Input.value);
            const num2 = parseFloat(number2Input.value);
            const operation = operationSelect.value;

            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('Пожалуйста, введите корректные числа.');
            }

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
                        throw new Error('Деление на ноль невозможно!');
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Неизвестная операция.');
            }

            resultDisplay.textContent = result.toFixed(2);
            resultDisplay.classList.remove('calculator__result--error');

        } catch (error) {
            resultDisplay.textContent = error.message;
            resultDisplay.classList.add('calculator__result--error');
        }
    }

    calculateBtn.addEventListener('click', calculate);

    number1Input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });

    number2Input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});