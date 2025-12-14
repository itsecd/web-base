import { DOMUtils } from './calculator-dom.js';

export class ErrorHandler {
    // Показать критическую ошибку
    static showCriticalError(error) {
        console.error('Критическая ошибка при загрузке калькулятора:', error);

        const errorContainer = document.createElement('div');
        errorContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%);
            color: white;
            padding: 20px;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        errorContainer.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; margin-right: 10px;"></i>
                <span>Ошибка загрузки калькулятора: ${error.message}</span>
                <button onclick="location.reload()" style="
                    margin-left: 20px;
                    background: white;
                    color: #c92a2a;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                ">
                    <i class="fas fa-redo" style="margin-right: 5px;"></i>
                    Перезагрузить
                </button>
            </div>
        `;

        document.body.appendChild(errorContainer);

        // Отключаем все интерактивные элементы
        this.disableInteractiveElements();
    }

    // Отключить интерактивные элементы
    static disableInteractiveElements() {
        const ids = ['calculate', 'clear', 'clearHistory', 'number1', 'number2', 'operation'];
        
        ids.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.disabled = true;
                element.style.opacity = '0.5';
                element.style.cursor = 'not-allowed';
            }
        });
    }

    // Обработчик ошибок выполнения вычислений
    static handleCalculationError(error, errorCallback) {
        const errorMessages = {
            'Деление на ноль невозможно!': 'Пожалуйста, введите второе число отличное от нуля.',
            'Неизвестная операция': 'Произошла внутренняя ошибка. Пожалуйста, перезагрузите страницу.',
            'Первое число некорректно!': 'Пожалуйста, введите корректное первое число.',
            'Второе число некорректно!': 'Пожалуйста, введите корректное второе число.'
        };

        const userMessage = errorMessages[error.message] || error.message;
        
        if (errorCallback) {
            errorCallback(userMessage);
        } else {
            console.error('Ошибка вычисления:', error);
        }

        return userMessage;
    }

    // Валидация ввода
    static validateInput(inputValue, inputName) {
        if (!inputValue || inputValue.trim() === '') {
            return `Пожалуйста, введите ${inputName}`;
        }

        // Проверка на слишком большие числа
        const num = parseFloat(inputValue);
        if (Math.abs(num) > 1e15) {
            return 'Число слишком большое. Пожалуйста, введите число поменьше.';
        }

        if (Math.abs(num) < 1e-15 && num !== 0) {
            return 'Число слишком маленькое. Пожалуйста, введите число побольше.';
        }

        return null;
    }
}