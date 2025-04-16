/*
* Основные скрипты для сайта эскорт-услуг
* Автор: Твоя Крошка
* Версия: 1.0.0
*/

// Дождаться загрузки DOM
document.addEventListener("DOMContentLoaded", function() {
    // Удаление прелоадера после загрузки страницы
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Инициализация всех компонентов
    initScrollToTop();
    initStickyHeader();
    initSmoothScroll();
    initCounters();
    initActiveNavLinks();
    initAccordion();
});

// Функция для работы кнопки "Наверх"
function initScrollToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // Показывать/скрывать кнопку в зависимости от прокрутки
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Обработчик события клика
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Плавная прокрутка наверх
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Функция для липкого заголовка
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

// Функция для плавной прокрутки к ссылкам
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Если это не пустая ссылка или якорь "#"
            if (href !== "#" && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // Вычисляем позицию элемента с учетом высоты заголовка
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;

                    // Прокручиваем к элементу
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем мобильное меню если оно открыто
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
}

// Функция для инициализации счетчиков
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Функция для проверки, виден ли элемент в области просмотра
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Функция для анимации счетчиков
    function animateCounter() {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const speed = 2000 / target; // Скорость анимации
                
                const updateCounter = () => {
                    if (count < target) {
                        count++;
                        counter.textContent = count;
                        setTimeout(updateCounter, speed);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }
    
    // Запускаем анимацию при прокрутке
    window.addEventListener('scroll', animateCounter);
    // И сразу проверяем, если элементы уже в области видимости
    animateCounter();
}

// Функция для активации ссылок меню при прокрутке
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function setActiveLink() {
        let scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
}

// Функция для инициализации аккордеона без jQuery
function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isCollapsed = this.classList.contains('collapsed');
            
            // Переключаем состояние кнопки
            if (isCollapsed) {
                this.classList.remove('collapsed');
                this.setAttribute('aria-expanded', 'true');
            } else {
                this.classList.add('collapsed');
                this.setAttribute('aria-expanded', 'false');
            }
            
            // Находим контент аккордеона
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            
            if (target) {
                if (isCollapsed) {
                    // Открываем панель
                    target.classList.add('show');
                    target.style.height = target.scrollHeight + 'px';
                } else {
                    // Закрываем панель
                    target.classList.remove('show');
                    target.style.height = '0';
                }
            }
        });
    });
}

// Обработка ошибок
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Ошибка JS:', message, 'Источник:', source, 'Строка:', lineno, 'Колонка:', colno, 'Объект ошибки:', error);
    return true;
};