function calculate()
{
	const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error-message');
            
    errorDiv.textContent = '';
    resultDiv.textContent = '';
            
           
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
            
           
    if (num1Input.value.trim() === '' || num2Input.value.trim() === '' || isNaN(num1) || isNaN(num2))
	{
		errorDiv.textContent = 'Ошибка: Пожалуйста, введите корректные числовые значения в оба поля.';
		resultDiv.textContent = '---';
		return;
    }
	
	let result;
	
	try
	{
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
		
		resultDiv.textContent = result.toFixed(4).replace(/.?0+$/, ''); 
                
    } catch (e)
	{
		errorDiv.textContent = 'Ошибка вычисления: ' + e.message;
		resultDiv.textContent = '---';
    }
}