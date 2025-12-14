document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation-select');
    const calculateButton = document.getElementById('calculate');
    const resultValue = document.getElementById('result-value');
    const resultPlaceholder = document.querySelector('.result-placeholder');
    
    let resultElement = document.createElement('div');
    resultElement.className = 'result-text';
    
    resultPlaceholder.remove();
    resultValue.appendChild(resultElement);
    
    updateResult('—', 'placeholder');
    
    calculateButton.addEventListener('click', calculate);
    
    num1Input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') calculate();
    });
    
    num2Input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') calculate();
    });
    
    operationSelect.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') calculate();
    });
    
    function calculate() {
        const num1Str = num1Input.value.trim();
        const num2Str = num2Input.value.trim();
        
        if (num1Str === '' || num2Str === '') {
            updateResult('Введите оба числа', 'error');
            shakeInputs();
            return;
        }
        
        const num1 = parseFloat(num1Str.replace(',', '.'));
        const num2 = parseFloat(num2Str.replace(',', '.'));
        
        if (isNaN(num1) || isNaN(num2)) {
            updateResult('Некорректные числа', 'error');
            shakeInputs();
            return;
        }
        
        const operation = operationSelect.value;
        let result;
        
        try {
            switch (operation) {
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
                        throw new Error('Деление на ноль');
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            
            if (!isFinite(result)) {
                throw new Error('Слишком большое число');
            }
            
            const formattedResult = formatResult(result);
            
            updateResult(formattedResult, 'success');
            
            animateSuccess();
            
        } catch (error) {
            if (error.message === 'Деление на ноль') {
                updateResult('Деление на ноль невозможно', 'error');
            } else if (error.message === 'Слишком большое число') {
                updateResult('Слишком большое число', 'error');
            } else {
                updateResult(`Ошибка: ${error.message}`, 'error');
            }
            shakeInputs();
        }
    }
    
    function formatResult(value) {
        if (Number.isInteger(value)) {
            return value.toString();
        }
        
        const rounded = Math.round(value * 1000000) / 1000000;
        
        let resultStr = rounded.toString();
        
        if (resultStr.length > 12) {
            return rounded.toExponential(6);
        }
        
        return resultStr;
    }
    
    function updateResult(value, type = 'placeholder') {
        resultElement.textContent = value;
        resultElement.className = 'result-text';
        
        if (type === 'success') {
            resultElement.classList.add('success');
        } else if (type === 'error') {
            resultElement.classList.add('error');
        }
        
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            resultElement.style.transition = 'all 0.3s ease';
            resultElement.style.opacity = '1';
            resultElement.style.transform = 'translateY(0)';
        }, 50);
    }
    
    function shakeInputs() {
        const inputs = [num1Input, num2Input];
        
        inputs.forEach(input => {
            input.style.transition = 'none';
            input.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                input.style.transition = 'transform 0.1s ease';
                input.style.transform = 'translateX(-5px)';
                
                setTimeout(() => {
                    input.style.transform = 'translateX(5px)';
                    
                    setTimeout(() => {
                        input.style.transform = 'translateX(-5px)';
                        
                        setTimeout(() => {
                            input.style.transform = 'translateX(5px)';
                            
                            setTimeout(() => {
                                input.style.transform = 'translateX(0)';
                            }, 50);
                        }, 50);
                    }, 50);
                }, 50);
            }, 10);
        });
    }
    
    function animateSuccess() {
        resultElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            resultElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    setTimeout(() => {
        num1Input.focus();
    }, 500);
});