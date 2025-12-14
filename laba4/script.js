// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Если это прогресс-бар, запускаем анимацию
            if (entry.target.classList.contains('skill__level')) {
                animateSkillBar(entry.target);
            }
        }
    });
}, observerOptions);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Наблюдаем за секциями
    const sections = document.querySelectorAll('.section');
    const goalItems = document.querySelectorAll('.goal__item');
    const projectItems = document.querySelectorAll('.project__item');
    const skillBars = document.querySelectorAll('.skill__level');
    
    sections.forEach(section => observer.observe(section));
    goalItems.forEach(item => observer.observe(item));
    projectItems.forEach(item => observer.observe(item));
    skillBars.forEach(bar => observer.observe(bar));
    
    // Инициализация плавной прокрутки
    initSmoothScroll();
    
    // Инициализация прогресс-баров (если они уже видны)
    animateVisibleSkillBars();
});

// Функция для анимации отдельного прогресс-бара
function animateSkillBar(bar) {
    // Получаем финальную ширину из атрибута data-width
    if (!bar.dataset.width) {
        // Сохраняем текущую ширину в data-атрибут
        const computedStyle = window.getComputedStyle(bar);
        bar.dataset.width = computedStyle.width;
    }
    
    // Сбрасываем ширину
    bar.style.width = '0';
    
    // Запускаем анимацию
    setTimeout(() => {
        bar.style.width = bar.dataset.width;
    }, 100);
}

// Функция для анимации видимых прогресс-баров
function animateVisibleSkillBars() {
    const skillBars = document.querySelectorAll('.skill__level');
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isVisible) {
            animateSkillBar(bar);
        }
    });
}

// Функция для инициализации плавной прокрутки
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем ссылки, которые не ведут на странице
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}