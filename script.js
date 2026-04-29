// ============================================================
// 1. HEADER SECTION FUNCTIONS
// ============================================================

//===========================================
// 1.1 Scroll Effect: Scroll karne par header ka background change karna
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
// 1.2 Mobile Menu Toggle: Button click karne par menu dikhana
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
// 1.3 Mobile screen par page click se menu close
//===========================================
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 991) {
    if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
      navbar.classList.remove("active");

      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("bi-x");
        icon.classList.add("bi-list");
      }
    }
  }
});

// ============================================================
// 2. HERO SECTION FUNCTIONS
// ============================================================

//===========================================
// 2.1 Dark/Light Mode Toggle
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

//===========================================
// 2.2 DOWNLOAD RESUME FUNCTION
//===========================================
function downloadResume(event) {
  // Prevent default link behavior
  event.preventDefault();

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = "CV WEB.MS.pdf";
  link.download = "Mureed_Sajjad_CV.pdf";

  // Add to DOM and trigger download
  document.body.appendChild(link);
  link.click();

  // Remove from DOM
  document.body.removeChild(link);

  // Optional: Show success message
  showDownloadMessage();
}

// Download success message function
function showDownloadMessage() {
  // Create success message element
  const message = document.createElement("div");
  message.textContent = "✅ CV Downloaded Successfully!";
  message.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  document.body.appendChild(message);

  // Remove message after 3 seconds
  setTimeout(() => {
    message.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 300);
  }, 3000);
}

//===========================================
// 2.2 TYPED.JS ANIMATION
//===========================================
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
// 3. ABOUT SECTION FUNCTIONS
// ============================================================

// ============================================================
// 4. SERVICES SECTION FUNCTIONS
// ============================================================

// ============================================================
// 5. SKILLS SECTION FUNCTIONS
// ============================================================

//===========================================
// 5.1 SKILL PROGRESS BARS (ANIMATED)
//===========================================
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
// 6. CERTIFICATIONS SECTION FUNCTIONS
// ============================================================

// ============================================================
// 7. STATISTICS SECTION FUNCTIONS
// ============================================================

//===========================================
// 7.1 INTERSECTION OBSERVER FOR COUNTERS
//===========================================
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
// 8. PROJECTS SECTION FUNCTIONS
// ============================================================

//===========================================
// 8.1 PROJECT MODAL FUNCTIONS
//===========================================

// Project Modal ko open karne ka function
function openProjectModal(title, description, technologies, link, imageSrc) {
  // Modal elements ko select karna
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalProjectTitle");
  const modalDesc = document.getElementById("modalProjectDesc");
  const modalTech = document.getElementById("modalProjectTech");
  const modalLink = document.getElementById("modalProjectLink");
  const modalImage = document.getElementById("modalProjectImage");

  // Modal content ko update karna
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = description;
  if (modalTech) modalTech.textContent = technologies;
  if (modalLink) modalLink.href = link;
  if (modalImage) modalImage.src = imageSrc;

  // Modal ko show karna
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Background scroll disable
  }
}

// Project Modal ko close karne ka function
function closeProjectModal() {
  const modal = document.getElementById("projectModal");

  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto"; // Background scroll enable
  }
}

// Modal ke bahar click karne par close karna
document.addEventListener("click", function (e) {
  const modal = document.getElementById("projectModal");
  if (modal && e.target === modal) {
    closeProjectModal();
  }
});

// Escape key press par modal close karna
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
  }
});

//===========================================
// 9.1 ADVANCED FORM VALIDATION & SUBMISSION
//===========================================
const contactForm = document.querySelector(".contact-form");
const contactFormId = document.getElementById("contactForm");

if (contactForm) {
  // Real-time validation on input
  const inputs = contactForm.querySelectorAll(".form-control, textarea");
  
  inputs.forEach(input => {
    input.addEventListener("blur", function() {
      validateField(this);
    });

    input.addEventListener("input", function() {
      if (this.classList.contains("is-invalid")) {
        validateField(this);
      }
    });
  });

  // Character count for message
  const messageField = document.getElementById("message");
  if (messageField) {
    messageField.addEventListener("input", function() {
      const charCount = document.getElementById("charCount");
      const length = this.value.length;
      charCount.textContent = length;

      // Warn if approaching limit
      if (length > 400) {
        document.querySelector(".char-count").classList.add("warning");
      } else if (length > 500) {
        document.querySelector(".char-count").classList.add("limit");
        this.value = this.value.substring(0, 500);
        charCount.textContent = "500";
      } else {
        document.querySelector(".char-count").classList.remove("warning", "limit");
      }
    });
  }

  // Form submission
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
    } else if (name.value.trim().length < 2) {
      showError(name, "Name must be at least 2 characters");
      isValid = false;
    } else {
      clearError(name);
      markFieldValid(name);
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(email, "Please enter a valid email");
      isValid = false;
    } else {
      clearError(email);
      markFieldValid(email);
    }

    // Validate subject
    if (!subject.value.trim()) {
      showError(subject, "Subject is required");
      isValid = false;
    } else if (subject.value.trim().length < 3) {
      showError(subject, "Subject must be at least 3 characters");
      isValid = false;
    } else {
      clearError(subject);
      markFieldValid(subject);
    }

    // Validate message
    if (!message.value.trim()) {
      showError(message, "Message is required");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters");
      isValid = false;
    } else {
      clearError(message);
      markFieldValid(message);
    }

    if (!isValid) {
      e.preventDefault();
    } else {
      // Show loading state
      const submitBtn = contactForm.querySelector(".btn-submit");
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }
  });
}

