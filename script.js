//===========================================
// 1. Scroll Effect: Scroll karne par header ka background change karna
//===========================================
const headerEl = document.querySelector(".header");

if (headerEl) {
  const SCROLL_THRESHOLD = 50;

  const handleScroll = () => {
    headerEl.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

//===========================================
// 2. Mobile Menu Toggle: Button click karne par menu dikhana
//===========================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
  const icon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    const isActive = navbar.classList.toggle("active");

    icon?.classList.toggle("bi-list", !isActive);
    icon?.classList.toggle("bi-x", isActive);

    // Accessibility
    menuBtn.setAttribute("aria-expanded", isActive);
  });
}

//===========================================
// 3. Mobile screen par page click se menu close
//===========================================
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 991) {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
      navbar.classList.remove("active");

      icon.classList.remove("bi-x");
      icon.classList.add("bi-list");
    }
  }
});

//===========================================
// 4. Dark/Light Mode Toggle
//===========================================
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

darkToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");

  const icon = darkToggle.querySelector("i");
  if (body.classList.contains("light-mode")) {
    icon.classList.replace("bi-moon", "bi-sun");
    localStorage.setItem("theme", "light");
  } else {
    icon.classList.replace("bi-sun", "bi-moon");
    localStorage.setItem("theme", "dark");
  }
});

// load saved theme on page load
window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    body.classList.add("light-mode");
  }
});

// ============================================================
// 5. INITIALIZE AOS (Animate On Scroll)
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
// 6. MOUSE SPOTLIGHT GLOW EFFECT
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
// 8. SMOOTH SCROLL SPY - Highlight Active Section
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
// 9. BACK TO TOP BUTTON
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
// 10. FORM VALIDATION & SUBMISSION
// Modern form handling with validation
// ============================================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Get form inputs
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
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

//=====================================================
// 11. Error messages show karne aur clear karne ke functions
//=====================================================
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
// 12. TYPED.JS ANIMATION
// ============================================================
if (document.getElementById("typed")) {
  new Typed("#typed", {
    strings: [
      "Frontend Developer",
      "Web Designer",
      "Tech Enthusiast",
      "Creative Developer",
    ],
    typespeed: 30,
    backSpeed: 25,
    backDelay: 1500,
    loop: true,
  });
}

// ============================================================
// 13. RESPONSIVE HEADER BEHAVIOR
// ============================================================
let lastScrollTop = 0;
const header = document.querySelector("#header");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  // You can add header hide/show on scroll here if needed
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================================
// 14. LOADING ANIMATION & PAGE TRANSITION
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
// 15. SKILL PROGRESS BARS (ANIMATED)
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
// 16. PARALLAX SCROLL EFFECT
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
// 17. SMOOTH SCROLL WITH OFFSET
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
// 18. REAL-TIME CLOCK / LOCATION DISPLAY
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
updateTimeLocation();

// ============================================================
// 19. INTERSECTION OBSERVER FOR COUNTERS
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
// 20. LAZY LOADING IMAGES
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

// enhanceMenuAnimation();

// ============================================================
// 21. SOCIAL LINKS ANIMATION
// Social icons hover effect
// ============================================================
// function initSocialLinks() {
//   const socialLinks = document.querySelectorAll(
//     'a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="facebook"]',
//   );

//   socialLinks.forEach((link) => {
//     link.addEventListener("mouseenter", () => {
//       link.style.transform = "scale(1.2) rotate(10deg)";
//       link.style.transition = "all 0.3s ease";
//     });

//     link.addEventListener("mouseleave", () => {
//       link.style.transform = "scale(1) rotate(-10deg)";
//     });
//   });
// }

initSocialLinks();

// ============================================================
// 22. ENHANCED FORM SUCCESS MESSAGE
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
      contactFormElement.reset();
    }, 3000);
  });
}

// ============================================================
// 23. CONSOLE MESSAGE (EASTER EGG)
// ============================================================
console.log(
  "%c🎉 Welcome to Mureed Sajjad Portfolio! 🎉",
  "font-size: 20px; color: #38bdf8; font-weight: bold;",
);
console.log(
  "%cLooking for talented developers? Get in touch!",
  "font-size: 14px; color: #e2e8f0;",
);
