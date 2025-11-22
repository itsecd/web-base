class Calculator {
    constructor() {
        this.num1Input = document.getElementById('num1');
        this.num2Input = document.getElementById('num2');
        this.operationSelect = document.getElementById('operation');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultDiv = document.getElementById('result');
        this.errorNum1 = document.getElementById('errorNum1');
        this.errorNum2 = document.getElementById('errorNum2');

        this.initEventListeners();
    }

    initEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        
       
        [this.num1Input, this.num2Input, this.operationSelect].forEach(element => {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.calculate();
                }
            });
        });

        
        this.num1Input.addEventListener('input', () => this.validateInputs());
        this.num2Input.addEventListener('input', () => this.validateInputs());
    }

    validateInputs() {
        let isValid = true;

       
        if (this.num1Input.value === '' || isNaN(this.num1Input.value)) {
            this.showError(this.errorNum1, 'Пожалуйста, введите корректное число');
            isValid = false;
        } else {
            this.hideError(this.errorNum1);
        }

        
        if (this.num2Input.value === '' || isNaN(this.num2Input.value)) {
            this.showError(this.errorNum2, 'Пожалуйста, введите корректное число');
            isValid = false;
        } else {
            this.hideError(this.errorNum2);
        }

        
        if (this.operationSelect.value === '/' && parseFloat(this.num2Input.value) === 0) {
            this.showError(this.errorNum2, 'Деление на ноль невозможно');
            isValid = false;
        }

        return isValid;
    }

    showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('error-message--visible');
    }

    hideError(errorElement) {
        errorElement.classList.remove('error-message--visible');
    }

    calculate() {
        
        this.hideError(this.errorNum1);
        this.hideError(this.errorNum2);

        if (!this.validateInputs()) {
            this.showResult('Ошибка ввода данных', 'error');
            return;
        }

        const num1 = parseFloat(this.num1Input.value);
        const num2 = parseFloat(this.num2Input.value);
        const operation = this.operationSelect.value;

        try {
            let result;
            let operationSymbol;

            switch (operation) {
                case '+':
                    result = num1 + num2;
                    operationSymbol = '+';
                    break;
                case '-':
                    result = num1 - num2;
                    operationSymbol = '-';
                    break;
                case '*':
                    result = num1 * num2;
                    operationSymbol = '×';
                    break;
                case '/':
                    if (num2 === 0) {
                        throw new Error('Деление на ноль');
                    }
                    result = num1 / num2;
                    operationSymbol = '÷';
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }

            // Форматируем результат
            const formattedResult = this.formatResult(result);
            this.showResult(`${num1} ${operationSymbol} ${num2} = ${formattedResult}`, 'success');
            
        } catch (error) {
            this.showResult(`Ошибка: ${error.message}`, 'error');
        }
    }

    formatResult(result) {
        const rounded = Math.round(result * 10000000000) / 10000000000;
        
        if (Number.isInteger(rounded)) {
            return rounded.toString();
        }
       
        return rounded.toFixed(10).replace(/\.?0+$/, '');
    }

    showResult(message, type) {
        this.resultDiv.textContent = message;
        
        this.resultDiv.classList.remove('calculator__result--error', 'calculator__result--success');
      
        if (type === 'error') {
            this.resultDiv.classList.add('calculator__result--error');
        } else if (type === 'success') {
            this.resultDiv.classList.add('calculator__result--success');
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});