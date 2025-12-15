function calculate(){
    const el1 = document.getElementById('n1');
    const el2 = document.getElementById('n2');
    const opr = document.getElementById('operations');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');

   if (!el1 || !el2 || !opr || !resultEl || !errorEl) {
        console.error('Один или несколько элементов не найдены')
        return;
    }

    const num1 = el1.value.trim();
    const num2 = el2.value.trim();
    const operation = opr.value;

    resultEl.textContent = '';
    errorEl.textContent = '';

    if (num1 === '' || num2 === ''){
        errorEl.textContent = 'Поля должны быть заполнены';
        return;
    }

    const a = Number(num1);
    const b = Number(num2);

    if (isNaN(a) || isNaN(b)){
        errorEl.textContent = 'Введите корректные числа.';
        return;
    }

    let result;
    switch(operation){
        case "plus":
            result = a+b;
            break;
        case "minus":
            result = a-b;
            break;
        case "multiply":
            result = a*b;
            break;
        case "divide":
            if (b === 0){
                errorEl.textContent = 'Деление на 0 невозможно';
                return;
            }
            result = a/b;
            break;
        default:
            errorEl.textContent = 'Неизвестная операция, попробуйте снова'
            return;
    }
    resultEl.textContent = `Результат: ${result}`;
}

document.getElementById('button').addEventListener('click', calculate);