function calculate(){
    const number1_input = document.getElementById('number1');
    const operation_select = document.getElementById('operation');
    const number2_input = document.getElementById('number2');
    const result_ele = document.getElementById('result');

    const number1 = parseFloat(number1_input.value);
    const number2 = parseFloat(number2_input.value);
    const operation = operation_select.value; 

    if(isNaN(number1) || isNaN(number2)){
        result_ele.textContent = 'Result: Please enter both numbers!!!.';
        result_ele.style.color = 'red';
        return;
    }

    let result;

    switch(operation){
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            if(number2 === 0){
                result_ele.textContent = 'Result: Cannot be divided by 0!!!.';
                result_ele.style.color = 'red';
                return;
            }
            if(number1 % number2 === 0){
                result = number1 / number2;
            }else{
                result = (number1 / number2).toFixed(2);
            }
            break;
        default:
            return;    
    }

    result_ele.textContent = 'Result:' + result;
}

function clearAll() {
    const number1_input = document.getElementById('number1');
    const operation_seclect = document.getElementById('operation');
    const number2_input = document.getElementById('number2');
    const result_ele = document.getElementById('result');

    number1_input.value = '';
    number2_input.value = '';
    operation_seclect.value = '+';

    result_ele.textContent = 'Result: ';
    result_ele.style.color = '#111111';
}
