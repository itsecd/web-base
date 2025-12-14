// Утилиты для работы с числами и операциями
export const CalculatorUtils = {
    // Функция для проверки числа
    isValidNumber(numStr) {
        // Разрешаем отрицательные числа, десятичные дроби
        // Также разрешаем научную нотацию: 1e5, 2.5e-3 и т.д.
        const numRegex = /^-?\d*\.?\d+(?:e[+-]?\d+)?$/i;
        return numRegex.test(numStr.trim()) && numStr.trim() !== '';
    },

    // Функция для парсинга числа
    parseNumber(numStr) {
        const num = parseFloat(numStr.trim());
        // Проверяем, что это конечное число
        if (isNaN(num) || !isFinite(num)) {
            return null;
        }
        return num;
    },

    // Функция для выполнения операции
    calculate(num1, num2, operation) {
        switch(operation) {
            case 'add':
                return num1 + num2;
            case 'subtract':
                return num1 - num2;
            case 'multiply':
                return num1 * num2;
            case 'divide':
                if (num2 === 0) {
                    throw new Error('Деление на ноль невозможно!');
                }
                return num1 / num2;
            default:
                throw new Error('Неизвестная операция');
        }
    },

    // Функция для получения символа операции
    getOperationSymbol(operation) {
        switch(operation) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '?';
        }
    },

    // Функция для форматирования числа
    formatNumber(num) {
        // Если число целое, показываем без десятичной части
        if (Number.isInteger(num)) {
            return num.toString();
        }
        // Иначе показываем с округлением до 4 знаков
        const formatted = parseFloat(num.toFixed(4)).toString();
        
        // Убираем лишние нули в конце
        return formatted.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    },

    // Функция для создания выражения
    createExpression(num1, num2, operation) {
        const num1Formatted = this.formatNumber(num1);
        const num2Formatted = this.formatNumber(num2);
        const symbol = this.getOperationSymbol(operation);
        return `${num1Formatted} ${symbol} ${num2Formatted}`;
    }
};