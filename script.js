// 1. Scroll Effect: Scroll karne par header ka background change karna
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 2. Mobile Menu Toggle: Button click karne par menu dikhana
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const icon = menuBtn.querySelector("i");
const navlink = document.querySelectorAll(".nav-link");
menuBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  icon.classList.toggle("bi-list");
  icon.classList.toggle("bi-x");
});

// Mobile screen par page click se menu close
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 991) {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
      navbar.classList.remove("active");

      icon.classList.remove("bi-x");
      icon.classList.add("bi-list");
    }
  }
});

// Dark/Light Mode Toggle
// const darkToggle = document.getElementById('darkToggle');
// const body = document.body;

// darkToggle.addEventListener('click', () => {
//     body.classList.toggle('light-mode');

//     const icon = darkToggle.querySelector('i');
//     if(body.classList.contains('light-mode')) {
//         icon.classList.replace('bi-moon', 'bi-sun');
//     } else {
//         icon.classList.replace('bi-sun', 'bi-moon');
//     }
// });

// ============================================================
// 1. INITIALIZE AOS (Animate On Scroll)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: false,
    offset: 100,
  });
});

// ============================================================
// 2. MOUSE SPOTLIGHT GLOW EFFECT
// Har waqt mouse ki position track karke background gradient update karta hai.
// ============================================================
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// Glow effect ka div body mein add karna
const glowDiv = document.createElement("div");
glowDiv.classList.add("mouse-glow");
document.body.appendChild(glowDiv);

// ============================================================
// Page load hote hi purana rang wapas lana
// ============================================================
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    currentColor = parseInt(savedTheme);
    body.classList.add(`theme-${currentColor}`);
  } else {
    body.classList.add("theme-1"); // Default White
  }
});

// ============================================================
// 5. SMOOTH SCROLL SPY - Highlight Active Section
// ============================================================
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
}

updateActiveNav();

// ============================================================
// 6. BACK TO TOP BUTTON
// ============================================================
const backToTopBtn = document.querySelector(".back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================================
// 7. FORM VALIDATION & SUBMISSION
// Modern form handling with validation
// ============================================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Get form inputs
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("tex");
    const message = document.querySelector('textarea[name="message"]');

    let isValid = true;

    // Validate name
    if (!name.value.trim()) {
      showError(name, "Name is required");
      isValid = false;
    } else {
      clearError(name);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, "Please enter a valid email");
      isValid = false;
    } else {
      clearError(email);
    }

    // Validate subject
    if (!subject.value.trim()) {
      showError(subject, "Subject is required");
      isValid = false;
    } else {
      clearError(subject);
    }

    // Validate message
    if (!message.value.trim()) {
      showError(message, "Message is required");
      isValid = false;
    } else {
      clearError(message);
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
}

function showError(input, message) {
  const formGroup = input.parentElement;
  input.classList.add("is-invalid");

  let errorMsg = formGroup.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("small");
    errorMsg.classList.add("error-message", "d-block", "mt-2", "text-danger");
    formGroup.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  input.classList.remove("is-invalid");

  const errorMsg = formGroup.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

// ============================================================
// 9. TYPED.JS ANIMATION
// ============================================================
if (document.getElementById("typed")) {
  new Typed("#typed", {
    strings: [
      "Frontend Developer",
      "Web Designer",
      "Tech Enthusiast",
      "Creative Developer",
    ],
    typedSpeed: 30,
    backSpeed: 25,
    backDelay: 1500,
    loop: true,
  });
}

// ============================================================
// 10. RESPONSIVE HEADER BEHAVIOR
// ============================================================
let lastScrollTop = 0;
const header = document.querySelector("#header");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  // You can add header hide/show on scroll here if needed
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================================
// 11. LOADING ANIMATION & PAGE TRANSITION
// صفحہ لوڈ ہوتے وقت خوبصورت animation
// ============================================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  if (window.AOS) {
    AOS.refresh();
  }
});

// Page fade in effect
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease-in";
setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);

// ============================================================
// 12. SKILL PROGRESS BARS (ANIMATED)
// جب scroll ہو تو numbers animate ہوں
// ============================================================
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-card");

  skillBars.forEach((bar) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bar.style.animation = "slideInUp 0.5s ease-out";
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(bar);
  });
}

animateSkillBars();

