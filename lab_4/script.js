class SimpleCalculator {
    constructor() {
        this.num1Input = document.getElementById('num1');
        this.num2Input = document.getElementById('num2');
        this.operationSelect = document.getElementById('operation');
        this.calculateBtn = document.getElementById('calculate');
        this.resultDiv = document.getElementById('result');
        
        this.init();
    }
    
    init() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
    }
    
    roundResult(number) {
        const rounded = Math.round(number * 10000000000) / 10000000000;
        
        return parseFloat(rounded.toFixed(10));
    }
    
    performCalculation(num1, num2, operation) {
        switch (operation) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    throw new Error('Деление на ноль!');
                }
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    }
    
    calculate() {
        const num1 = parseFloat(this.num1Input.value);
        const num2 = parseFloat(this.num2Input.value);
        const operation = this.operationSelect.value;

        if (isNaN(num1) || isNaN(num2)) {
            this.showError('Введите оба числа!');
            return;
        }
        
        let result;
        
        try {
            result = this.performCalculation(num1, num2, operation);
            
            result = this.roundResult(result);
            
            this.showResult(result);
            
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    showResult(result) {
        this.resultDiv.textContent = `Результат: ${result}`;
        this.resultDiv.className = 'result result__success';
        this.animateButton();
    }
    
    showError(message) {
        this.resultDiv.textContent = `Ошибка: ${message}`;
        this.resultDiv.className = 'result result__error';
    }
    
    animateButton() {
        this.calculateBtn.classList.add('button-animate');
        setTimeout(() => {
            this.calculateBtn.classList.remove('button-animate');
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SimpleCalculator();
});