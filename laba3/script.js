// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Для целей добавляем задержку для последовательного появления
            if (entry.target.classList.contains('goal__item')) {
                const index = Array.from(document.querySelectorAll('.goal__item')).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Применяем анимацию к секциям и целям
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const goalItems = document.querySelectorAll('.goal__item');
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    goalItems.forEach(item => {
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

// Добавляем интерактивность для целей
document.addEventListener('DOMContentLoaded', () => {
    const goalItems = document.querySelectorAll('.goal__item');
    
    goalItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('goal__item--active');
        });
    });
});

// Плавная прокрутка для навигации (если добавим якорные ссылки)
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

// Обработка отправки формы (если добавим контактную форму)
function handleFormSubmit(event) {
    event.preventDefault();
    // Логика обработки формы
    console.log('Форма отправлена');
}

// Добавляем обработчик события для формы (если она будет добавлена)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}