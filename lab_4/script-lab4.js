const ERROR_TIMEOUT = 3000;
const DEFAULT_PRECISION = 10;

const form = document.getElementById('calculatorForm');
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const resultDiv = document.getElementById('result');
const resultValue = document.getElementById('resultValue');
const errorDiv = document.getElementById('error');

/**
 * Функция для округления числа с заданной точностью
 * @param {number} value - Число для округления
 * @param {number} precision - Количество знаков после запятой (по умолчанию 10)
 * @returns {number} Округленное число
 */
function roundNumber(value, precision = DEFAULT_PRECISION) {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Функция для скрытия ошибки
 */
function clearError() {
  errorDiv.classList.remove('calculator__error--visible');
}

/**
 * Функция для отображения ошибки
 * @param {string} message
 */
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.add('calculator__error--visible');
  resultDiv.classList.remove('calculator__result--visible');

  setTimeout(() => {
    clearError();
  }, ERROR_TIMEOUT);
}

/**
 * Функция для отображения результата
 * @param {number} value
 */
function showResult(value) {
  clearError();
  resultValue.textContent = value;
  resultDiv.classList.add('calculator__result--visible');
}

/**
 * Функция для выполнения вычислений
 * @param {number} num1
 * @param {number} num2
 * @param {string} operation
 * @returns {number}
 */
function calculate(num1, num2, operation) {
  switch (operation) {
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
}

// Обработчик отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const num1 = parseFloat(num1Input.value);
  const num2 = parseFloat(num2Input.value);
  const operation = operationSelect.value;

  if (isNaN(num1) || isNaN(num2)) {
    showError('Пожалуйста, введите корректные числа!');
    return;
  }

  if (!operation) {
    showError('Пожалуйста, выберите операцию!');
    return;
  }

  try {
    const result = calculate(num1, num2, operation);
    const roundedResult = roundNumber(result);
    showResult(roundedResult);
  } catch (error) {
    showError(error.message);
  }
});

// Обработчики ввода для скрытия ошибок
[num1Input, num2Input, operationSelect].forEach(element => {
  element.addEventListener('input', () => {
    clearError();
  });
});