/**
 * Модуль вычислений (чистая логика)
 */
const CalculationModule = {
    /**
     * Валидация входных данных
     */
    validateInput(num1, num2, operation) {
        if (isNaN(num1) || isNaN(num2)) {
            return {
                isValid: false,
                message: "Ошибка: Введите оба числа"
            };
        }
        
        const validOperations = ['add', 'subtract', 'multiply', 'divide'];
        if (!validOperations.includes(operation)) {
            return {
                isValid: false,
                message: "Ошибка: Неизвестная операция"
            };
        }
        
        return {
            isValid: true,
            message: "Валидация пройдена успешно"
        };
    },
    
    /**
     * Выполнение арифметической операции
     */
    performCalculation(num1, num2, operation) {
        switch(operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) {
                    throw new Error("Деление на ноль невозможно");
                }
                return num1 / num2;
            default:
                throw new Error("Неизвестная операция");
        }
    },
    
    /**
     * Форматирование результата
     */
    formatResult(num) {
        if (!isFinite(num)) {
            throw new Error("Результат слишком велик");
        }
        
        if (num % 1 === 0) {
            return num.toString();
        }
        
        return parseFloat(num.toFixed(10)).toString();
    },
    
    /**
     * Получение символа операции
     */
    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operation] || '?';
    }
};

/**
 * Модуль работы с DOM
 */
const DOMModule = {
    elements: {},
    
    /**
     * Инициализация элементов DOM
     */
    init() {
        this.elements = {
            num1Input: document.getElementById('num1'),
            num2Input: document.getElementById('num2'),
            operationSelect: document.getElementById('operation'),
            calculateBtn: document.getElementById('calculateBtn'),
            resetBtn: document.getElementById('resetBtn'),
            resultDiv: document.getElementById('result'),
            resultContainer: document.getElementById('resultContainer'),
            operationIcons: document.querySelectorAll('.operation-icons__item')
        };
    },
    
    /**
     * Получение значений из формы
     */
    getFormValues() {
        return {
            num1: parseFloat(this.elements.num1Input.value),
            num2: parseFloat(this.elements.num2Input.value),
            operation: this.elements.operationSelect.value
        };
    },
    
    /**
     * Отображение результата
     */
    showResult(message, type) {
        this.elements.resultDiv.textContent = message;
        
        this.elements.resultContainer.classList.remove(
            'calculator__result--success',
            'calculator__result--error'
        );
        
        this.elements.resultContainer.classList.add(`calculator__result--${type}`);
        
        this.elements.resultContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    },
    
    /**
     * Установка активной иконки операции
     */
    setActiveOperationIcon(operation) {
        this.elements.operationIcons.forEach(icon => {
            icon.classList.remove('operation-icons__item--active');
        });
        
        const activeIcon = document.querySelector(`[data-operation="${operation}"]`);
        if (activeIcon) {
            activeIcon.classList.add('operation-icons__item--active');
        }
    },
    
    /**
     * Сброс формы
     */
    resetForm() {
        this.elements.num1Input.value = '';
        this.elements.num2Input.value = '';
        this.elements.operationSelect.value = 'add';
        this.elements.resultDiv.textContent = 'Результат появится здесь';
        this.elements.resultContainer.classList.remove(
            'calculator__result--success',
            'calculator__result--error'
        );
        this.setActiveOperationIcon('add');
        this.elements.num1Input.focus();
    }
};

/**
 * Основной контроллер калькулятора
 */
class CalculatorController {
    constructor() {
        DOMModule.init();
        this.initEventListeners();
        DOMModule.setActiveOperationIcon('add');
    }
    
    /**
     * Инициализация обработчиков событий
     */
    initEventListeners() {
        DOMModule.elements.calculateBtn.addEventListener('click', () => this.handleCalculate());
        DOMModule.elements.resetBtn.addEventListener('click', () => this.handleReset());
        
        [DOMModule.elements.num1Input, DOMModule.elements.num2Input].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleCalculate();
            });
        });
        
        DOMModule.elements.operationIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                const operation = icon.dataset.operation;
                DOMModule.elements.operationSelect.value = operation;
                DOMModule.setActiveOperationIcon(operation);
            });
        });
        
        DOMModule.elements.operationSelect.addEventListener('change', () => {
            DOMModule.setActiveOperationIcon(DOMModule.elements.operationSelect.value);
        });
    }
    
    /**
     * Обработка вычисления
     */
    handleCalculate() {
        try {
            const { num1, num2, operation } = DOMModule.getFormValues();
            
            const validation = CalculationModule.validateInput(num1, num2, operation);
            if (!validation.isValid) {
                DOMModule.showResult(validation.message, 'error');
                return;
            }
            
            const result = CalculationModule.performCalculation(num1, num2, operation);
            const formattedResult = CalculationModule.formatResult(result);
            const operationSymbol = CalculationModule.getOperationSymbol(operation);
            
            DOMModule.showResult(
                `${num1} ${operationSymbol} ${num2} = ${formattedResult}`,
                'success'
            );
            
        } catch (error) {
            DOMModule.showResult(`Ошибка: ${error.message}`, 'error');
        }
    }
    
    /**
     * Обработка сброса
     */
    handleReset() {
        DOMModule.resetForm();
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorController();
});