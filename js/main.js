// Hero Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".carousel-dot");

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

function goToSlide(index) {
  showSlide(index);
  resetCarouselTimer();
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

let carouselTimer;
if (slides.length) {
  carouselTimer = setInterval(nextSlide, 6000);
}

function resetCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(nextSlide, 6000);
}

// Product Carousel
let productPosition = 0;
const productTrack = document.getElementById("productTrack");
const productCards = document.querySelectorAll(".product-card");
const cardWidth = 310;

function moveProducts(direction) {
  if (!productTrack || !productCards.length) return;
  const maxScroll = (productCards.length - 3) * cardWidth;
  productPosition += direction * cardWidth;
  if (productPosition < 0) productPosition = 0;
  if (productPosition > maxScroll) productPosition = maxScroll;
  productTrack.style.transform = `translateX(-${productPosition}px)`;
}

// Mobile Menu
function toggleMenu() {
  const nav = document.getElementById("mainNav");
  if (nav) nav.classList.toggle("active");
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      const nav = document.getElementById("mainNav");
      if (nav) nav.classList.remove("active");
    }
  });
});

// Counter Animation
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target.toLocaleString() + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Intersection Observer for counters
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter) => animateCounter(counter));
      observer.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector(".stats-grid");
if (statsSection) observer.observe(statsSection);

// Form Handlers
function handleContactSubmit(event) {
  event.preventDefault();
  alert("Thank you for your message! Our team will respond within 24 hours.");
  event.target.reset();
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  alert("Thank you for subscribing to the Agrim International newsletter!");
  event.target.reset();
}

// Scroll-based navigation highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("href") === `#${current}` ||
      (current === "" && link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});

// Initialize carousel
if (slides.length) showSlide(0);
