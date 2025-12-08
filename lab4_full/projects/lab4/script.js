class Calculator {
    constructor() {
        this.inputA = document.querySelector('.js-input-a');
        this.inputB = document.querySelector('.js-input-b');
        this.selectOp = document.querySelector('.js-select-op');
        this.btnCalc = document.querySelector('.js-btn-calc');
        this.outputValue = document.querySelector('.js-result-value');

        this.initEvents();
    }

    initEvents() {
        this.btnCalc.addEventListener('click', this.handleCalculate.bind(this));
    }

    handleCalculate() {
        const data = this.getValues();

        if (!this.validate(data)) {
            return; 
        }

        try {
            const result = this.compute(data.a, data.b, data.operation);
            this.renderSuccess(result);
        } catch (error) {
            this.renderError(error.message);
        }
    }

    getValues() {
        return {
            a: parseFloat(this.inputA.value),
            b: parseFloat(this.inputB.value),
            operation: this.selectOp.value
        };
    }

    validate({ a, b }) {
        if (isNaN(a) || isNaN(b)) {
            this.renderError("Заполните оба поля числами");
            return false;
        }
        return true;
    }

    compute(a, b, operation) {
        switch (operation) {
            case 'sum': return a + b;
            case 'sub': return a - b;
            case 'mul': return a * b;
            case 'div':
                if (Math.abs(b) < Number.EPSILON) {
                    throw new Error("На ноль делить нельзя");
                }
                return a / b;
            default:
                throw new Error("Неизвестная операция");
        }
    }

    renderSuccess(value) {
        this.outputValue.classList.remove('calculator__value--error');

        const formattedValue = Number.isInteger(value)
            ? value
            : parseFloat(value.toFixed(4));

        this.outputValue.textContent = formattedValue;
    }

    renderError(message) {
        this.outputValue.classList.add('calculator__value--error');
        this.outputValue.textContent = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});