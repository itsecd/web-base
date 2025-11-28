document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('result');
    
    let number_1=document.getElementById('num1');
    let number_2=document.getElementById('num2');
    let operator=document.getElementById('operation');
    let button=document.getElementById('calculate')

    function update_value(result){
        display.textContent=result;
    }

    function calculate(){
        let result;
        const n_1=parseFloat(number_1.value);
        const n_2=parseFloat(number_2.value);
        if(isNaN(n_1)||isNaN(n_2)){
            alert("Введите оба числа!");
            update_value('-');
            return;
        }
        }
        switch(operator.value){
            case '+':
                result=n_1+n_2;
                break;
            case '/':
                if(n_2===0){
                    alert("Ошибка:деление на ноль!")
                    return;
                }
                else{
                    result=n_1/n_2;
                }
                break;
            case '-':
                result=n_1-n_2;
                break;
            case '*':
                result=n_1*n_2;
                break;
            default:
                return;
        }
        update_value(result);
    }
    button.addEventListener('click',calculate);
});
