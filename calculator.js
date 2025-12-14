// Основной файл калькулятора
// Теперь это всего лишь точка входа для модулей

// Добавляем поддержку модулей для старых браузеров
if (typeof window !== 'undefined') {
    // Проверяем поддержку модулей
    const supportsModules = 'noModule' in document.createElement('script');
    
    if (!supportsModules) {
        // Для старых браузеров показываем предупреждение
        document.addEventListener('DOMContentLoaded', function() {
            const warning = document.createElement('div');
            warning.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #ffd93d 0%, #f59f00 100%);
                color: #333;
                padding: 15px;
                text-align: center;
                font-family: 'Montserrat', sans-serif;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            `;
            warning.innerHTML = `
                <i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>
                Ваш браузер устарел. Для работы калькулятора рекомендуется обновить браузер 
                или использовать современный браузер (Chrome, Firefox, Edge, Safari).
            `;
            document.body.appendChild(warning);
        });
    }
}

// Для production можно собрать все в один файл с помощью сборщика
// В учебных целях оставляем модульную структуру

console.log('Калькулятор загружается...');