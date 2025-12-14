import { CalculatorUtils } from './calculator-utils.js';
import { StorageUtils } from './calculator-storage.js';
import { HistoryManager } from './calculator-history.js';
import { DOMUtils } from './calculator-dom.js';
import { ErrorHandler } from './calculator-error.js';

class Calculator {
    constructor() {
        this.elements = {};
        this.historyManager = null;
        this.initialize();
    }

    // Инициализация калькулятора
    initialize() {
        try {
            this.loadElements();
            this.initHistoryManager();
            this.setupEventListeners();
            this.showStorageWarning();
            this.animateCalculator();
            this.clearAll();
            
            console.log('Калькулятор успешно инициализирован!');
        } catch (error) {
            ErrorHandler.showCriticalError(error);
        }
    }

    // Загрузка элементов DOM
    loadElements() {
        this.elements = {
            number1Input: DOMUtils.getElement('number1', 'Первое поле ввода'),
            number2Input: DOMUtils.getElement('number2', 'Второе поле ввода'),
            operationSelect: DOMUtils.getElement('operation', 'Выбор операции'),
            calculateButton: DOMUtils.getElement('calculate', 'Кнопка "Вычислить"'),
            clearButton: DOMUtils.getElement('clear', 'Кнопка "Очистить"'),
            clearHistoryButton: DOMUtils.getElement('clearHistory', 'Кнопка "Очистить историю"'),
            resultElement: DOMUtils.getElement('result', 'Поле результата'),
            errorElement: DOMUtils.getElement('error', 'Блок ошибки'),
            errorTextElement: DOMUtils.getElementBySelector('.calculator__error-text', 'Текст ошибки'),
            historyList: DOMUtils.getElement('historyList', 'Список истории')
        };
    }

    // Инициализация менеджера истории
    initHistoryManager() {
        this.historyManager = new HistoryManager(
            this.elements.historyList,
            this.elements.clearHistoryButton
        );
        this.historyManager.render();
    }

    // Показать предупреждение о хранилище
    showStorageWarning() {
        if (!StorageUtils.isLocalStorageAvailable()) {
            const warning = DOMUtils.showStorageWarning();
            const content = document.querySelector('.calculator__content');
            if (content) {
                content.insertBefore(warning, content.firstChild);
                
                // Автоматически скрываем через 10 секунд
                setTimeout(() => {
                    warning.style.opacity = '0';
                    warning.style.transition = 'opacity 0.5s';
                    setTimeout(() => {
                        if (warning.parentNode) {
                            warning.parentNode.removeChild(warning);
                        }
                    }, 500);
                }, 10000);
            }
        }
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        const { calculateButton, clearButton, clearHistoryButton, number1Input, number2Input, operationSelect } = this.elements;

        // Кнопка "Вычислить"
        calculateButton.addEventListener('click', () => this.handleCalculate());

        // Кнопка "Очистить"
        clearButton.addEventListener('click', () => this.clearAll());

        // Кнопка "Очистить историю"
        clearHistoryButton.addEventListener('click', () => this.handleClearHistory());

        // Обработка клавиши Enter
        [number1Input, number2Input, operationSelect].forEach(element => {
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleCalculate();
                }
            });
        });

        // Предпросмотр при изменении операции
        operationSelect.addEventListener('change', () => this.handlePreview());
    }

    // Обработка вычисления
    handleCalculate() {
        const { number1Input, number2Input, operationSelect } = this.elements;
        
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        const operation = operationSelect.value;

        // Валидация ввода
        const validationErrors = [
            ErrorHandler.validateInput(num1Str, 'первое число'),
            ErrorHandler.validateInput(num2Str, 'второе число')
        ].filter(error => error !== null);

        if (validationErrors.length > 0) {
            this.showError(validationErrors[0]);
            return;
        }

        // Проверка корректности чисел
        if (!CalculatorUtils.isValidNumber(num1Str)) {
            this.showError('Пожалуйста, введите корректное первое число!');
            number1Input.focus();
            return;
        }

        if (!CalculatorUtils.isValidNumber(num2Str)) {
            this.showError('Пожалуйста, введите корректное второе число!');
            number2Input.focus();
            return;
        }

        // Парсинг чисел
        const num1 = CalculatorUtils.parseNumber(num1Str);
        const num2 = CalculatorUtils.parseNumber(num2Str);

        if (num1 === null || num2 === null) {
            this.showError('Одно из чисел некорректно!');
            return;
        }

        try {
            // Выполнение вычисления
            const result = CalculatorUtils.calculate(num1, num2, operation);
            
            // Формирование выражения
            const expression = CalculatorUtils.createExpression(num1, num2, operation);
            
            // Отображение результата
            this.showResult(result, expression);
            
        } catch (error) {
            const userMessage = ErrorHandler.handleCalculationError(error);
            this.showError(userMessage);
        }
    }

    // Предпросмотр результата
    handlePreview() {
        const { number1Input, number2Input, operationSelect, resultElement } = this.elements;
        
        const num1Str = number1Input.value;
        const num2Str = number2Input.value;
        
        if (!CalculatorUtils.isValidNumber(num1Str) || !CalculatorUtils.isValidNumber(num2Str)) {
            return;
        }

        const num1 = CalculatorUtils.parseNumber(num1Str);
        const num2 = CalculatorUtils.parseNumber(num2Str);
        
        if (num1 === null || num2 === null || num2 === 0 || !resultElement) {
            return;
        }

        try {
            const result = CalculatorUtils.calculate(num1, num2, operationSelect.value);
            const expression = CalculatorUtils.createExpression(num1, num2, operationSelect.value);
            resultElement.textContent = `${expression} = ${CalculatorUtils.formatNumber(result)}`;
            resultElement.style.color = '#495057';
        } catch (error) {
            // Игнорируем ошибки при предпросмотре
        }
    }

    // Обработка очистки истории
    handleClearHistory() {
        if (this.historyManager.clear()) {
            DOMUtils.createNotification('История успешно очищена', 'success');
        }
    }

    // Показать результат
    showResult(result, expression) {
        const { resultElement, errorElement } = this.elements;
        const formattedResult = CalculatorUtils.formatNumber(result);
        
        DOMUtils.showResult(resultElement, errorElement, formattedResult);
        
        // Добавляем в историю
        this.historyManager.addRecord(expression, formattedResult);
    }

    // Показать ошибку
    showError(message) {
        const { errorElement, errorTextElement, resultElement } = this.elements;
        DOMUtils.showError(errorElement, errorTextElement, resultElement, message);
    }

    // Очистить все поля
    clearAll() {
        const { number1Input, number2Input, operationSelect, resultElement, errorElement } = this.elements;
        DOMUtils.clearInputs(number1Input, number2Input, operationSelect, resultElement, errorElement);
    }

    // Анимация калькулятора
    animateCalculator() {
        const calculatorBody = document.querySelector('.calculator__body');
        DOMUtils.animateElement(calculatorBody);
    }
}

// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});