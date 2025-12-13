// Функция для открытия внешних сайтов
function openExternalSite(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    }
}

// Обработчики для карточек проектов
document.addEventListener('DOMContentLoaded', function() {
    const projectLinks = document.querySelectorAll('.project-card__link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Проверяем, не является ли ссылка текущей страницей
            if (href.includes('q.html') || href.includes('#') || href === 'q.html') {
                // Для текущей страницы просто прокручиваем вверх
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Для внешних ссылок открываем в новой вкладке
                openExternalSite(href);
            }
        });
    });
});