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
    currentColor = currentColor >= 3 ? 1 : currentColor + 1;

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
    body.classList.add('theme-1'); // Default White
  }
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

new Typed("#typed", {
  strings: ["Developer", "Web Designer", "Student", "Freelancer"],
  typedSpeed: 20,
  backSpeed: 10,
  backDelay: 1500,
  loop: true
});



const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links-row");

toggle.addEventListener("click", () => {
  nav.classList.toggle("show-menu");
});
