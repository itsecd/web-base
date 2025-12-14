document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const opButtons = document.querySelectorAll('.calc__operation-btn');
    const calcBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    
    let currentOperation = '+';
    
    function setActiveOperation(button) {
        opButtons.forEach(btn => {
            btn.classList.remove('calc__operation-btn--active');
        });
        button.classList.add('calc__operation-btn--active');
        currentOperation = button.dataset.op;
    }
    
    opButtons.forEach(button => {
        button.addEventListener('click', () => setActiveOperation(button));
    });
    
    function calculate() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        
        if (isNaN(num1) || isNaN(num2)) {
            showError('Введите оба числа');
            return;
        }
        
        let result;
        
        switch (currentOperation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    showError('Деление на ноль невозможно');
                    return;
                }
                result = num1 / num2;
                break;
            default:
                showError('Ошибка операции');
                return;
        }
        
        showResult(result);
    }
    
    function showResult(value) {
        resultDiv.classList.remove('calc__result-value--error');
        
        if (Number.isInteger(value)) {
            resultDiv.textContent = value;
        } else {
            resultDiv.textContent = parseFloat(value.toFixed(6));
        }
    }
    
    function showError(message) {
        resultDiv.classList.add('calc__result-value--error');
        resultDiv.textContent = message;
    }
    
    calcBtn.addEventListener('click', calculate);
    
    [num1Input, num2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculate();
        });
        
        input.addEventListener('input', function() {
            if (resultDiv.classList.contains('calc__result-value--error')) {
                resultDiv.classList.remove('calc__result-value--error');
                resultDiv.textContent = '—';
            }
        });
    });
});