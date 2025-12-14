// Утилиты для работы с хранилищем
export const StorageUtils = {
    // Проверка доступности localStorage
    isLocalStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.warn('localStorage недоступен:', e.message);
            return false;
        }
    },

    // Безопасная загрузка из localStorage
    safeGetLocalStorage(key, defaultValue) {
        if (!this.isLocalStorageAvailable()) {
            return defaultValue;
        }
        
        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue;
            }
            
            // Пытаемся распарсить JSON
            return JSON.parse(item);
        } catch (e) {
            console.error(`Ошибка при чтении из localStorage (ключ: ${key}):`, e);
            // Если не удалось распарсить, возвращаем defaultValue
            return defaultValue;
        }
    },

    // Безопасное сохранение в localStorage
    safeSetLocalStorage(key, value) {
        if (!this.isLocalStorageAvailable()) {
            console.warn(`localStorage недоступен, не могу сохранить: ${key}`);
            return false;
        }
        
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (e) {
            console.error(`Ошибка при сохранении в localStorage (ключ: ${key}):`, e);
            
            // Если ошибка из-за превышения квоты, пытаемся очистить старые данные
            if (e.name === 'QuotaExceededError' || e.code === 22) {
                console.warn('Превышена квота localStorage, пытаемся очистить...');
                try {
                    // Удаляем самый старый элемент истории
                    const currentHistory = this.safeGetLocalStorage(key, []);
                    if (currentHistory.length > 1) {
                        currentHistory.shift(); // Удаляем первый (самый старый) элемент
                        localStorage.setItem(key, JSON.stringify(currentHistory));
                        // Пытаемся снова сохранить
                        localStorage.setItem(key, JSON.stringify(value));
                        return true;
                    }
                } catch (clearError) {
                    console.error('Не удалось очистить место в localStorage:', clearError);
                }
            }
            
            return false;
        }
    },

    // Безопасное удаление из localStorage
    safeRemoveLocalStorage(key) {
        if (!this.isLocalStorageAvailable()) {
            return false;
        }
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Ошибка при удалении из localStorage (ключ: ${key}):`, e);
            return false;
        }
    }
};