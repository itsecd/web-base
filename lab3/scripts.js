function updateFooterDates() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const currentMonth = months[now.getMonth()];
        dateElement.textContent = `${currentMonth} ${currentYear}`;
    }
    
    console.log('Даты в подвале обновлены');
}

function animateSections() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('section_animated');
        }, 100 + index * 150);
    });
    
    console.log(`Анимировано ${sections.length} секций`);
}

function initSkillTags() {
    const skillTags = document.querySelectorAll('.skills__tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 6px 12px rgba(72, 6, 7, 0.2)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
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

function initGitHubLink() {
    const githubLink = document.querySelector('.link_github');
    
    if (githubLink) {
        githubLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        githubLink.addEventListener('mouseleave', function() {
            if (!this.classList.contains('clicked')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        githubLink.addEventListener('click', function() {
            this.classList.add('clicked');
            this.style.transform = 'translateY(-1px) scale(0.98)';
            console.log('Переход на GitHub профиль');
        });
    }
}

function initAvatar() {
    const avatarImage = document.querySelector('.header__avatar-image');
    
    if (avatarImage) {
        avatarImage.addEventListener('click', function() {
            this.style.transform = 'scale(0.95) rotate(5deg)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 200);
            
            console.log('Аватарка кликнута!');
        });
        
        avatarImage.addEventListener('load', function() {
            console.log('Изображение аватарки загружено');
        });
        
        avatarImage.addEventListener('error', function() {
            console.error('Ошибка загрузки изображения аватарки');
            this.alt = 'Изображение не загружено';
            this.style.border = '2px dashed #a82c2e';
        });
    }
}

function initHobbyItems() {
    const hobbyItems = document.querySelectorAll('.list__item');
    
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

function init() {
    console.log('Инициализация страницы резюме...');
    
    updateFooterDates();
    animateSections();
    initSkillTags();
    initGitHubLink();
    initAvatar();
    initHobbyItems();
    
    console.log('Страница полностью инициализирована!');
}

document.addEventListener('DOMContentLoaded', init);

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