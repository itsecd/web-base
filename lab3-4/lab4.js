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
            // Если это текущая страница - не делаем ничего
            if (this.classList.contains('project-card__link--current')) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const href = this.getAttribute('href');
            
            // Если ссылка ведет на GitHub (внешний сайт)
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                e.preventDefault();
                window.open(href, '_blank');
            }
            // Для локальных файлов (.html) - позволим браузеру обработать нормально
            // Браузер сам перейдет по ссылке, так как она относительная и правильная
        });
    });
});