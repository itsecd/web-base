function calculate(){
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const op = document.getElementById("op").value;
    if (isNaN(a) || isNaN(b)){
        alert("Введите оба два числа");
        return;
    }

    let result;
    if(op === "+"){
        result = a + b;
    } else if(op === "-"){
        result = a - b;
    } else if(op === "*"){
        result = a * b;
    } else if(op === "/"){
        if(b === 0){
            alert("Нельзя");
            return ;
        }
        result = a / b;
    } else{
        alert("Неправильная операция");
        return ;
    }

    document.getElementById("result").innerText = result;
}