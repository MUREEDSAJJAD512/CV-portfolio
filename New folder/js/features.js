/* ==========================================================
   ADVANCED FEATURES
   ========================================================== */

/**
 * PROJECT FILTER SYSTEM
 */
class ProjectFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.portfolioItems = document.querySelectorAll(".portfolio-item");
    this.init();
  }

  init() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleFilter(e));
    });
  }

  handleFilter(event) {
    const filter = event.target.getAttribute("data-filter");

    // Update active button
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    // Filter items with animation
    this.portfolioItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");

      if (filter === "all" || itemCategory === filter) {
        item.style.animation = "none";
        item.offsetHeight; // Trigger reflow
        item.style.animation = "fadeIn 0.5s ease-out";
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
}

/**
 * MODAL SYSTEM
 */
class Modal {
  constructor() {
    this.modals = document.querySelectorAll(".modal-overlay");
    this.closeButtons = document.querySelectorAll(".modal-close");
    this.init();
  }

  init() {
    // Close buttons
    this.closeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.closeModal(e));
    });

    // Click outside to close
    this.modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeModal(e);
        }
      });
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.modals.forEach((modal) => modal.classList.remove("active"));
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeModal(event) {
    event.preventDefault();
    const modal = event.target.closest(".modal-overlay");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
}

/**
 * SKILLS ANIMATION
 */
class SkillsAnimator {
  constructor() {
    this.skillBars = document.querySelectorAll(".skill-progress");
    this.animated = false;
    this.init();
  }

  init() {
    if (this.skillBars.length === 0) return;

    // Observe when skills section enters viewport
    window.addEventListener("scroll", () => {
      if (!this.animated && this.isInViewport()) {
        this.animateAll();
        this.animated = true;
      }
    });
  }

  isInViewport() {
    const firstBar = this.skillBars[0];
    if (!firstBar) return false;

    const rect = firstBar.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  animateAll() {
    this.skillBars.forEach((bar) => {
      const width = bar.parentElement.getAttribute("data-width") || "80";
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        bar.style.width = progress * width + "%";

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }
}

/**
 * COUNTER ANIMATION
 */
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll("[data-counter]");
    this.animated = false;
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    window.addEventListener("scroll", () => {
      if (!this.animated) {
        this.counters.forEach((counter) => {
          if (this.isInViewport(counter)) {
            this.animateCounter(counter);
            this.animated = true;
          }
        });
      }
    });
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute("data-counter"));
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      element.textContent = current + "+";

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

/**
 * PROJECT MODAL TRIGGER
 */
class ProjectModal {
  constructor() {
    this.portfolioItems = document.querySelectorAll(".portfolio-item");
    this.init();
  }

  init() {
    this.portfolioItems.forEach((item) => {
      const modalBtn = item.querySelector("[data-modal-trigger]");
      if (modalBtn) {
        modalBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const modalId = modalBtn.getAttribute("data-modal-trigger");
          const modal = new Modal();
          modal.openModal(modalId);
        });
      }
    });
  }
}

/**
 * EXPORT CLASSES
 */
export { ProjectFilter, Modal, SkillsAnimator, CounterAnimation, ProjectModal };
