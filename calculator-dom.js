export class DOMUtils {
    // Безопасное получение элементов DOM с проверкой
    static getElement(id, elementName) {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Элемент с ID "${id}" (${elementName}) не найден на странице!`);
            throw new Error(`Не найден необходимый элемент: ${elementName}`);
        }
        return element;
    }

    static getElementBySelector(selector, elementName) {
        const element = document.querySelector(selector);
        if (!element) {
            console.error(`Элемент с селектором "${selector}" (${elementName}) не найден на странице!`);
            throw new Error(`Не найден необходимый элемент: ${elementName}`);
        }
        return element;
    }

    // Показать ошибку
    static showError(errorElement, errorTextElement, resultElement, message) {
        if (!resultElement) return;

        resultElement.textContent = 'Ошибка!';
        resultElement.style.color = '#c92a2a';

        if (errorTextElement) {
            errorTextElement.textContent = message;
        }

        if (errorElement) {
            errorElement.style.display = 'flex';

            // Добавляем анимацию тряски
            errorElement.style.animation = 'none';
            setTimeout(() => {
                if (errorElement) {
                    errorElement.style.animation = 'shake 0.5s';
                }
            }, 10);
        }
    }

    // Показать результат
    static showResult(resultElement, errorElement, resultValue) {
        if (!resultElement) return;

        resultElement.textContent = resultValue;
        resultElement.style.color = '#212529';

        // Прячем ошибку если она была показана
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    // Очистить поля ввода
    static clearInputs(number1Input, number2Input, operationSelect, resultElement, errorElement) {
        if (number1Input) number1Input.value = '';
        if (number2Input) number2Input.value = '';
        if (operationSelect) operationSelect.value = 'add';

        if (resultElement) {
            resultElement.textContent = 'Ожидание вычисления...';
            resultElement.style.color = '#212529';
        }

        if (errorElement) {
            errorElement.style.display = 'none';
        }

        // Фокус на первое поле
        if (number1Input) {
            number1Input.focus();
        }
    }

    // Создать уведомление
    static createNotification(message, type = 'success') {
        const colors = {
            success: { bg: 'linear-gradient(135deg, #51cf66 0%, #2b8a3e 100%)', icon: 'fa-check-circle' },
            warning: { bg: 'linear-gradient(135deg, #ffd93d 0%, #f59f00 100%)', icon: 'fa-exclamation-triangle' },
            error: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)', icon: 'fa-exclamation-circle' }
        };

        const config = colors[type] || colors.success;

        const notification = document.createElement('div');
        notification.className = 'calculator__notification';
        notification.innerHTML = `
            <i class="fas ${config.icon} calculator__notification-icon"></i>
            <span class="calculator__notification-text">${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${config.bg};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1000;
            animation: slideIn 0.3s;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            max-width: 400px;
        `;

        // Добавляем стили для анимации если их еще нет
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Автоматическое скрытие уведомления
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);

        return notification;
    }

    // Показать предупреждение о localStorage
    static showStorageWarning() {
        const warningElement = document.createElement('div');
        warningElement.className = 'calculator__storage-warning';
        warningElement.innerHTML = `
            <i class="fas fa-exclamation-triangle calculator__storage-warning-icon"></i>
            <span class="calculator__storage-warning-text">
                История вычислений будет доступна только в текущей сессии. 
                Для постоянного сохранения включите cookies и localStorage в настройках браузера.
            </span>
        `;

        // Добавляем стили для предупреждения
        if (!document.querySelector('#storage-warning-styles')) {
            const style = document.createElement('style');
            style.id = 'storage-warning-styles';
            style.textContent = `
                .calculator__storage-warning {
                    background: linear-gradient(135deg, #ffd93d 0%, #ff6b6b 100%);
                    color: #333;
                    padding: 12px 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.95rem;
                    animation: fadeIn 0.5s;
                }
                
                .calculator__storage-warning-icon {
                    font-size: 1.2rem;
                    color: #c92a2a;
                }
                
                .calculator__storage-warning-text {
                    flex: 1;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }

        return warningElement;
    }

    // Анимация появления элемента
    static animateElement(element, delay = 100) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.5s, transform 0.5s';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
}