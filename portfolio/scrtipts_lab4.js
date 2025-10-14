document.addEventListener('DOMContentLoaded', function() {

    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultInput = document.getElementById('result');
    
    function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value) && value !== '';
    }
    
    function showError(input, message) {
        input.classList.add('error');
        
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
        
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function hideError(input) {
        input.classList.remove('error');
        
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.style.display = 'none';
        }
    }
    
    function calculate() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        const operation = operationSelect.value;
        
        let hasError = false;
        
        if (!isValidNumber(num1)) {
            showError(num1Input, 'Пожалуйста, введите корректное число');
            hasError = true;
        } else {
            hideError(num1Input);
        }
        
        if (!isValidNumber(num2)) {
            showError(num2Input, 'Пожалуйста, введите корректное число');
            hasError = true;
        } else {
            hideError(num2Input);
        }
        
        if (hasError) {
            resultInput.value = 'Ошибка ввода';
            return;
        }
        
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        
        let result;

        try {
            switch (operation) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    if (b === 0) {
                        throw new Error('Деление на ноль невозможно');
                    }
                    result = a / b;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            resultInput.value = result;
        } catch (error) {
            resultInput.value = 'Ошибка: ' + error.message;
        }
    }
    
    calculateButton.addEventListener('click', calculate);
    
    num1Input.addEventListener('input', function() {
        hideError(num1Input);
    });
    
    num2Input.addEventListener('input', function() {
        hideError(num2Input);
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});