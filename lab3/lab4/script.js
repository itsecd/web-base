const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const opButtons = document.querySelectorAll('.buttons-container__button');
const calcBtn = document.getElementById('calculate');
const resultDiv = document.getElementById('result');

let currentOperation = '+';
function checkElements() {
    if (!num1Input || !num2Input || !opButtons.length || !calcBtn || !resultDiv) {
        console.error('Ошибка: один или несколько элементов не найдены');
        return false;
    }
    return true;
}
  
function setActiveOperation(button) {
        opButtons.forEach(btn => {
            btn.classList.remove('buttons-container__button--active');
        });
        button.classList.add('buttons-container__button--active');
        currentOperation = button.dataset.op;
    }

function handleOperationClick() {
    setActiveOperation(this);
}

function handleEnterKey(e) {
    if (e.key === 'Enter') {
        calculate();
    }
}

function resetError() {
    if (resultDiv.classList.contains('calc__result-value--error')) {
        resultDiv.classList.remove('calc__result-value--error');
        resultDiv.textContent = '—';
    }
} 

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
document.addEventListener('DOMContentLoaded', function() {
    if (!checkElements()) {
        if (resultDiv) showError('Ошибка загрузки калькулятора');
        return;
    }
    
    opButtons.forEach(button => {
        button.addEventListener('click', handleOperationClick); 
    });
    
    calcBtn.addEventListener('click', calculate);
    
    [num1Input, num2Input].forEach(input => {
        input.addEventListener('keypress', handleEnterKey);
        input.addEventListener('input', resetError);
    });
    
    opButtons[0].classList.add('buttons-container__button--active');
});