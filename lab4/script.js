document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    function hideError() {
        errorDiv.classList.remove('calculator__error_visible');
    }
    
    [num1Input, num2Input].forEach(field => {
        field.addEventListener('input', hideError);
    });
    
    calculateBtn.addEventListener('click', function() {
        hideError();
        errorDiv.textContent = '';
        resultDiv.textContent = '—';
        
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (isNaN(num1) || isNaN(num2)) {
            showError('Введите оба числа 🎀');
            return;
        }
        
        if (operation === '/' && num2 === 0) {
            showError('На ноль делить нельзя! 💔');
            return;
        }
        
        let result;
        if (operation === '+') result = num1 + num2;
        else if (operation === '-') result = num1 - num2;
        else if (operation === '*') result = num1 * num2;
        else if (operation === '/') result = num1 / num2;
        
        if (Number.isInteger(result)) {
            resultDiv.textContent = result;
        } else {
            resultDiv.textContent = result.toFixed(2);
        }
    });
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.add('calculator__error_visible');
        resultDiv.textContent = '—';
    }
});
