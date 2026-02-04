/**
 * 1. MOUSE SPOTLIGHT GLOW EFFECT
 * Har waqt mouse ki position track karke background gradient update karta hai.
 */
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});

// Glow effect ka div body mein add karna
const glowDiv = document.createElement('div');
glowDiv.classList.add('mouse-glow');
document.body.appendChild(glowDiv);


/**
 * 2. 7-COLOR THEME SWITCHER (Cycling)
 * Button click karne par 1 se 7 tak colors change honge.
 */
let currentColor = 1;
const body = document.body;

// Button create karna ya purane slider ki jagah click event lagana
const themeBtn = document.getElementById('themSlider'); // html me is name wala button ki tarah treat kar sakte hain

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        // Purani class remove karna
        body.classList.remove(`theme-${currentColor}`);

        // Agla rang select karna
        currentColor = currentColor >= 7 ? 1 : currentColor + 1;

        // Nayi class add karna
        body.classList.add(`theme-${currentColor}`);

        // LocalStorage mein save karna taake refresh par rang na badle
        localStorage.setItem('selectedTheme', currentColor);
    });
}


// Page load hote hi purana rang wapas lana
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        currentColor = parseInt(savedTheme);
        body.classList.add(`theme-${currentColor}`);
    } else {
        body.classList.add('theme-1'); // Default Blue
    }
});




/**
 * 3. SCROLLSPY (Active Menu Highlight)
 * Scroll karte waqt batata hai ke aap kis section par hain.
 */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


/* 4. MOBILE MENU TOGGLE */

const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.getElementById('mobile-menu-wrapper');
const mainArea = document.getElementById('main');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function () {
        // menu ko toggle karna
        mainNav.classList.toggle('show-menu');

mainArea.classList.toggle('main-pushed');
        // icon change karna list sy X icon 
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');

    });
}

// menu ke link per click karty ni menu bund ho jaye 
const navLinksMobile = document.querySelectorAll('.nav-link');
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('show-menu');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
    });
});

/**
 * 5. VIEW CV FUNCTIONALITY
 */
const viewCvBtn = document.getElementById('viewCvBtn');
const cvContainer = document.getElementById('cvContainer');

if (viewCvBtn) {
    viewCvBtn.addEventListener('click', () => {
        if (cvContainer.style.display === "none") {
            cvContainer.style.display = "block";
            viewCvBtn.innerText = "Hide CV";
        } else {
            cvContainer.style.display = "none";
            viewCvBtn.innerText = "View CV";
        }
    });
}