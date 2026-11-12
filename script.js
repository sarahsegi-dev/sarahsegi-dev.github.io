// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------
function initMobileMenu() {
  const button = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;

  button.addEventListener("click", () => menu.classList.toggle("is-open"));
}

// ---------------------------------------------------------------------------
// Accordion (one panel open at a time)
// ---------------------------------------------------------------------------
function toggleAccordion(contentId) {
  const content = document.getElementById(contentId);
  if (!content) return;

  const wasActive = content.classList.contains("active");

  // Reset all panels
  document.querySelectorAll(".accordion-content").forEach((panel) => {
    panel.classList.remove("active");
  });
  document.querySelectorAll(".accordion__chevron").forEach((chevron) => {
    chevron.classList.remove("is-rotated");
  });
  document.querySelectorAll("[data-accordion]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });

  // Open the clicked panel if it wasn't already open
  if (!wasActive) {
    content.classList.add("active");
    const button = document.querySelector(`[data-accordion="${contentId}"]`);
    button.setAttribute("aria-expanded", "true");
    button.querySelector(".accordion__chevron").classList.add("is-rotated");
  }
}

function initAccordion() {
  document.querySelectorAll("[data-accordion]").forEach((button) => {
    button.addEventListener("click", () =>
      toggleAccordion(button.dataset.accordion),
    );
  });

  // First accordion open by default
  toggleAccordion("acc1");
}

// ---------------------------------------------------------------------------
// Image fallback (replaces the inline onerror handler)
// ---------------------------------------------------------------------------
function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    // Already failed before this script ran
    if (img.complete && img.naturalWidth === 0) {
      img.src = img.dataset.fallback;
      return;
    }
    img.addEventListener(
      "error",
      () => {
        img.src = img.dataset.fallback;
      },
      { once: true }, // avoids an endless loop if the fallback also fails
    );
  });
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initAccordion();
  initImageFallbacks();
});