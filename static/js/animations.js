/*
* Скрипты анимаций для сайта эскорт-услуг
* Автор: Твоя Крошка
* Версия: 1.0.0
*/

// Дождаться загрузки DOM
document.addEventListener("DOMContentLoaded", function() {
    // Инициализация всех анимаций
    initScrollAnimations();
    initHoverAnimations();
    initTypingEffect();
    initParallaxEffect();
    initGlowEffect();
});

// Функция для анимаций при прокрутке страницы
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated');
    
    // Проверка, находится ли элемент в зоне видимости
    function isElementInViewport(el, offset = 150) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
            rect.bottom >= 0 &&
            rect.left >= 0 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Функция для запуска анимации
    function playAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animation-played')) {
                const animationName = element.classList.contains('fadeInLeft') ? 'fadeInLeft' :
                                    element.classList.contains('fadeInRight') ? 'fadeInRight' :
                                    element.classList.contains('fadeInUp') ? 'fadeInUp' :
                                    element.classList.contains('fadeInDown') ? 'fadeInDown' :
                                    element.classList.contains('pulse') ? 'pulse' : 'fadeIn';
                
                // Добавление класса для запуска анимации
                element.style.animationName = animationName;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animation-played');
            }
        });
    }
    
    // Запуск анимаций при прокрутке
    window.addEventListener('scroll', playAnimations);
    // Запуск один раз при загрузке страницы
    playAnimations();
}

// Функция для анимаций при наведении
function initHoverAnimations() {
    // Анимация кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.3s ease-in-out';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transition = 'all 0.3s ease-in-out';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Анимация карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.5s ease-in-out';
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Анимация иконки внутри карточки
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transition = 'all 0.5s ease-in-out';
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        card.addEventListener('mouseout', function() {
            this.style.transition = 'all 0.5s ease-in-out';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            
            // Возврат иконки к исходному размеру
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.transition = 'all 0.5s ease-in-out';
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Анимация галереи
    const galleryItems = document.querySelectorAll('.gallery-item-inner');
    galleryItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.5s ease-in-out';
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.transition = 'all 0.5s ease-in-out';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
}

// Функция для эффекта печатающегося текста
function initTypingEffect() {
    const elements = document.querySelectorAll('.hero-text h1, .hero-text p');
    
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        // Задержка между элементами
        setTimeout(() => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50); // скорость печатания
        }, index * 1000); // задержка между элементами
    });
}

// Функция для эффекта параллакса
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroImg = document.querySelector('.hero-img');
    
    if (hero && heroText && heroImg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            // Паралакс для фона
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            
            // Паралакс для текста и изображения
            heroText.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            heroImg.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        });
    }
}

// Функция для эффекта свечения
function initGlowEffect() {
    const glowElements = document.querySelectorAll('.btn-primary, .service-icon i, .counter-item, .cta-inner');
    
    glowElements.forEach(element => {
        // Создание эффекта свечения с интервалом
        setInterval(() => {
            element.style.transition = 'all 1.5s ease-in-out';
            element.style.boxShadow = '0 0 20px rgba(255, 102, 163, 0.7)';
            
            setTimeout(() => {
                element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }, 1000);
        }, 3000);
    });
}

// Дополнительные функции анимации для специальных элементов
document.addEventListener("DOMContentLoaded", function() {
    // Анимация для списка услуг
    animateServiceCardSequence();
    
    // Анимация для счетчиков
    animateCountersOnView();
    
    // Анимация для кнопки CTA
    animateCTAButton();
});

// Функция для последовательной анимации карточек услуг
function animateServiceCardSequence() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index); // Задержка для каждой карточки
    });
}

// Функция для анимации счетчиков при попадании в область видимости
function animateCountersOnView() {
    const counters = document.querySelectorAll('.counter-item');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleAnimation() {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('animated-counter')) {
                counter.classList.add('animated-counter');
                
                // Применяем анимацию пульса
                counter.style.animation = 'pulse 1s ease forwards';
            }
        });
    }
    
    window.addEventListener('scroll', handleAnimation);
    handleAnimation(); // Запускаем проверку при загрузке
}

// Функция для анимации кнопки CTA
function animateCTAButton() {
    const ctaButton = document.querySelector('.cta .btn');
    
    if (ctaButton) {
        setInterval(() => {
            ctaButton.classList.add('heartbeat');
            
            setTimeout(() => {
                ctaButton.classList.remove('heartbeat');
            }, 1000);
        }, 3000);
    }
}

// Анимация для заголовков разделов
document.addEventListener("DOMContentLoaded", function() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    function animateSectionTitle() {
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (titlePosition < screenPosition) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
                
                // Анимация линии под заголовком
                const divider = title.parentElement.querySelector('.title-divider');
                if (divider) {
                    setTimeout(() => {
                        divider.style.width = '80px';
                        divider.style.opacity = '1';
                    }, 300);
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateSectionTitle);
    animateSectionTitle(); // Запускаем при загрузке
});