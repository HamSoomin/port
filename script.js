const menuBtn = document.getElementById('menuBtn');
const menuNav = document.getElementById('menuNav');

menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    menuNav.classList.toggle('is-active');
});

const menuLinks = document.querySelectorAll('.menuNav a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuNav.classList.remove('is-active');
    });
});

document.addEventListener('click', (event) => {
    if (!menuNav.contains(event.target) && event.target !== menuBtn) {
        menuNav.classList.remove('is-active');
    }
});


const loadingScreen = document.getElementById('loadingScreen');
const loadingColor = document.getElementById('loadingColor');
const loadingPercent = document.getElementById('loadingPercent');
const hasLoaded = sessionStorage.getItem('hasLoaded');

if (hasLoaded) {
    loadingScreen.style.display = 'none';
    document.body.style.overflow = 'auto';
} else {

    let loadingCount = 0;
    const loadingTimer = setInterval(() => {
        loadingCount++;
        loadingPercent.textContent = loadingCount;
        loadingColor.style.transform =
            `scaleX(${loadingCount / 100})`;
        if (loadingCount >= 100) {
            clearInterval(loadingTimer);
            sessionStorage.setItem('hasLoaded', 'true');
            setTimeout(() => {
                loadingScreen.classList.add('is-finished');
                document.body.style.overflow = 'auto';
            }, 350);
        }
    }, 15);
}


let lastStarTime = 0;

document.addEventListener('mousemove', (event) => {
    const now = Date.now();
    if (now - lastStarTime < 35) return;
    lastStarTime = now;
    const star = document.createElement('span');
    star.classList.add('star');
    const starShapes = ['✦', '✧', '⋆', '★'];
    star.textContent =
        starShapes[Math.floor(Math.random() * starShapes.length)];
    star.style.left = event.clientX + 'px';
    star.style.top = event.clientY + 'px';
    const size = Math.random() * 12 + 5;
    star.style.fontSize = size + 'px';
    const moveX = (Math.random() - 0.5) * 90;
    const moveY = Math.random() * 80 + 25;
    const rotate = Math.random() * 180 - 90;
    star.style.setProperty('--moveX', moveX + 'px');
    star.style.setProperty('--moveY', moveY + 'px');
    star.style.setProperty('--rotate', rotate + 'deg');
    document.body.appendChild(star);
    setTimeout(() => {
        star.remove();
    }, 900);
});
