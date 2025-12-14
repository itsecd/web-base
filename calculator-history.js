import { StorageUtils } from './calculator-storage.js';

export class HistoryManager {
    constructor(historyListElement, clearHistoryButton) {
        this.historyList = historyListElement;
        this.clearHistoryButton = clearHistoryButton;
        this.history = StorageUtils.safeGetLocalStorage('calculatorHistory', []);
        this.MAX_HISTORY_ITEMS = 50;
        this.MAX_DISPLAY_ITEMS = 10;
    }

    // Получить всю историю
    getHistory() {
        return [...this.history]; // Возвращаем копию
    }

    // Добавить запись в историю
    addRecord(expression, result) {
        const record = {
            expression,
            result,
            timestamp: new Date().toISOString()
        };

        this.history.push(record);

        // Ограничиваем историю
        if (this.history.length > this.MAX_HISTORY_ITEMS) {
            this.history = this.history.slice(-this.MAX_HISTORY_ITEMS);
        }

        // Сохраняем в хранилище
        StorageUtils.safeSetLocalStorage('calculatorHistory', this.history);

        // Обновляем отображение
        this.render();
    }

    // Очистить историю
    clear() {
        if (confirm('Вы уверены, что хотите очистить историю вычислений?')) {
            this.history = [];
            StorageUtils.safeRemoveLocalStorage('calculatorHistory');
            this.render();
            return true;
        }
        return false;
    }

    // Отрисовка истории
    render() {
        if (!this.historyList) return;

        this.historyList.innerHTML = '';

        if (this.history.length === 0) {
            const emptyItem = this.createEmptyHistoryItem();
            this.historyList.appendChild(emptyItem);
            return;
        }

        // Отображаем последние N вычислений
        const displayHistory = this.history
            .slice(-this.MAX_DISPLAY_ITEMS)
            .reverse();

        displayHistory.forEach(item => {
            const historyItem = this.createHistoryItem(item);
            this.historyList.appendChild(historyItem);
        });

        // Обновляем кнопку очистки истории
        this.updateClearButton();
    }

    // Создать элемент пустой истории
    createEmptyHistoryItem() {
        const emptyItem = document.createElement('li');
        emptyItem.className = 'calculator__history-item calculator__history-item--empty';
        emptyItem.textContent = 'История пуста';
        return emptyItem;
    }

    // Создать элемент истории
    createHistoryItem(item) {
        const historyItem = document.createElement('li');
        historyItem.className = 'calculator__history-item';

        const expressionSpan = document.createElement('span');
        expressionSpan.className = 'calculator__history-expression';
        expressionSpan.textContent = item.expression;

        const resultSpan = document.createElement('span');
        resultSpan.className = 'calculator__history-result';
        resultSpan.textContent = `= ${item.result}`;

        historyItem.appendChild(expressionSpan);
        historyItem.appendChild(resultSpan);

        // Добавляем тултип с датой
        if (item.timestamp) {
            const date = new Date(item.timestamp);
            historyItem.title = `Вычислено: ${date.toLocaleString()}`;
        }

        return historyItem;
    }

    // Обновить кнопку очистки истории
    updateClearButton() {
        if (this.clearHistoryButton) {
            this.clearHistoryButton.innerHTML = `
                <i class="fas fa-trash-alt calculator__history-clear-icon"></i>
                Очистить историю (${this.history.length})
            `;
        }
    }

    // Получить последнюю запись
    getLastRecord() {
        return this.history.length > 0 ? this.history[this.history.length - 1] : null;
    }

    // Получить количество записей
    getRecordCount() {
        return this.history.length;
    }
}