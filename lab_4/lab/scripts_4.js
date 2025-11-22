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
            switch (operation) {
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
                        throw new Error('Деление на ноль!');
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Неизвестная операция');
            }
            
            this.showResult(result);
            
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    showResult(result) {
        this.resultDiv.textContent = `Результат: ${result}`;
        this.resultDiv.className = 'result success';
        this.animateButton();
    }
    
    showError(message) {
        this.resultDiv.textContent = `Ошибка: ${message}`;
        this.resultDiv.className = 'result error';
    }
    
    animateButton() {
        this.calculateBtn.style.background = 'linear-gradient(135deg, #ff1493, #c71585)';
        setTimeout(() => {
            this.calculateBtn.style.background = 'linear-gradient(135deg, #ff69b4, #ff1493)';
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SimpleCalculator();
});