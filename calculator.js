document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    function calculate() {
        errorDiv.textContent = '';
        resultDiv.textContent = '—';
        
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (isNaN(num1) || isNaN(num2)) {
            showError('Пожалуйста, введите оба числа');
            return;
        }
        
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
                    showError('Ошибка: деление на ноль!');
                    return;
                }
                result = num1 / num2;
                break;
            default:
                showError('Неизвестная операция');
                return;
        }
        
        resultDiv.textContent = result.toFixed(2);
    }

    function showError(message) {
        errorDiv.textContent = message;
        resultDiv.textContent = '—';
    }

    function clearAll() {
        num1Input.value = '';
        num2Input.value = '';
        operationSelect.value = 'add';
        resultDiv.textContent = '—';
        errorDiv.textContent = '';
    }
  
    calculateBtn.addEventListener('click', calculate);
    clearBtn.addEventListener('click', clearAll);
});
