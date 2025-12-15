/**
 * ФУНКЦИЯ ДЛЯ ОБНОВЛЕНИЯ ДАТЫ В ПОДВАЛЕ
 */
function updateFooterDates() {
    // Текущая дата и год
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Месяцы на русском
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    
    // Обновляем год в подвале
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Обновляем дату в подвале
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const currentMonth = months[now.getMonth()];
        dateElement.textContent = `${currentMonth} ${currentYear}`;
    }
    
    console.log('Даты в подвале обновлены');
}

/**
 * ФУНКЦИЯ ДЛЯ АНИМАЦИИ СЕКЦИЙ
 */
function animateSections() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        // Показываем секции с анимацией и задержкой
        setTimeout(() => {
            section.classList.add('animated');
        }, 100 + index * 150);
    });
    
    console.log(`Анимировано ${sections.length} секций`);
}

/**
 * ФУНКЦИЯ ДЛЯ ИНТЕРАКТИВНЫХ ТЕГОВ НАВЫКОВ
 */
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        // Эффект при наведении
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 6px 12px rgba(72, 6, 7, 0.2)';
        });
        
        // Эффект при уходе курсора
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Эффект при клике
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            console.log(`Нажат навык: ${this.textContent}`);
        });
    });
    
    console.log(`Инициализировано ${skillTags.length} тегов навыков`);
}

/**
 * ФУНКЦИЯ ДЛЯ ССЫЛКИ НА GITHUB
 */
function initGitHubLink() {
    const githubLink = document.querySelector('.github-link');
    
    if (githubLink) {
        // Эффект при наведении
        githubLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        // Эффект при уходе курсора
        githubLink.addEventListener('mouseleave', function() {
            if (!this.classList.contains('clicked')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Эффект при клике
        githubLink.addEventListener('click', function() {
            this.classList.add('clicked');
            this.style.transform = 'translateY(-1px) scale(0.98)';
            console.log('Переход на GitHub профиль');
        });
    }
}

/**
 * ФУНКЦИЯ ДЛЯ АВАТАРКИ
 */
function initAvatar() {
    const avatarImage = document.querySelector('.avatar-image');
    
    if (avatarImage) {
        // Эффект при клике на аватарку
        avatarImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(5deg)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
            
            console.log('Аватарка кликнута!');
        });
        
        // Сообщение при загрузке изображения
        avatarImage.addEventListener('load', function() {
            console.log('Изображение аватарки загружено');
        });
        
        // Сообщение при ошибке загрузки изображения
        avatarImage.addEventListener('error', function() {
            console.error('Ошибка загрузки изображения аватарки');
            // Можно показать placeholder
            this.alt = 'Изображение не загружено';
            this.style.border = '2px dashed #a82c2e';
        });
    }
}

/**
 * ФУНКЦИЯ ДЛЯ ЭЛЕМЕНТОВ СПИСКА УВЛЕЧЕНИЙ
 */
function initHobbyItems() {
    const hobbyItems = document.querySelectorAll('.hobbies-list li');
    
    hobbyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '15px';
            this.style.color = 'var(--primary-light)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '0';
            this.style.color = '';
        });
        
        item.addEventListener('click', function() {
            const hobbyText = this.textContent.trim();
            console.log(`Выбрано увлечение: ${hobbyText}`);
        });
    });
}

/**
 * ОСНОВНАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ
 */
function init() {
    console.log('Инициализация страницы резюме...');
    
    // 1. Обновляем даты в подвале
    updateFooterDates();
    
    // 2. Запускаем анимацию секций
    animateSections();
    
    // 3. Инициализируем теги навыков
    initSkillTags();
    
    // 4. Инициализируем ссылку на GitHub
    initGitHubLink();
    
    // 5. Инициализируем аватарку
    initAvatar();
    
    // 6. Инициализируем элементы увлечений
    initHobbyItems();
    
    console.log('Страница полностью инициализирована!');
}

/**
 * ЗАПУСК КОДА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
 */
document.addEventListener('DOMContentLoaded', init);

// Экспорт функций для тестирования (если нужно)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateFooterDates,
        animateSections,
        initSkillTags,
        initGitHubLink,
        initAvatar,
        initHobbyItems,
        init
    };
}