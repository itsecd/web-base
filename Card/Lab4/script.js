document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('calcForm');
    const firstNumberInput = document.getElementById('firstNumber');
    const operationSelect = document.getElementById('operation');
    const secondNumberInput = document.getElementById('secondNumber');
    const resultDiv = document.getElementById('result');

    if (!form || !firstNumberInput || !operationSelect || !secondNumberInput || !resultDiv) {
        console.error('Ошибка: не все элементы найдены в DOM');
        return;
    }
    form.addEventListener('submit', handleSubmit);

    function handleSubmit(event) {
        event.preventDefault();

        const firstNumber = parseFloat(firstNumberInput.value);
        const operation = operationSelect.value;
        const secondNumber = parseFloat(secondNumberInput.value);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            displayError('Пожалуйста, введите корректные числа');
            return;
        }

        if (!operation) {
            displayError('Пожалуйста, выберите операцию');
            return;
        }

        try {
            const result = calculate(firstNumber, operation, secondNumber);
            displayResult(result, firstNumber, operation, secondNumber);
        } catch (error) {
            displayError(error.message);
        }
    }

    function calculate(first, op, second) {
        switch (op) {
            case 'add':
                return first + second;
            case 'subtract':
                return first - second;
            case 'multiply':
                return first * second;
            case 'divide':
                if (second === 0) {
                    throw new Error('Невозможно делить на ноль');
                }
                return first / second;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    function displayResult(result, first, op, second) {
        const operationSymbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };

        const displayValue = Number.isInteger(result) 
            ? result 
            : result.toFixed(2);

        resultDiv.innerHTML = `
            <p class="calculator__result-title">${first} ${operationSymbols[op]} ${second}</p>
            <p class="calculator__result-value">${displayValue}</p>
        `;

        resultDiv.className = 'calculator__result calculator__result--success';
        resultDiv.style.display = 'block';
    }

    function displayError(message) {
        resultDiv.innerHTML = `
            <p class="calculator__result-title">Ошибка</p>
            <p class="calculator__result-value" style="font-size: 16px; color: inherit;">${message}</p>
        `;

        resultDiv.className = 'calculator__result calculator__result--error';
        resultDiv.style.display = 'block';
    }
});
