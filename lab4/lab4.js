document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    
    function calculate() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (isNaN(num1) || isNaN(num2)) {
            showResult('Ошибка: Введите оба числа', true);
            return;
        }
        
        let result;
        let error = null;
        
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
                    error = 'Ошибка: Деление на ноль';
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                error = 'Ошибка: Неизвестная операция';
        }
        
        if (error) {
            showResult(error, true);
        } else {
            showResult(formatNumber(result), false);
        }
    }
    
    function formatNumber(num) {
        if (Number.isInteger(num)) {
            return num.toString();
        }
        return parseFloat(num.toFixed(8)).toString();
    }
    
    function showResult(text, isError) {
        resultDiv.textContent = text;
        if (isError) {
            resultDiv.classList.add('calculator__result-value--error');
            resultDiv.classList.remove('calculator__result-value');
        } else {
            resultDiv.classList.add('calculator__result-value');
            resultDiv.classList.remove('calculator__result-value--error');
        }
    }
    
    function resetResult() {
        resultDiv.textContent = '—';
        resultDiv.classList.add('calculator__result-value');
        resultDiv.classList.remove('calculator__result-value--error');
    }
    
    calculateButton.addEventListener('click', calculate);

    num1Input.addEventListener('input', resetResult);
    num2Input.addEventListener('input', resetResult);
    operationSelect.addEventListener('change', resetResult);
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });

    resetResult();
});