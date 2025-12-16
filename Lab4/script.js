function sum(lhs, rhs) {
    let res = lhs + rhs
    return res
}
function sub(lhs, rhs) {
    let res = lhs - rhs
    return res
}
function mult(lhs, rhs) {
    let res = lhs * rhs
    return res
}
function div(lhs, rhs) {
    if (rhs != 0) {
        let res = lhs / rhs
        return res
    }
    else {
        return "На ноль делить нельзя"
    }
}
function solve() {
    let lhs = +document.getElementById("lhs").value
    let rhs = +document.getElementById("rhs").value
    if (isNaN(lhs) || isNaN(rhs)) {
        document.getElementById("result").value = "Ошибка!"
        return
    }
    let act = document.getElementById("act").value
    let result = 0
    switch (act) {
        case "sum":
            result = sum(lhs, rhs)
            break;
        case "sub":
            result = sub(lhs, rhs)
            break;
        case "mult":
            result = mult(lhs, rhs)
            break;
        case "div":
            result = div(lhs, rhs)
            break;
        case "":
            return
            break;
    }
    if (isNaN(result)) {
        document.getElementById("result").value = result
        return
    }
    document.getElementById("result").value = "Результат: " + Math.round(result * 100000) / 100000
}
function click() {
    console.log("skdjfnlkn")
    const button = document.getElementById("calc")
    button.addEventListener('click', solve)
}