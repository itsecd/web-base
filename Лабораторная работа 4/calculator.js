function performCalculation(num1, num2, operation)
{
    let result;
    switch (operation)
	{
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
            if (num2 === 0)
			{
                throw new Error("Деление на ноль невозможно.");
            }
            result = num1 / num2;
            break;
        default:
            throw new Error("Неизвестная операция.");
    }
    return result;
}

function displayError(errorElement, message)
{
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function hideError(errorElement)
{
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function calculate()
{
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error-message');

    hideError(errorDiv);
    resultDiv.textContent = '0';

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);

    if (isNaN(num1) || isNaN(num2))
	{
        displayError(errorDiv, 'Ошибка: Пожалуйста, введите корректные числовые значения в оба поля.');
        resultDiv.textContent = '---';
        return;
    }

    let result;
    try
	{
        result = performCalculation(num1, num2, operation);

        resultDiv.textContent = result.toFixed(4).replace(/\.?0+$/, '');
    } catch (e) {
        displayError(errorDiv, 'Ошибка вычисления: ' + e.message);
        resultDiv.textContent = '---';
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton)
	{
        calculateButton.addEventListener('click', calculate);
    }
});