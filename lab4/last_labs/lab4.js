document.addEventListener('DOMContentLoaded', function() {

    const valueOneInput = document.getElementById('value-one');
    const valueTwoInput = document.getElementById('value-two');
    const operationSelect = document.getElementById('operation-type');
    const calcButton = document.getElementById('calc-btn');
    const resultOutput = document.getElementById('calc-result');

    function isValidNumericValue(value) {
        if (value === '' || value === null || value === undefined) {
            return false;
        }
        const num = parseFloat(value);
        return !isNaN(num) && isFinite(num);
    }
    
    function executeOperation(firstVal, secondVal, operation) {
        try {
            let operationResult;
            
            switch (operation) {
                case '+':
                    operationResult = firstVal + secondVal;
                    break;
                case '-':
                    operationResult = firstVal - secondVal;
                    break;
                case '*':
                    operationResult = firstVal * secondVal;
                    break;
                case '/':
                    if (secondVal === 0) {
                        return {
                            completed: false,
                            errorMessage: 'Деление на ноль невозможно'
                        };
                    }
                    operationResult = firstVal / secondVal;
                    break;
                default:
                    return {
                        completed: false,
                        errorMessage: 'Неизвестная операция'
                    };
            }
            
            const absoluteValue = Math.abs(operationResult);
            let formattedResult;
            
            if (absoluteValue >= 0.01) {
                formattedResult = operationResult.toFixed(2);
            } else {
                let precision = 1;
                while (Math.round(absoluteValue * Math.pow(10, precision)) === 0) {
                    precision++;
                }
                formattedResult = operationResult.toFixed(precision + 1);
            }

            formattedResult = formattedResult.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.$/, "");
            
            return {
                completed: true,
                resultValue: formattedResult
            };
            
        } catch (err) {
            return {
                completed: false,
                errorMessage: err.message
            };
        }
    }
    
    function validateInputs(firstInput, secondInput, operation) {
        const validationStatus = {
            valid: true,
            errors: [],
            values: {}
        };
        
        if (!isValidNumericValue(firstInput)) {
            validationStatus.valid = false;
            validationStatus.errors.push({
                field: 'value-one',
                message: 'Пожалуйста, введите корректное первое число'
            });
        } else {
            validationStatus.values.firstValue = parseFloat(firstInput);
        }

        if (!isValidNumericValue(secondInput)) {
            validationStatus.valid = false;
            validationStatus.errors.push({
                field: 'value-two',
                message: 'Пожалуйста, введите корректное второе число'
            });
        } else {
            validationStatus.values.secondValue = parseFloat(secondInput);
        }
        
        if (validationStatus.valid) {
            validationStatus.values.operation = operation;
        }
        
        return validationStatus;
    }
    
    function calculateResult(firstInput, secondInput, operation) {
        const validation = validateInputs(firstInput, secondInput, operation);
        
        if (!validation.valid) {
            return {
                success: false,
                errors: validation.errors,
                result: null
            };
        }
        
        const { firstValue, secondValue, operation: op } = validation.values;
        const operationResult = executeOperation(firstValue, secondValue, op);
        
        if (operationResult.completed) {
            return {
                success: true,
                errors: [],
                result: operationResult.resultValue
            };
        } else {
            return {
                success: false,
                errors: [{ field: 'operation', message: operationResult.errorMessage }],
                result: null
            };
        }
    }
    
    function showError(inputField, message) {
        inputField.classList.add('calc-error');
        
        let errorMsg = inputField.nextElementSibling;
        if (!errorMsg || !errorMsg.classList.contains('calc-error-msg')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'calc-error-msg';
            inputField.parentNode.insertBefore(errorMsg, inputField.nextSibling);
        }
        
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }
    
    function hideError(inputField) {
        inputField.classList.remove('calc-error');
        
        const errorMsg = inputField.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('calc-error-msg')) {
            errorMsg.style.display = 'none';
        }
    }
    
    function clearErrors() {
        hideError(valueOneInput);
        hideError(valueTwoInput);
    }
    
    function displayCalculationResult(calcResult) {
        if (calcResult.success) {
            resultOutput.value = calcResult.result;
            clearErrors();
        } else {
            resultOutput.value = 'Ошибка ввода';

            calcResult.errors.forEach(err => {
                if (err.field === 'value-one') {
                    showError(valueOneInput, err.message);
                } else if (err.field === 'value-two') {
                    showError(valueTwoInput, err.message);
                }
            });
        }
    }

    function handleCalculation() {
        const firstValue = valueOneInput.value.trim();
        const secondValue = valueTwoInput.value.trim();
        const operation = operationSelect.value;
        
        const calculationResult = calculateResult(firstValue, secondValue, operation);
        
        displayCalculationResult(calculationResult);
    }
    
    function initCalculator() {
        calcButton.addEventListener('click', handleCalculation);
        
        valueOneInput.addEventListener('input', function() {
            hideError(valueOneInput);
        });
        
        valueTwoInput.addEventListener('input', function() {
            hideError(valueTwoInput);
        });
        
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                handleCalculation();
            }
        });
    }
    
    initCalculator();
});