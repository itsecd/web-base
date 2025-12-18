// Функция для вычисления результата математической операции
function performCalculation(num1, num2, operation) {
    let result;
    let operationSymbol;
    
    // Выполняем выбранную операцию
    switch(operation) {
        case 'add':
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case 'subtract':
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case 'multiply':
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                return {
                    success: false,
                    message: "Ошибка: деление на ноль!",
                    operation: 'divide'
                };
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        case 'power':
            result = Math.pow(num1, num2);
            operationSymbol = '^';
            break;
        case 'modulo':
            if (num2 === 0) {
                return {
                    success: false,
                    message: "Ошибка: деление на ноль!",
                    operation: 'modulo'
                };
            }
            result = num1 % num2;
            operationSymbol = '%';
            break;
        default:
            return {
                success: false,
                message: "Неизвестная операция",
                operation: 'unknown'
            };
    }
    
    // Округляем результат до 4 знаков после запятой
    result = Math.round(result * 10000) / 10000;
    
    return {
        success: true,
        result: result,
        operationSymbol: operationSymbol,
        num1: num1,
        num2: num2
    };
}