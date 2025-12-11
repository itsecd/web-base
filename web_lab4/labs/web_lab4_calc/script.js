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
                result = num1 / num2;
                break;
            default:
                showError('Неизвестная операция');
                return;
        }
        
        
        resultElement.textContent = Number.isInteger(result) ? result : result.toFixed(4);
    }

    
    calculateButton.addEventListener('click', calculate);
    
    
    num1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    num2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });
    
    num1Input.addEventListener('input', clearError);
    num2Input.addEventListener('input', clearError);
    operationSelect.addEventListener('change', clearError);
});