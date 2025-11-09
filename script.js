// Переменные для управления сердечками
let heartsInterval;

// Анимация сердечек
function createHeart() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    // Случайная позиция
    const left = Math.random() * 100;
    const size = Math.random() * 20 + 10;
    
    heart.style.left = left + 'vw';
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    
    // Случайный цвет
    const colors = ['#ff6b6b', '#ff8e8e', '#ffafbd', '#ffc3a0', '#ffd8cb'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.background = color;
    
    container.appendChild(heart);
    
    // Анимация
    const animation = heart.animate([
        { 
            opacity: 0, 
            transform: 'rotate(45deg) translateY(100vh) scale(0)' 
        },
        { 
            opacity: 0.7, 
            transform: 'rotate(45deg) translateY(50vh) scale(1)' 
        },
        { 
            opacity: 0, 
            transform: 'rotate(45deg) translateY(-100vh) scale(0)' 
        }
    ], {
        duration: Math.random() * 4000 + 3000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    animation.onfinish = () => heart.remove();
}

// Запуск постоянных сердечек
function startHearts() {
    // Создаем несколько сердечек сразу
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, Math.random() * 1000);
    }
    
    // Запускаем интервал для постоянного создания сердечек
    heartsInterval = setInterval(createHeart, 500);
}

// Остановка сердечек
function stopHearts() {
    if (heartsInterval) {
        clearInterval(heartsInterval);
        heartsInterval = null;
    }
}

// Переключение страниц
function showPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    
    // Показываем нужную страницу
    const targetPage = document.getElementById(pageId);
    targetPage.classList.remove('hidden');
    setTimeout(() => targetPage.classList.add('active'), 50);
}

// Обратный отсчет
function startCountdown() {
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
    const letter = document.querySelector('.letter');
    
    // Сразу показываем письмо (без анимации открытия)
    letter.classList.add('open');
    
    // Запускаем таймер
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            openGallery();
        }
    }, 1000);
}

// Открытие галереи
function openGallery() {
    showPage('gallery-page');
    document.getElementById('hearts-container').classList.remove('hidden');
    startHearts(); // Запускаем постоянные сердечки
}

// Галерея фотографий
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Скрываем все слайды
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Показываем текущий слайд
    slides[index].classList.add('active');
    currentSlide = index;
    
    // Если это последний слайд, показываем страницу с пожеланиями
    if (currentSlide === totalSlides - 1) {
        setTimeout(showWishesPage, 3000);
    }
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Страница с пожеланиями
function showWishesPage() {
    stopHearts(); // Останавливаем обычные сердечки
    showPage('wishes-page');
    createFinalHearts(); // Запускаем финальные сердечки
}

function createFinalHearts() {
    const container = document.getElementById('wishes-page');
    const heartCount = 50;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            
            const left = Math.random() * 100;
            const size = Math.random() * 25 + 15;
            
            heart.style.left = left + 'vw';
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            heart.style.background = '#ff6b6b';
            
            container.appendChild(heart);
            
            const animation = heart.animate([
                { 
                    opacity: 0, 
                    transform: 'rotate(45deg) translateY(100vh) scale(0)' 
                },
                { 
                    opacity: 1, 
                    transform: 'rotate(45deg) translateY(30vh) scale(1)' 
                },
                { 
                    opacity: 0, 
                    transform: 'rotate(45deg) translateY(-100vh) scale(0)' 
                }
            ], {
                duration: Math.random() * 4000 + 3000,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => heart.remove();
        }, Math.random() * 2000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики кнопок галереи
    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);
    
    // Обработчик свайпов для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Свайп влево
            } else {
                prevSlide(); // Свайп вправо
            }
        }
    }
    
    // Запускаем обратный отсчет при загрузке страницы
    setTimeout(startCountdown, 1000);
});