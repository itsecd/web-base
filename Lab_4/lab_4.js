const OPERATIONS = {sum: '+', sub: '-', mul: '*', div: '/'}


function calculate({a, b, operation}){
    let result = null;

    switch (operation){
        case OPERATIONS.sum:
            result=sum(a,b);
            break;

        case OPERATIONS.sub:
            result=sub(a,b);
            break;

        case OPERATIONS.mul:
            result=mul(a,b);
            break;

        case OPERATIONS.div:
            result=div(a,b);
            break;

        default:
            break;
    }

    return result;
}


document.addEventListener('DOMContentLoaded', () => {
    const InputANode=document.querySelector("input.block__number1");
    const OperationNode=document.querySelector("select.block__operations");
    const InputBNode=document.querySelector("input.block__number2");
    const ButtonNode=document.querySelector("button.row__button");
    const ResultNode=document.querySelector(".row__result");

    if (InputANode === null || InputANode === undefined || 
        OperationNode === null || OperationNode === undefined ||
        InputBNode === null || InputBNode === undefined ||
        ButtonNode === null || ButtonNode === undefined ||
        ResultNode === null || ResultNode === undefined) {
        console.error(`Один или несколько элементов в DOM не найдены`);
        return;
    }

    ButtonNode.addEventListener('click', function(){
        const a=Number(InputANode.value);
        const b=Number(InputBNode.value);
        const operation=OperationNode.value;

        if (InputANode.value === "" || InputBNode.value === ""){
                ResultNode.innerHTML = `Числа сами не появляются, я проверяла...`
                return;
        }

        if (operation === '/' && Number(InputBNode.value) === 0){
            ResultNode.innerHTML = `Давайте не надо применять чёрную магию`;
            return;
        }

        try {
                const result = calculate({a, b, operation});
                ResultNode.innerHTML=`Результат: ${result}`;
            } catch (error) {
                ResultNode.innerHTML = `Ошибка: ${error.message}`;
            }
    });
});