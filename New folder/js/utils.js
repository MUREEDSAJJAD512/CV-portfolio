/* ==========================================================
   UTILITY FUNCTIONS & HELPERS
   ========================================================== */

/**
 * Debounce function to prevent excessive function calls
 */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle function to limit repeated calls
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Get all elements with a selector
 */
function getElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Get single element
 */
function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * Add class to element
 */
function addClass(el, className) {
  el?.classList.add(className);
}

/**
 * Remove class from element
 */
function removeClass(el, className) {
  el?.classList.remove(className);
}

/**
 * Toggle class on element
 */
function toggleClass(el, className) {
  el?.classList.toggle(className);
}

/**
 * Check if element has class
 */
function hasClass(el, className) {
  return el?.classList.contains(className);
}

/**
 * Show error message
 */
function showError(input, message) {
  const formGroup = input.parentElement;
  addClass(input, "is-invalid");

  let errorMsg = formGroup.querySelector(".error-message");
  if (!errorMsg) {
    errorMsg = document.createElement("small");
    addClass(errorMsg, "error-message");
    formGroup.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

/**
 * Clear error message
 */
function clearError(input) {
  const formGroup = input.parentElement;
  removeClass(input, "is-invalid");

  const errorMsg = formGroup.querySelector(".error-message");
  if (errorMsg) errorMsg.remove();
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Smooth scroll to element
 */
function smoothScroll(target, offset = 100, duration = 1000) {
  const element = typeof target === "string" ? getElement(target) : target;
  if (!element) return;

  const start = window.pageYOffset;
  const end = element.offsetTop - offset;
  const distance = end - start;
  const startTime = performance.now();

  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const run = easeInOutQuad(elapsed / duration);
    window.scrollTo(0, start + distance * run);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Animate skill bar progress
 */
function animateSkillBar(element, targetWidth) {
  const duration = 1500;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.style.width = progress * targetWidth + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Format date to readable string
 */
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

/**
 * Detect if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

/**
 * Create element with attributes
 */
function createElement(tag, classes = "", attributes = {}) {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
}

/**
 * Log with timestamp
 */
function log(message, type = "info") {
  const timestamp = new Date().toLocaleTimeString();
  const style = type === "error" ? "color: red" : "color: blue";
  console.log(`%c[${timestamp}] ${message}`, style);
}

export {
  debounce,
  throttle,
  getElements,
  getElement,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  showError,
  clearError,
  isValidEmail,
  smoothScroll,
  animateSkillBar,
  formatDate,
  isInViewport,
  createElement,
  log,
};
