document.addEventListener("DOMContentLoaded", () => {
    const calcBtn = document.getElementById('calculateBtn');
    const resBox = document.getElementById('result');

    if (calcBtn && resBox) {
        calcBtn.addEventListener('click', () => {
            const n1 = parseFloat(document.getElementById('num1').value);
            const n2 = parseFloat(document.getElementById('num2').value);
            const op = document.getElementById('operator').value;
            const prompt = '<span class="terminal__prompt">output:~$</span> ';

            if (isNaN(n1) || isNaN(n2)) {
                resBox.innerHTML = `${prompt}<span style="color: #ff5555;">[ERROR] MISSING_DATA</span>`;
                return;
            }

            
            let result;
            switch(op) {
                case 'add': result = n1 + n2; break;
                case 'sub': result = n1 - n2; break;
                case 'mul': result = n1 * n2; break;
                case 'div': 
                    if (Math.abs(n2) < 0.0000001) {
                        resBox.innerHTML = `${prompt}<span style="color: #ff5555;">[ERROR] DIV_BY_ZERO</span>`;
                        return;
                    }
                    result = n1 / n2; 
                    break;
            }

            const formattedResult = Number.isInteger(result) ? result : result.toFixed(4);
            resBox.innerHTML = `${prompt}<span style="color: #00ff88;">SUCCESS: ${formattedResult}</span>`;
        });
    } else {
        console.warn("Calculator elements (btn or result) not found in DOM.");
    }
});