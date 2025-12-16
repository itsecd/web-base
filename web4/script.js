const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const opEl = document.getElementById("operation");
const btn = document.getElementById("calculate");
const resultEl = document.getElementById("result");
const errorEl = document.getElementById("error");

function formatResult(n) {
  if (!isFinite(n)) return String(n);
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toFixed(10)).toString();
}

function showError(msg) {
  errorEl.textContent = msg;
  resultEl.textContent = "-";
}

function clearError() {
  errorEl.textContent = "";
}

function calculate() {
  clearError();
  const a = parseFloat(num1El.value);
  const b = parseFloat(num2El.value);

  if (isNaN(a) || isNaN(b)) {
    showError("Пожалуйста, введите оба числа.");
    return;
  }

  let res;
  const op = opEl.value;
  if (op === "add") res = a + b;
  else if (op === "subtract") res = a - b;
  else if (op === "multiply") res = a * b;
  else if (op === "divide") {
    if (b === 0) {
      showError("Деление на ноль невозможно.");
      return;
    }
    res = a / b;
  }

  resultEl.textContent = formatResult(res);
}

btn.addEventListener("click", calculate);

[num1El, num2El].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") calculate();
  });
});
