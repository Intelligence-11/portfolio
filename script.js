// Меню для мобильных устройств
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение стиля навигации при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 15, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== ВИДЕО ГАЛЕРЕЯ =====
document.addEventListener('DOMContentLoaded', function() {
    const videoSlides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const totalSlides = videoSlides.length;

    // Функция показа слайда
    function showSlide(index) {
        // Скрыть все слайды
        videoSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убрать активный класс у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показать текущий слайд
        videoSlides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentIndex = index;
        
        // Остановить все видео
        document.querySelectorAll('video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    // Следующий слайд
    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    // Предыдущий слайд
    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    }

    // Клик по кнопке "Вперед"
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Клик по кнопке "Назад"
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Клик по точкам
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Автопрокрутка (по желанию)
    // setInterval(nextSlide, 5000);

    // Показать первый слайд
    showSlide(0);
});

// Параллакс эффект для героя
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particles = document.querySelectorAll('.particle');
    const shapes = document.querySelectorAll('.shape');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        particles.forEach((particle, index) => {
            const speed = 0.1 * (index + 1);
            const yPos = -(scrolled * speed * 0.1);
            particle.style.transform = `translateY(${yPos}px)`;
        });
        
        shapes.forEach((shape, index) => {
            const speed = 0.05 * (index + 1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Анимация плавающих элементов
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Анимация при скролле для всего сайта
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0s';
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseFloat(delay) * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Анимация для всех секций
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        if (section.id !== 'home') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        }
    });
}

// Проверка загрузки изображений
function checkImageLoad() {
    // Проверка загрузки изображения баннера
    const bannerImg = document.querySelector('.banner-main-img');
    if (bannerImg) {
        bannerImg.addEventListener('error', () => {
            bannerImg.style.display = 'none';
            const bannerImageDiv = document.querySelector('.banner-image');
            bannerImageDiv.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg, var(--primary-color), var(--secondary-color));"><i class="fas fa-music" style="font-size: 3rem; color: white;"></i></div>';
        });
    }
    
    // Проверка загрузки видео
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', () => {
            const videoPlayer = video.parentElement;
            video.style.display = 'none';
            const fallback = videoPlayer.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.zIndex = '2';
                fallback.style.background = 'linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(30, 144, 255, 0.2))';
            }
        });
        
        video.addEventListener('loadeddata', () => {
            const fallback = video.parentElement.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initScrollAnimations();
    initSectionAnimations();
    checkImageLoad();
});

// Функция для анимации элементов с задержкой
function animateFadeInUp() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => {
        const delay = el.getAttribute('data-delay') || '0s';
        el.style.animationDelay = delay;
    });
}

// Запускаем при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    animateFadeInUp();
});