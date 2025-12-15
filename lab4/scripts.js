function calculate(){
    const el1 = document.getElementById('n1');
    const el2 = document.getElementById('n2');
    const opr = document.getElementById('operations')

    if (!el1 || !el2 || !opr){
        console.error('Какой-либо элемент не найден\n')
    }

    const num1 = el1.value.trim();
    const num2 = el2.value.trim();
    const operation = opr.value;

    document.getElementById('result').textContent = '';
    document.getElementById('error').textContent = '';

    if (num1 === '' || num2 === ''){
        document.getElementById('error').textContent = 'Поля должны быть заполнены';
        return;
    }

    const a = Number(num1);
    const b = Number(num2);

    if (isNaN(a) || isNaN(b)){
        document.getElementById('error').textContent = 'Введите корректные числа.';
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
                document.getElementById('error').textContent = 'Деление на 0 невозможно';
                return;
            }
            result = a/b;
            break;
        default:
            document.getElementById('error').textContent = 'Неизвестная операция, попробуйте снова'
            return;
    }

    document.getElementById('result').textContent = `Результат: ${result}`;
}

document.getElementById('button').addEventListener('click', calculate);