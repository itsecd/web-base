document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    
    calculateBtn.addEventListener('click', calculate);
    
    function calculate() {
        errorDiv.textContent = '';
        resultDiv.textContent = '-';
        
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;
        
        if (isNaN(num1) || isNaN(num2)) {
            errorDiv.textContent = 'Пожалуйста, введите корректные числа в оба поля';
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
                    errorDiv.textContent = 'Ошибка: деление на ноль невозможно';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                errorDiv.textContent = 'Неизвестная операция';
                return;
        }
        
        resultDiv.textContent = result;
    }
});