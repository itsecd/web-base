document.addEventListener('DOMContentLoaded', function() {
    const num1 = document.querySelector('.calculator__input--first');
    const num2 = document.querySelector('.calculator__input--second');
    const operationSelect = document.querySelector('.calculator__operation-select');
    const calculateBtn = document.querySelector('.calculator__button');
    const resultValue = document.querySelector('.calculator__result-value');
    const errorMessage = document.querySelector('.calculator__error');
    
    function hideError() {
        errorMessage.classList.remove('calculator__error--visible');
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('calculator__error--visible');
    }

    
    function calculate() {
        hideError();
        
        const a = parseFloat(num1.value);
        const b = parseFloat(num2.value);
        const operation = operationSelect.value;
        
        if (isNaN(a) || isNaN(b)) {
            showError('Пожалуйста, введите оба числа');
            resultValue.textContent = '—';
            return;
        }
        
        let result;
        
        switch(operation) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                if (b === 0) {
                    showError('Деление на ноль невозможно');
                    resultValue.textContent = '—';
                    return;
                }
                result = a / b;
                break;
        }
        
        resultValue.textContent = Number.isInteger(result) ? result : result.toFixed(4);
    }
    
    calculateBtn.addEventListener('click', calculate);
    
    [num1, num2, operationSelect].forEach(element => {
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculate();
        });
    });
    
    num1.focus();
});