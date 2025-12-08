// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Применяем анимацию к секциям
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const goalItems = document.querySelectorAll('.goal__item');
    const projectItems = document.querySelectorAll('.project__item');

    sections.forEach(section => {
        observer.observe(section);
    });

    goalItems.forEach(item => {
        observer.observe(item);
    });

    projectItems.forEach(item => {
        observer.observe(item);
    });

    // Анимация для прогресс-баров
    animateSkillBars();
});

// Функция для анимации прогресс-баров
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__level');

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});