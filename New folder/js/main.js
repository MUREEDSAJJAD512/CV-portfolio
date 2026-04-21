/* ==========================================================
   MAIN JAVASCRIPT - Initialize All Features
   ========================================================== */

// ============================================================
// 1. HEADER & SCROLL EFFECTS
// ============================================================
const headerEl = document.querySelector(".header");

if (headerEl) {
  const SCROLL_THRESHOLD = 50;
  let ticking = false;

  const handleScroll = () => {
    headerEl.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
  };

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

// ============================================================
// 2. MOBILE MENU TOGGLE
// ============================================================
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
let icon = null;

if (menuBtn && navbar) {
  icon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    const isActive = navbar.classList.toggle("active");
    if (icon) {
      icon.classList.toggle("bi-list", !isActive);
      icon.classList.toggle("bi-x", isActive);
    }
    menuBtn.setAttribute("aria-expanded", isActive);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 991) {
      if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove("active");
        if (icon) {
          icon.classList.remove("bi-x");
          icon.classList.add("bi-list");
        }
      }
    }
  });

  // Close menu when clicking nav link
  const navLinks = navbar.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      if (icon) {
        icon.classList.remove("bi-x");
        icon.classList.add("bi-list");
      }
    });
  });
}

// ============================================================
// 3. DARK/LIGHT MODE TOGGLE
// ============================================================
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const icon = darkToggle.querySelector("i");

    if (body.classList.contains("light-mode")) {
      icon?.classList.replace("bi-moon", "bi-sun");
      localStorage.setItem("theme", "light");
    } else {
      icon?.classList.replace("bi-sun", "bi-moon");
      localStorage.setItem("theme", "dark");
    }
  });

  // Load saved theme on page load
  window.addEventListener("load", () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      body.classList.add("light-mode");
      const icon = darkToggle.querySelector("i");
      if (icon) {
        icon.classList.replace("bi-moon", "bi-sun");
      }
    }
  });
}

// ============================================================
// 4. INITIALIZE AOS (Animate On Scroll)
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 100,
    });
  }
});

// ============================================================
// 5. MOUSE SPOTLIGHT GLOW EFFECT
// ============================================================
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

const glowDiv = document.createElement("div");
glowDiv.classList.add("mouse-glow");
document.body.appendChild(glowDiv);

// ============================================================
// 6. SMOOTH SCROLL SPY - Highlight Active Section
// ============================================================
function updateActiveNav() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
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
// 7. BACK TO TOP BUTTON
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
// 8. FORM VALIDATION & SUBMISSION
// ============================================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.querySelector('textarea[name="message"]');

    let isValid = true;

    // Validate name
    if (!name?.value.trim()) {
      showError(name, "Name is required");
      isValid = false;
    } else {
      clearError(name);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email?.value || "")) {
      showError(email, "Please enter a valid email");
      isValid = false;
    } else {
      clearError(email);
    }

    // Validate subject
    if (!subject?.value.trim()) {
      showError(subject, "Subject is required");
      isValid = false;
    } else {
      clearError(subject);
    }

    // Validate message
    if (!message?.value.trim()) {
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

// Helper functions for form validation
function showError(input, message) {
  if (!input) return;
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
  if (!input) return;
  const formGroup = input.parentElement;
  input.classList.remove("is-invalid");

  const errorMsg = formGroup.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

// ============================================================
// 9. TYPED.JS ANIMATION (if element exists)
// ============================================================
if (typeof Typed !== "undefined" && document.getElementById("typed")) {
  new Typed("#typed", {
    strings: [
      "Frontend Developer",
      "Web Designer",
      "JavaScript Specialist",
      "React Developer",
    ],
    typeSpeed: 30,
    backSpeed: 25,
    backDelay: 1500,
    loop: true,
  });
}

// ============================================================
// 10. PAGE LOAD ANIMATION
// ============================================================
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease-in";
setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);

// ============================================================
// 11. LAZY LOADING IMAGES
// ============================================================
if ("IntersectionObserver" in window) {
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

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

console.log("✅ All scripts loaded successfully!");
