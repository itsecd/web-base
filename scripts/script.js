function get_A(){
    return document.getElementById('A').valueAsNumber;
}

function get_B(){
    return document.getElementById('B').valueAsNumber;
}

function set_result(x){
    document.getElementById('result').textContent=x;
}

// Создадим привязки к каждой кнопке
function add(){
    set_result(get_A()+get_B());
}
document.getElementById('add').onclick=add;


function substract(){
    set_result(get_A()-get_B());
}
document.getElementById('substr').onclick=substract;

function mult(){
    set_result(get_A()*get_B());
}
document.getElementById('mult').onclick=mult;

function divide(){
    let x = get_A();
    let y = get_B();
    if (y!==0){
        set_result(x/y);
    }
    else{
        alert('На ноль делить нельзя!');
    }
}
document.getElementById('divide').onclick=divide;

function sin(){
    set_result(Math.sin(get_A()));
}
document.getElementById('sin').onclick=sin;

function cos(){
    set_result(Math.cos(get_A()));
}
document.getElementById('cos').onclick=cos;

function tg(){
    set_result(Math.tan(get_A()));
}
document.getElementById('tg').onclick=tg;

function ctg(){
    set_result(1/Math.tan(get_A()));
}
document.getElementById('ctg').onclick=ctg;


function ln(){
    let a = get_A();
    if (a<=0){
        alert('Function undefined!');
    }
    set_result(Math.log(a));
}
document.getElementById('ln').onclick=ln;

function lg(){
    let a = get_A();
    if (a<=0){
        alert('Function undefined!');
    }
    set_result(Math.log10(a));
}
document.getElementById('lg').onclick=lg;

function log_bA(){
    let a = get_A();
    let b = get_B();
    if (a<=0 || b <= 0 || a == 1 ){
        alert('Fuction undefined!');
    }
    set_result(Math.log(a)/Math.log(b));
}
document.getElementById('log_bA').onclick=log_bA;

function exp(){
    set_result(Math.exp(get_A()));
}
document.getElementById('exp').onclick=exp;

function power(){
    set_result(Math.pow(get_A(),get_B()));
}
document.getElementById('power').onclick=power;

function sh(){
    set_result(Math.sinh(get_A()));
}
document.getElementById('sh').onclick=sh;

function ch(){
    set_result(Math.cosh(get_A()));
}
document.getElementById('ch').onclick=ch;

function th(){
    set_result(Math.tanh(get_A()));
}
document.getElementById('th').onclick=th;

function ctgh(){
    set_result(1/Math.tanh(get_A()));
}
document.getElementById('ctgh').onclick=ctgh;