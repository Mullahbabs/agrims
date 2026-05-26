// === Reusable Components ===

// Hero Carousel
class HeroCarousel {
  constructor(element) {
    this.element = element;
    this.slides = element.querySelectorAll(".hero-slide");
    this.indicators = element.querySelectorAll(".carousel-dot");
    this.currentIndex = 0;
    this.interval = null;
    this.duration = 6000;

    this.init();
  }

  init() {
    this.showSlide(0);
    this.startAutoPlay();
    this.bindEvents();
  }

  showSlide(index) {
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.indicators.forEach((dot) => dot.classList.remove("active"));

    this.slides[index].classList.add("active");
    this.indicators[index].classList.add("active");
    this.currentIndex = index;
  }

  nextSlide() {
    const next = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => this.nextSlide(), this.duration);
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  bindEvents() {
    this.indicators.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.showSlide(index);
        this.startAutoPlay();
      });
    });

    this.element.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.element.addEventListener("mouseleave", () => this.startAutoPlay());
  }
}

// Product Slider
class ProductSlider {
  constructor(element) {
    this.element = element;
    this.track = element.querySelector(".product-slider-track");
    this.slides = element.querySelectorAll(".product-slide");
    this.prevBtn = element.querySelector(".slider-prev");
    this.nextBtn = element.querySelector(".slider-next");
    this.currentPosition = 0;
    this.slidesPerView = 3;
    this.gap = 24;

    this.init();
  }

  init() {
    this.updateSlidesPerView();
    this.bindEvents();
    window.addEventListener("resize", () => this.updateSlidesPerView());
  }

  updateSlidesPerView() {
    if (window.innerWidth < 768) {
      this.slidesPerView = 1;
    } else if (window.innerWidth < 1024) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
    this.maxPosition = Math.max(0, this.slides.length - this.slidesPerView);
    this.goToSlide(0);
  }

  getSlideWidth() {
    const trackWidth = this.track.parentElement.clientWidth;
    return (
      (trackWidth - this.gap * (this.slidesPerView - 1)) / this.slidesPerView
    );
  }

  goToSlide(index) {
    this.currentPosition = Math.max(0, Math.min(index, this.maxPosition));
    const offset = this.currentPosition * (this.getSlideWidth() + this.gap);
    this.track.style.transform = `translateX(-${offset}px)`;
  }

  bindEvents() {
    this.prevBtn?.addEventListener("click", () => {
      this.goToSlide(this.currentPosition - 1);
    });

    this.nextBtn?.addEventListener("click", () => {
      this.goToSlide(this.currentPosition + 1);
    });

    // Touch events for mobile swipe
    let startX = 0;
    let isDragging = false;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.goToSlide(this.currentPosition + 1);
        } else {
          this.goToSlide(this.currentPosition - 1);
        }
      }
      isDragging = false;
    });
  }
}

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  // Hero Carousels
  document.querySelectorAll(".hero-carousel").forEach((carousel) => {
    new HeroCarousel(carousel);
  });

  // Product Sliders
  document.querySelectorAll(".product-slider").forEach((slider) => {
    new ProductSlider(slider);
  });

  // Image Galleries
  document.querySelectorAll(".gallery-main").forEach((gallery) => {
    const mainImg = gallery.querySelector(".gallery-main-image");
    const thumbs = gallery.querySelectorAll(".gallery-thumb");

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const newSrc = thumb.getAttribute("data-full");
        mainImg.src = newSrc;
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  });

  // Tab Systems
  document.querySelectorAll(".tab-nav").forEach((tabNav) => {
    const tabs = tabNav.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(
      tabNav.getAttribute("data-target") + " .tab-panel",
    );

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        panels[index].classList.add("active");
      });
    });
  });

  // Accordion / FAQ
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");

    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all others
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
      });

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });

  // Newsletter form
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      // Simulate submission
      form.querySelector("button").textContent = "Subscribed ✓";
      setTimeout(() => {
        form.querySelector("button").textContent = "Subscribe";
        form.querySelector('input[type="email"]').value = "";
      }, 2000);
    });
  });

  // Contact form handling
  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";

      setTimeout(() => {
        submitBtn.textContent = "Message Sent ✓";
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = originalText;
        }, 2000);
      }, 1500);
    });
  });
});
