document.addEventListener('DOMContentLoaded', function () { 

    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultInput = document.getElementById('result');


    function isValidNumber(value) {
        if (value === '' || value === null || value === undefined) {
            return false;
        }
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num);
    }
    
    function performOperation(a, b, operation) {
        try {
            let result;
            
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
                        return {
                            success: false,
                            error: 'Деление на ноль невозможно'
                        };
                    }
                    result = a / b;
                    break;
                default:
                    return {
                        success: false,
                        error: 'Неизвестная операция'
                    };
            }
            const absNum = Math.abs(result);
            let formatted;
            if (absNum >= 0.01) {
            formatted = result.toFixed(2);
            } else {
            let e = 1;
            while (Math.round(absNum * Math.pow(10, e)) === 0) {
                e++;
            }
            formatted = result.toFixed(e + 1);
            }

            result = formatted.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
            
            return {
                success: true,
                result: result
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    function validateAndParseInputs(num1Str, num2Str, operation) {
        const validationResult = {
            isValid: true,
            errors: [],
            data: {}
        };
        
        if (!isValidNumber(num1Str)) {
            validationResult.isValid = false;
            validationResult.errors.push({
                field: 'num1',
                message: 'Пожалуйста, введите корректное первое число'
            });
        } else {
            validationResult.data.num1 = parseFloat(num1Str);
        }

        if (!isValidNumber(num2Str)) {
            validationResult.isValid = false;
            validationResult.errors.push({
                field: 'num2',
                message: 'Пожалуйста, введите корректное второе число'
            });
        } else {
            validationResult.data.num2 = parseFloat(num2Str);
        }
        
        if (validationResult.isValid) {
            validationResult.data.operation = operation;
        }
        
        return validationResult;
    }
    
    function calculateResult(num1Str, num2Str, operation) {
        const validation = validateAndParseInputs(num1Str, num2Str, operation);
        
        if (!validation.isValid) {
            return {
                success: false,
                errors: validation.errors,
                result: null
            };
        }
        
        const { num1, num2, operation: op } = validation.data;
        const operationResult = performOperation(num1, num2, op);
        
        if (operationResult.success) {
            return {
                success: true,
                errors: [],
                result: operationResult.result
            };
        } else {
            return {
                success: false,
                errors: [{ field: 'operation', message: operationResult.error }],
                result: null
            };
        }
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
    
    function clearAllErrors() {
        hideError(num1Input);
        hideError(num2Input);
    }
    
    function displayResult(calculationResult) {
        if (calculationResult.success) {
            resultInput.value = calculationResult.result;
            clearAllErrors();
        } else {
            resultInput.value = 'Ошибка ввода';

            calculationResult.errors.forEach(error => {
                if (error.field === 'num1') {
                    showError(num1Input, error.message);
                } else if (error.field === 'num2') {
                    showError(num2Input, error.message);
                }
            });
        }
    }

    function handleCalculate() {
        const num1 = num1Input.value.trim();
        const num2 = num2Input.value.trim();
        const operation = operationSelect.value;
        
        const calculationResult = calculateResult(num1, num2, operation);
        
        displayResult(calculationResult);
    }
    
    function init() {
        calculateButton.addEventListener('click', handleCalculate);
        num1Input.addEventListener('input', function() {
            hideError(num1Input);
        });
        
        num2Input.addEventListener('input', function() {
            hideError(num2Input);
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                handleCalculate();
            }
        });
    }
    init();
});