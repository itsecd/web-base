document.getElementById('calculate').addEventListener('click', () => {
  const num1Input = document.getElementById('num1').value.trim();
  const num2Input = document.getElementById('num2').value.trim();
  const operation = document.getElementById('operation').value;
  const resultDiv = document.getElementById('result');

  // Очистка предыдущего результата/ошибки
  resultDiv.textContent = '';
  resultDiv.style.color = '#333';

  // Проверка на пустые поля
  if (num1Input === '' || num2Input === '') {
    resultDiv.textContent = 'Ошибка: Заполните оба поля!';
    resultDiv.style.color = 'red';
    return; 
  }

  const num1 = parseFloat(num1Input);
  const num2 = parseFloat(num2Input);

  // Проверка на корректность чисел
  if (isNaN(num1) || isNaN(num2)) {
    resultDiv.textContent = 'Ошибка: Введите корректные числа!';
    resultDiv.style.color = 'red';
    return;
  }

  let result;
  let isError = false;

  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 === 0) {
        resultDiv.textContent = 'Ошибка: Деление на ноль!';
        resultDiv.style.color = 'red';
        return;
      }
      result = num1 / num2;
      break;
    default:
      resultDiv.textContent = 'Ошибка: Неизвестная операция.';
      resultDiv.style.color = 'red';
      return;
  }

  // Отображение результата
  resultDiv.textContent = `${result}`;
});