// ============================================================
// 13. PARALLAX SCROLL EFFECT
// Mouse movement par images move ہوں
// ============================================================
function initParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  parallaxElements.forEach((el) => {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const elementOffset = el.offsetTop;
      const distance = scrollPosition - elementOffset;

      // Only apply parallax if element is in viewport
      if (Math.abs(distance) < window.innerHeight) {
        el.style.transform = `translateY(${distance * 0.5}px)`;
      }
    });
  });
}

initParallax();

// ============================================================
// 14. SMOOTH SCROLL WITH OFFSET
// Navigation links smooth scroll with header offset
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const headerHeight = 120;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

// ============================================================
// 15. REAL-TIME CLOCK / LOCATION DISPLAY
// صفحہ میں timestamp اور location دکھائیں
// ============================================================
function updateTimeLocation() {
  // Show location if available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("User location available");
      // You can use position.coords.latitude/longitude
    });
  }

  // Update time dynamically
  const updateTime = () => {
    const now = new Date();
    const timeElements = document.querySelectorAll("[data-time]");

    timeElements.forEach((el) => {
      el.textContent = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    });
  };

  updateTime();
  setInterval(updateTime, 1000);
}

// Call if needed
// updateTimeLocation();

// ============================================================
// 16. INTERSECTION OBSERVER FOR COUNTERS
// Stats animation جب scroll ہو
// ============================================================
function createCounterAnimation() {
  const counters = document.querySelectorAll("[data-counter]");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.counter);
    let current = 0;
    const increment = target / 100; // تقریبی رفتار

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && current === 0) {
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, 30);

            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
}

createCounterAnimation();

// ============================================================
// 18. LAZY LOADING IMAGES
// Performance optimization
// ============================================================
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// ============================================================
// 19. HAMBURGER MENU ANIMATION
// Mobile menu icon animation
// ============================================================
function enhanceMenuAnimation() {
  const menuToggle = document.querySelector(".menu-toggle");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
}

enhanceMenuAnimation();

// ============================================================
// 20. SOCIAL LINKS ANIMATION
// Social icons hover effect
// ============================================================
function initSocialLinks() {
  const socialLinks = document.querySelectorAll(
    'a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="facebook"]',
  );

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "scale(1.2) rotate(15deg)";
      link.style.transition = "all 0.3s ease";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

initSocialLinks();

// ============================================================
// 21. DARK MODE / LIGHT MODE TOGGLE
// Dark/Light theme functionality with localStorage
// ============================================================
function initDarkModeToggle() {
  const darkModeBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  if (darkModeBtn) {
    // Check saved preference or system preference
    const savedMode = localStorage.getItem("themeMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // Set initial theme
    if (savedMode === "light") {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      darkModeBtn.innerHTML = '<i class="bi bi-sun"></i>';
    } else if (savedMode === "dark" || (!savedMode && prefersDark)) {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
    } else {
      body.classList.add("dark-mode");
      darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
    }

    // Toggle theme on button click
    darkModeBtn.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        // Switch to light mode
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        darkModeBtn.innerHTML = '<i class="bi bi-sun"></i>';
        localStorage.setItem("themeMode", "light");
      } else {
        // Switch to dark mode
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        darkModeBtn.innerHTML = '<i class="bi bi-moon"></i>';
        localStorage.setItem("themeMode", "dark");
      }
    });
  }
}

// Initialize dark mode on page load
window.addEventListener("load", initDarkModeToggle);

// ============================================================
// 23. ENHANCED FORM SUCCESS MESSAGE
// Form submission success notification
// ============================================================
const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", function (e) {
    const submitBtn = this.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Add success state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sending...';

    // Reset after 3 seconds (adjust based on your backend)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      // Optional: Clear form
      // contactFormElement.reset();
    }, 3000);
  });
}

// ============================================================
// 24. CONSOLE MESSAGE (EASTER EGG)
// ============================================================
console.log(
  "%c🎉 Welcome to Mureed Sajjad Portfolio! 🎉",
  "font-size: 20px; color: #38bdf8; font-weight: bold;",
);
console.log(
  "%cLooking for talented developers? Get in touch!",
  "font-size: 14px; color: #e2e8f0;",
);

// ============================================================
// 25. RESPONSIVE NAVBAR WITH MOBILE MENU
// ============================================================
function initResponsiveNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navbar.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navbar.classList.remove("active");
    });
  });
}
