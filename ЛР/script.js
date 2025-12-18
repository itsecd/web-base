document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');
    const operationIcons = document.querySelectorAll('.operation-icon'); 
    
    operationIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const operation = this.getAttribute('data-operation');

            operationIcons.forEach(icon => icon.classList.remove('active'));
            this.classList.add('active');
            
            if (operation === 'clear') {
                clearCalculator();
                this.classList.remove('active');
                return;
            }

            operationSelect.value = operation;
            
            if (num1Input.value && num2Input.value) {
                calculate();
            }
        });
    });

    operationSelect.addEventListener('change', function() {
        updateActiveIcon(this.value);

        if (num1Input.value && num2Input.value) {
            calculate();
        }
    });
    
    num1Input.addEventListener('input', function() {
        if (this.value && num2Input.value) {
            calculate();
        }
    });
    
    num2Input.addEventListener('input', function() {
        if (this.value && num1Input.value) {
            calculate();
        }
    });

    calculateButton.addEventListener('click', calculate);

    function calculate() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        const operation = operationSelect.value;

        if (isNaN(num1) || isNaN(num2)) {
            showError("Введите оба числа");
            return;
        }
        
        let result;
        let operationSymbol;

        try {
            switch(operation) {
                case 'add':
                    result = num1 + num2;
                    operationSymbol = '+';
                    break;
                case 'subtract':
                    result = num1 - num2;
                    operationSymbol = '-';
                    break;
                case 'multiply':
                    result = num1 * num2;
                    operationSymbol = '×';
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error("Деление на ноль");
                    }
                    result = num1 / num2;
                    operationSymbol = '÷';
                    break;
                default:
                    throw new Error("Неизвестная операция");
            }

            result = Math.round(result * 10000) / 10000;
            
            resultDiv.textContent = result;
            resultDiv.classList.remove('error');
            
        } catch (error) {
            showError(error.message);
        }
    }

    function showError(message) {
        resultDiv.textContent = "Ошибка: " + message;
        resultDiv.classList.add('error');
    }

    function clearCalculator() {
        num1Input.value = '';
        num2Input.value = '';
        operationSelect.value = 'add';
        resultDiv.textContent = '0';
        resultDiv.classList.remove('error');
        updateActiveIcon('add');
    }

    function updateActiveIcon(operation) {
        operationIcons.forEach(icon => icon.classList.remove('active'));

        if (operation !== 'clear') {
            const activeIcon = document.querySelector(`.operation-icon[data-operation="${operation}"]`);
            if (activeIcon) {
                activeIcon.classList.add('active');
            }
        }
    }

    updateActiveIcon('add');
    calculate();
});