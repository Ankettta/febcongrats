const filmClick = document.getElementById('film-click');
const filmHum = document.getElementById('film-hum');
const flashSound = document.getElementById('flash-sound');
const flashElement = document.querySelector('.flash-transition');

document.addEventListener('DOMContentLoaded', () => {
    filmHum.volume = 0.2;
    filmHum.play().catch(err => console.log('Автовоспроизведение звука заблокировано:', err));

    triggerFlash();

    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            triggerFlash();
            document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
        });
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            playFilmClick();
            triggerFlash();
        });
    });

    const creditsOriginal = document.querySelector('.credits-scroll');
    const creditsClone = document.querySelector('.credits-scroll.clone');
    creditsClone.innerHTML = creditsOriginal.innerHTML;
});

function playFilmClick() {
    filmClick.volume = 0.3;
    filmClick.currentTime = 0;
    filmClick.play().catch(err => console.log('Звук не воспроизведен:', err));
}

function triggerFlash() {
    flashElement.classList.add('flash-active');
    flashSound.volume = 0.4;
    flashSound.currentTime = 0;
    flashSound.play().catch(err => console.log('Звук вспышки не воспроизведен:', err));
    
    setTimeout(() => {
        flashElement.classList.remove('flash-active');
    }, 600);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            entry.target.classList.remove("hidden");
            
            if (entry.target.classList.contains('card')) {
                setTimeout(playFilmClick, 300);
            }
        } 
        else {
            entry.target.classList.remove("active");
            entry.target.classList.add("hidden");
        }
    });
}, {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
});

document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach(el => observer.observe(el));

setInterval(() => {
    if (Math.random() > 0.7) {
        triggerFlash();
    }
}, 15000);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    const grain = document.querySelector('.grain');
    grain.style.opacity = 0.25 + (scrollPosition / document.body.scrollHeight) * 0.1;
    
    if (Math.abs(lastScrollPosition - scrollPosition) > 50) {
        playFilmClick();
    }
    lastScrollPosition = scrollPosition;
});

let lastScrollPosition = 0;

setTimeout(() => {
    triggerFlash();
    document.querySelector('#final').scrollIntoView({ behavior: 'smooth' });
}, 120000);