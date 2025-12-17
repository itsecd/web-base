//БЛОК ОБЩИХ ФУНКЦИЙ
//Блок чтения чисел
const inputA = document.getElementById('A');
function get_A() {
  return inputA.valueAsNumber;
}

const inputB = document.getElementById('B');
function get_A() {
  return inputB.valueAsNumber;
}

// Вывод результата на экран
const outputF=document.getElementById('result')
function set_result(x){
    outputF.textContent=x.toFixed(5);
}

function show_error(text){
    alert(text)
}

// БЛОК МАТЕМАТИЧЕСКИХ ФУНКЦИЙ
function add(){
    set_result(get_A()+get_B());
}

function substract(){
    set_result(get_A()-get_B());
}

function mult(){
    set_result(get_A()*get_B());
}

function divide(){
    let x = get_A();
    let y = get_B();
    if (y!==0){
        set_result(x/y);
    }
    else{
        show_error('На ноль делить нельзя!');
    }
}

function sin(){
    set_result(Math.sin(get_A()));
}

function cos(){
    set_result(Math.cos(get_A()));
}

function tg(){
    set_result(Math.tan(get_A()));
}

function ctg(){
    set_result(1/Math.tan(get_A()));
}

function ln(){
    let a = get_A();
    if (a<=0){
        show_error('Function undefined!');
    }
    set_result(Math.log(a));
}

function lg(){
    let a = get_A();
    if (a<=0){
        show_error('Function undefined!');
    }
    set_result(Math.log10(a));
}

function log_bA(){
    let a = get_A();
    let b = get_B();
    if (a<=0 || b <= 0 || a == 1 ){
        show_error('Fuction undefined!');
    }
    set_result(Math.log(a)/Math.log(b));
}

function exp(){
    set_result(Math.exp(get_A()));
}

function power(){
    set_result(Math.pow(get_A(),get_B()));
}

function sh(){
    set_result(Math.sinh(get_A()));
}

function ch(){
    set_result(Math.cosh(get_A()));
}

function th(){
    set_result(Math.tanh(get_A()));
}

function ctgh(){
    set_result(1/Math.tanh(get_A()));
}


// БЛОК ИНИЦИАЛИЗАЦИИ ОБРАБОТЧИКОВ
// Создадим привязки к каждой кнопке
function init_buttons() {
  const buttons = [
    { id: 'add', handler: add },
    { id: 'substr', handler: substract },
    { id: 'mult', handler: mult },
    { id: 'divide', handler: divide },
    { id: 'sin', handler: sin },
    { id: 'cos', handler: cos },
    { id: 'tg', handler: tg },
    { id: 'ctg', handler: ctg },
    { id: 'ln', handler: ln },
    { id: 'lg', handler: lg },
    { id: 'log_bA', handler: log_bA },
    { id: 'exp', handler: exp },
    { id: 'power', handler: power },
    { id: 'sh', handler: sh },
    { id: 'ch', handler: ch },
    { id: 'th', handler: th },
    { id: 'ctgh', handler: ctgh }
  ];

  buttons.forEach(({ id, handler }) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', handler);
    } else {
      console.warn(`Элемент с id="${id}" не найден!`);
    }
  });
}


init_buttons()