//===========================================
// 9.2 Enhanced Field Validation Functions
//===========================================
function validateField(input) {
  const value = input.value.trim();
  const fieldName = input.name;

  let isValid = false;

  switch (fieldName) {
    case "name":
      isValid = value.length >= 2;
      if (!isValid) showError(input, "Name must be at least 2 characters");
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      if (!isValid) showError(input, "Please enter a valid email");
      break;
    case "subject":
      isValid = value.length >= 3;
      if (!isValid) showError(input, "Subject must be at least 3 characters");
      break;
    case "message":
      isValid = value.length >= 10;
      if (!isValid) showError(input, "Message must be at least 10 characters");
      break;
  }

  if (isValid) {
    clearError(input);
    markFieldValid(input);
  } else {
    input.classList.add("is-invalid");
  }

  return isValid;
}

function markFieldValid(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  const errorMsg = input.parentElement.querySelector(".error-message");
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showError(input, message) {
  const formGroup = input.parentElement;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  let errorMsg = formGroup.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("small");
    errorMsg.classList.add("error-message", "d-block", "mt-2");
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

//===========================================
// 9.3 ENHANCED FORM SUCCESS MESSAGE WITH ANIMATIONS
//===========================================
const contactFormElement = document.querySelector(".contact-form");

if (contactFormElement) {
  contactFormElement.addEventListener("submit", function (e) {
    const submitBtn = this.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Add success state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Sending...';
    submitBtn.classList.add("loading");

    // Listen for response (Web3Forms handles this)
    // Show success message after submission
    setTimeout(() => {
      // Reset after 3 seconds (adjust based on your backend)
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.classList.remove("loading");

      // Show success notification
      showSuccessNotification("Message sent successfully! I'll get back to you soon.");
    }, 3000);
  });

  // If the browser restores the page from cache after going back, clear the form fields
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      contactFormElement.reset();
      const charCount = document.getElementById("charCount");
      if (charCount) charCount.textContent = "0";
    }
  });
}

//===========================================
// 9.4 SUCCESS NOTIFICATION SYSTEM
//===========================================
function showSuccessNotification(message) {
  const notification = document.createElement("div");
  notification.className = "success-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi bi-check-circle-fill"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.4s ease-out;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
  `;

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }, 4000);
}

// Error notification function
function showErrorNotification(message) {
  const notification = document.createElement("div");
  notification.className = "error-notification";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi bi-exclamation-circle-fill"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.4s ease-out;
    box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
  `;

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.4s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }, 4000);
}

// ============================================================
// 10. FOOTER SECTION FUNCTIONS
// ============================================================


// Load saved theme and refresh animations on page load
window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    body.classList.add("light-mode");
  }

  // Refresh AOS animations
  if (window.AOS) {
    AOS.refresh();
  }

  document.body.style.opacity = "1";
});

//===========================================
// INITIALIZE AOS (Animate On Scroll)
//===========================================
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: false,
    offset: 100,
  });
});

//===========================================
// MOUSE SPOTLIGHT GLOW EFFECT
//===========================================
document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// Glow effect ka div body mein add karna
const glowDiv = document.createElement("div");
glowDiv.classList.add("mouse-glow");
document.body.appendChild(glowDiv);

//===========================================
// SMOOTH SCROLL SPY - Highlight Active Section
//===========================================
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

//===========================================
// BACK TO TOP BUTTON
//===========================================
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
//=========================================
// skill bar animation
//========================================= 

document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
});


window.addEventListener("scroll", () => {
  const section = document.querySelector("#skills");
  const position = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight) {
    document.querySelectorAll(".skill-bar").forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  }
});




//===========================================
// RESPONSIVE HEADER BEHAVIOR
//===========================================
let lastScrollTop = 0;
const header = document.querySelector("#header");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  // You can add header hide/show on scroll here if needed
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Page fade in effect (CSS handles most of this via fadeInPage animation)
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s ease-in";
setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);

//===========================================
// PARALLAX SCROLL EFFECT
//===========================================
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

//===========================================
// SMOOTH SCROLL WITH OFFSET
//===========================================
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


//===========================================
// LAZY LOADING IMAGES
//===========================================
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

//===========================================
// SOCIAL LINKS ANIMATION
//===========================================
function initSocialLinks() {
  const socialLinks = document.querySelectorAll(
    'a[href*="github"], a[href*="linkedin"], a[href*="twitter"], a[href*="facebook"]',
  );

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transform = "scale(1.2) rotate(10deg)";
      link.style.transition = "all 0.3s ease";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "scale(1) rotate(-10deg)";
    });
  });
}

initSocialLinks();
