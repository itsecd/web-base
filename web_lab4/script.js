document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    function clearError() {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        resultElement.textContent = '—';
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
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    }

    function calculate() {
        clearError();
        
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (isNaN(num1) || isNaN(num2)) {
            showError('Пожалуйста, введите оба числа');
            return;
        }
        
        if (operation === 'divide' && num2 === 0) {
            showError('Ошибка: деление на ноль невозможно');
            return;
        }
        
        try {
            const result = performCalculation(num1, num2, operation);
            resultElement.textContent = Number.isInteger(result) ? result : result.toFixed(4);
        } catch (error) {
            showError(error.message);
        }
    }

    calculateButton.addEventListener('click', calculate);
    
    [num1Input, num2Input].forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculate();
        });
    });
    
    [num1Input, num2Input, operationSelect].forEach(element => {
        element.addEventListener('input', clearError);
        element.addEventListener('change', clearError);
    });
});