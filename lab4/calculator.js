class Calculator {
    constructor() {
        this.num1Input = document.getElementById('num1');
        this.num2Input = document.getElementById('num2');
        this.operationSelect = document.getElementById('operation');
        this.calculateButton = document.getElementById('calculate');
        this.resultValue = document.getElementById('resultValue');
        this.errorMessage = document.getElementById('errorMessage');
        
        this.init();
    }
    
    init() {
        this.calculateButton.addEventListener('click', () => this.calculate());
        this.setupEnterKeyListener();
    }
    
    calculate() {
        this.errorMessage.style.display = 'none';
        
        const num1 = parseFloat(this.num1Input.value);
        const num2 = parseFloat(this.num2Input.value);
        const operation = this.operationSelect.value;
        
        if (!this.validateInput(num1, num2)) {
            return;
        }
        
        const result = this.performOperation(num1, num2, operation);
        
        if (typeof result === 'string' && result.startsWith('Ошибка:')) {
            this.showError(result.replace('Ошибка:', '').trim());
            return;
        }
        
        this.displayResult(num1, num2, operation, result);
    }
    
    validateInput(num1, num2) {
        if (isNaN(num1) || isNaN(num2)) {
            this.showError('Пожалуйста, введите оба числа');
            return false;
        }
        return true;
    }
    
    performOperation(num1, num2, operation) {
        switch(operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    return 'Ошибка: Деление на ноль невозможно!';
                }
                return num1 / num2;
            default:
                return 'Ошибка: Неизвестная операция';
        }
    }
    
    displayResult(num1, num2, operation, result) {
        const operationSymbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };
        
        const operationSymbol = operationSymbols[operation] || operation;
        
        this.resultValue.innerHTML = `
            <div class="calculator__operation-display">
                ${num1} ${operationSymbol} ${num2} =
            </div>
            <div class="calculator__final-result">${result}</div>
        `;
    }
    
    showError(message) {
        this.errorMessage.textContent = 'Ошибка: ' + message;
        this.errorMessage.style.display = 'block';
        this.resultValue.textContent = '-';
        this.resultValue.className = 'calculator__result-value';
    }
    
    setupEnterKeyListener() {
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});