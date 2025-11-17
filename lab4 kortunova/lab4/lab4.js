document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    calculateBtn.addEventListener('click', handleCalculation);
    
    function handleCalculation() {
        clearDisplay();
        
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (!validateInput(num1, num2)) {
            displayError('Пожалуйста, введите корректные числа в оба поля');
            return;
        }
        
        const calculationResult = performCalculation(num1, num2, operation);
    
        if (calculationResult.success) {
            displayResult(calculationResult.value);
        } else {
            displayError(calculationResult.error);
        }
    }
    
    function clearDisplay() {
        errorDiv.textContent = '';
        resultDiv.textContent = '-';
    }
    
    function validateInput(num1, num2) {
        return !isNaN(num1) && !isNaN(num2);
    }
    
    function performCalculation(num1, num2, operation) {
        let result;
        
        switch(operation) {
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
                    return {
                        success: false,
                        error: 'Ошибка: деление на ноль невозможно'
                    };
                }
                result = num1 / num2;
                break;
            default:
                return {
                    success: false,
                    error: 'Неизвестная операция'
                };
        }
        
        return {
            success: true,
            value: result
        };
    }
    
    function displayResult(result) {
        resultDiv.textContent = result;
    }
    
    function displayError(errorMessage) {
        errorDiv.textContent = errorMessage;
    }
});