function sum(lhs, rhs) {
    let res = +lhs + +rhs
    console.log(res)
    return res
}
function sub(lhs, rhs) {
    let res = +lhs - +rhs
    console.log(res)
    return res
}
function mult(lhs, rhs) {
    let res = +lhs * +rhs
    console.log(res)
    return res
}
function div(lhs, rhs) {
    if (rhs != 0) {
        let res = +lhs / +rhs
        console.log(res)
        return res
    }
    else {
        return "На ноль делить нельзя"
    }
}
function solve() {
    let lhs = document.getElementById("lhs").value
    console.log(lhs)
    let rhs = document.getElementById("rhs").value
    console.log(rhs)
    if (lhs == "" || rhs == "") {
        return
    }
    let act = document.getElementById("act").value
    console.log(act)
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
    document.getElementById("result").value = "Результат: " + result
}