/* ===== Mobile menu toggle ===== */
function myMenuFunction() {
  const menu = document.getElementById("myNavMenu");
  if (!menu) return;

  const isOpen = menu.classList.toggle("responsive");
  document.body.classList.toggle("nav-open", isOpen);
}

/* Close mobile menu when clicking a nav link */
document.querySelectorAll('#myNavMenu a.nav-link').forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("myNavMenu");
    if (!menu) return;

    if (menu.classList.contains("responsive")) {
      menu.classList.remove("responsive");
      document.body.classList.remove("nav-open");
    }
  });
});

/* Close mobile menu with Escape */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const menu = document.getElementById("myNavMenu");
  if (!menu) return;

  if (menu.classList.contains("responsive")) {
    menu.classList.remove("responsive");
    document.body.classList.remove("nav-open");
  }
});

/* ===== Header shadow + shrink (class-based, no inline styles) ===== */
function headerShadow() {
  const navHeader = document.getElementById("header");
  if (!navHeader) return;

  const scrolled = window.scrollY > 50;

  navHeader.classList.toggle("nav--scrolled", scrolled);
  document.body.classList.toggle("scrolled", scrolled);
}

window.addEventListener("scroll", headerShadow, { passive: true });
headerShadow(); // init

/* ===== Reduce motion preference ===== */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Typing effect ===== */
if (!prefersReducedMotion && window.Typed) {
  new Typed(".typedText", {
    strings: ["a Fullstack Software Engineer", "a Fullstack Software Engineer", "a Fullstack Software Engineer"],
    loop: true,
    typeSpeed: 90,
    backSpeed: 60,
    backDelay: 1600
  });
} else {
  const el = document.querySelector(".typedText");
  if (el) el.textContent = "a Fullstack Software Engineer";
}

/* ===== ScrollReveal (less flicker: reset false) ===== */
if (!prefersReducedMotion && window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 1200,
    reset: false
  });

  sr.reveal(".featured-text-card", {});
  sr.reveal(".featured-name", { delay: 100 });
  sr.reveal(".featured-text-info", { delay: 160 });
  sr.reveal(".featured-text-btn", { delay: 200 });
  sr.reveal(".social_icons", { delay: 240 });
  sr.reveal(".featured-image", { delay: 280 });
  sr.reveal('.timeline-item', { interval: 120 })
  sr.reveal(".project-box", { interval: 120 });
  sr.reveal(".top-header", {});

  const srLeft = ScrollReveal({
    origin: "left",
    distance: "60px",
    duration: 1200,
    reset: false
  });

  srLeft.reveal(".about-info", { delay: 100 });
  srLeft.reveal(".contact-info", { delay: 100 });

  const srRight = ScrollReveal({
    origin: "right",
    distance: "60px",
    duration: 1200,
    reset: false
  });

  srRight.reveal(".skills-box", { delay: 100 });
  srRight.reveal(".form-control", { delay: 100 });
}

/* ===== Active link highlight (safe + header aware) ===== */
const sections = document.querySelectorAll("section[id]");

function getHeaderOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
  const n = parseInt(raw.replace("px", ""), 10);
  return Number.isFinite(n) ? n : 90;
}

function scrollActive() {
  const scrollY = window.scrollY;
  const offset = getHeaderOffset() + 20;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - offset;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');
    if (!link) return;

    const isActive = scrollY >= sectionTop && scrollY < sectionTop + sectionHeight;
    link.classList.toggle("active-link", isActive);
  });
}

window.addEventListener("scroll", scrollActive, { passive: true });
scrollActive(); 

/* =========================
   EXPERIENCE MODAL LOGIC
   ========================= */

const expModal = document.getElementById("expModal");
const expModalTitle = document.getElementById("expModalTitle");
const expModalMeta = document.getElementById("expModalMeta");
const expModalBody = document.getElementById("expModalBody");

let lastFocusedElement = null;

function openExpModal(item) {
  if (!expModal || !expModalTitle || !expModalMeta || !expModalBody) return;

  lastFocusedElement = document.activeElement;

  const title = item.querySelector("h3")?.textContent?.trim() || "Experience";
  const date = item.querySelector("h4")?.textContent?.trim() || "";
  const company = item.querySelector("p")?.textContent?.trim() || "";

  const full = item.querySelector(".exp-full");
  const fallback = item.querySelector(".description")?.textContent || "";

  expModalTitle.textContent = title;
  expModalMeta.textContent = [company, date].filter(Boolean).join(" • ");

  expModalBody.innerHTML = full ? full.innerHTML : `<p>${fallback}</p>`;

  expModal.classList.add("is-open");
  expModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  // focus close button
  expModal.querySelector(".modal__close")?.focus();
}

function closeExpModal() {
  if (!expModal) return;

  expModal.classList.remove("is-open");
  expModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  // restore focus
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

/* Open on click */
document.querySelectorAll(".exp-item").forEach((item) => {
  item.addEventListener("click", () => openExpModal(item));

  // Open with keyboard (Enter/Space)
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openExpModal(item);
    }
  });
});

/* Close when clicking backdrop or close button */
document.addEventListener("click", (e) => {
  if (!expModal || !expModal.classList.contains("is-open")) return;

  const target = e.target;
  if (target && target.matches("[data-exp-close='true']")) {
    closeExpModal();
  }
});

/* Close with ESC */
document.addEventListener("keydown", (e) => {
  if (!expModal || !expModal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeExpModal();
});