// Элементы страницы
const form = document.getElementById('calculatorForm');
const firstInput = document.getElementById('firstNumber');
const secondInput = document.getElementById('secondNumber');
const operationSelect = document.getElementById('operation');
const operationIcon = document.getElementById('operationIcon');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('historyList');
const resetBtn = document.getElementById('resetBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const symbols = {
    'add': '+',
    'subtract': '-',
    'multiply': '×',
    'divide': '÷'
};

let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

operationSelect.addEventListener('change', function() {
    operationIcon.textContent = symbols[this.value];
});

// Вычисление
function calculate(a, b, operation) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (isNaN(a) || isNaN(b)) {
        return { value: null, error: 'Ошибка: введите числа' };
    }
    
    let result;
    
    switch(operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            if (b === 0) {
                return { value: null, error: 'Ошибка: деление на ноль' };
            }
            result = a / b;
            break;
        default:
            return { value: null, error: 'Ошибка: неизвестная операция' };
    }

    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(6));
    }
    
    return { value: result, error: null };
}

function showResult(result, error) {
    resultDiv.textContent = error || result;
    
    resultDiv.classList.remove('calculator__result--error', 'calculator__result--success');

    if (error) {
        resultDiv.classList.add('calculator__result--error');
    } else {
        resultDiv.classList.add('calculator__result--success');
    }
}

function addToHistory(a, b, operation, result) {
    const item = {
        id: Date.now(),
        expr: `${a} ${symbols[operation]} ${b}`,
        result: result
    };
    
    history.unshift(item);

    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('calcHistory', JSON.stringify(history));
    showHistory();
}

function showHistory() {
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        const li = document.createElement('li');
        li.className = 'calculator__history-item';
        li.textContent = 'Здесь будут ваши вычисления';
        historyList.appendChild(li);
        return;
    }
    
    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'calculator__history-item';
        
        const exprSpan = document.createElement('span');
        exprSpan.className = 'calculator__history-expression';
        exprSpan.textContent = item.expr + ' = ';
        
        const resultSpan = document.createElement('span');
        resultSpan.className = 'calculator__history-result';
        resultSpan.textContent = item.result;
        
        li.appendChild(exprSpan);
        li.appendChild(resultSpan);
        historyList.appendChild(li);
    });
}

// Очистка истории
function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    showHistory();
}

// Обработка формы
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const a = firstInput.value;
    const b = secondInput.value;
    const op = operationSelect.value;
    
    const { value, error } = calculate(a, b, op);
    
    showResult(value, error);
    
    if (!error) {
        addToHistory(a, b, op, value);
    }
});

// Сброс
resetBtn.addEventListener('click', function() {
    form.reset();
    resultDiv.textContent = 'Здесь появится результат';
    resultDiv.classList.remove('calculator__result--error', 'calculator__result--success');
    operationIcon.textContent = '+';
});

// Очистка истории
clearHistoryBtn.addEventListener('click', clearHistory);

// Показываем историю при загрузке
showHistory();