document.addEventListener('DOMContentLoaded', () => {
    const firstInput = document.querySelector('.screen__input--first');
    const secondInput = document.querySelector('.screen__input--second');
    const opButtons = document.querySelectorAll('.operations__btn');
    const submitBtn = document.querySelector('.actions__submit');
    const resultEl = document.querySelector('.calc__result');
    
    if (!firstInput || !secondInput || !opButtons.length || !submitBtn || !resultEl) {
        console.error('Элементы не найдены!');
        return;
    }
    
    let currentOp = null;
    
    opButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentOp = btn.dataset.op;
            opButtons.forEach(b => {
                b.style.transform = 'scale(1)';
                b.style.backgroundColor = '';
                b.style.color = '';
            });
            btn.style.transform = 'scale(1.05)';
            btn.style.backgroundColor = '#007bff';
            btn.style.color = 'white';
        });
    });
    
    const calculate = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : null;
            default: return null;
        }
    };
    
    submitBtn.addEventListener('click', () => {
        const a = parseFloat(firstInput.value);
        const b = parseFloat(secondInput.value);
        
        if (!currentOp) {
            resultEl.textContent = 'Выберите операцию!';
            resultEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a52)';
            return;
        }
        
        if (isNaN(a) || isNaN(b)) {
            resultEl.textContent = 'Введите числа!';
            resultEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a52)';
            return;
        }
        
        if (currentOp === '/' && b === 0) {
            resultEl.textContent = 'Деление на 0 невозможно!';
            resultEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a52)';
            return;
        }
        
        const res = calculate(a, b, currentOp);
        if (res === null) {
            resultEl.textContent = 'Ошибка вычисления!';
            resultEl.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a52)';
        } else if (res === 100503) {
            resultEl.textContent = '🎉 Секретный режим! 🎉';
            document.body.style.background = 'linear-gradient(45deg, #ff9a9e, #fecfef)';
            resultEl.style.background = 'linear-gradient(90deg, #ffd700, #ffed4e)';
        } else {
            resultEl.textContent = `${a} ${currentOp} ${b} = ${res}`;
            resultEl.style.background = 'linear-gradient(90deg, #4facfe, #00f2fe)';
        }
    });
});
