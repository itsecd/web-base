document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.items__element');
    
    let current='0';
    let previous='';
    let operator=null;

    function update_value(){
        display.value=current;
    }

    buttons.forEach(button => {
        button.addEventListener("click",function(){
            const clicked_button=this.textContent;
            if(clicked_button==='AC'){
                current='0';
                previous='';
                operator=null;
                update_value();
                return;
            }
            if(clicked_button==='+/-'){
                if(current!=='0'){
                    current=(parseFloat(current)*-1).toString();
                    update_value();
                    return;
                }
            }
            if(clicked_button==='%'){
                current=(parseFloat(current)/100).toString();
                update_value();
                return;
            }
            if(['+','-','/','x'].includes(clicked_button)){
                if(operator!==null&&previous!==''){
                    calculate();
                }
                operator=clicked_button;
                previous=current;
                current='0';
                update_value();
                return;
            }
            if(clicked_button==='='){
                if(operator!==null&&previous!==''){
                    calculate();
                    operator=null;
                }
                return;
            }
            if(clicked_button==='.'){
                current+='.';
                update_value();
                return;
            }
            if(!isNaN(clicked_button)||clicked_button==='0'){
                if(current==='0'){
                    current=clicked_button;
                }
                else{
                    current+=clicked_button;
                }
                update_value();
            }
        })
        
    });
    function calculate(){
        let result;
        const cur=parseFloat(current);
        const prev=parseFloat(previous);
        switch(operator){
            case '+':
                result=prev+cur;
                break;
            case '/':
                if(cur===0){
                    alert("Ошибка:деление на ноль!")
                    return;
                }
                else{
                    result=prev/cur;
                }
                break;
            case '-':
                result=prev-cur;
                break;
            case 'x':
                result=prev*cur;
                break;
            default:
                return;
        }
        current=result.toString();
        previous='';
        update_value();
    }
    update_value();
});