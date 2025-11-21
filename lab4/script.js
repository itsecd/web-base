class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.num1Input = document.getElementById('num1');
        this.num2Input = document.getElementById('num2');
        this.operationSelect = document.getElementById('operation');
        this.calculateBtn = document.getElementById('calculate');
        this.clearBtn = document.getElementById('clear');
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.calculateBtn.addEventListener('click', () => {
            this.compute();
        });

        this.clearBtn.addEventListener('click', () => {
            this.clear();
        });

        [this.num1Input, this.num2Input].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.compute();
                }
            });
        });
    }

    compute() {
        const num1 = parseFloat(this.num1Input.value);
        const num2 = parseFloat(this.num2Input.value);
        const operation = this.operationSelect.value;

        if (isNaN(num1) || isNaN(num2)) {
            this.display.textContent = 'Введите числа';
            return;
        }

        let result;
        let error = false;

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
                    this.display.textContent = 'Ошибка: деление на 0';
                    error = true;
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                this.display.textContent = 'Неизвестная операция';
                error = true;
        }

        if (!error) {
            result = Math.round(result * 10000000000) / 10000000000;
            this.display.textContent = result;
        }
    }

    clear() {
        this.num1Input.value = '';
        this.num2Input.value = '';
        this.operationSelect.value = 'add';
        this.display.textContent = '0';
        this.num1Input.focus();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new Calculator();
});