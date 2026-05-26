/**
 * Agrim International - Core Application
 * Main application controller that initializes and coordinates all modules
 *
 * Dependencies:
 * - Navigation module (navigation.js)
 * - Animations module (animations.js)
 * - Components module (components.js)
 * - Lenis smooth scroll library
 * - Swiper.js library (optional)
 */

const App = {
  // Application configuration
  config: {
    name: "Agrim International",
    version: "2.0.0",
    debug: false,
    modules: {
      navigation: true,
      animations: true,
      components: true,
      lenis: true,
      swiper: true,
    },
    performance: {
      enableLazyLoading: true,
      enableImageOptimization: true,
      debounceDelay: 250,
      throttleDelay: 100,
    },
    transitions: {
      enabled: true,
      duration: 600,
    },
  },

  // Application state
  state: {
    isInitialized: false,
    isLoaded: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    currentPage: null,
    previousPage: null,
    scrollPosition: 0,
    modulesLoaded: {},
    errors: [],
  },

  /**
   * Initialize the entire application
   */
  async init() {
    try {
      this.log("🚀 Initializing Agrim International application...");

      // Set initial state
      this.detectDevice();
      this.state.currentPage = this.getCurrentPage();

      // Initialize core functionality
      this.initCoreFeatures();

      // Initialize modules in order
      await this.initModules();

      // Setup page transitions
      if (this.config.transitions.enabled) {
        this.initPageTransitions();
      }

      // Setup performance optimizations
      this.initPerformanceOptimizations();

      // Handle initial load
      this.handleInitialLoad();

      // Setup global event listeners
      this.bindGlobalEvents();

      // Mark as initialized
      this.state.isInitialized = true;
      this.log("✅ Application initialized successfully");

      // Dispatch ready event
      this.dispatchEvent("appReady", {
        timestamp: Date.now(),
        version: this.config.version,
        modules: this.state.modulesLoaded,
      });
    } catch (error) {
      this.handleError("Application initialization failed", error);
    }
  },

  /**
   * Detect device type
   */
  detectDevice() {
    const width = window.innerWidth;

    this.state.isMobile = width < 768;
    this.state.isTablet = width >= 768 && width < 1024;
    this.state.isDesktop = width >= 1024;

    document.documentElement.setAttribute(
      "data-device",
      this.state.isMobile
        ? "mobile"
        : this.state.isTablet
          ? "tablet"
          : "desktop",
    );

    this.log(
      `📱 Device detected: ${this.state.isMobile ? "Mobile" : this.state.isTablet ? "Tablet" : "Desktop"}`,
    );
  },

  /**
   * Initialize core features that don't depend on external modules
   */
  initCoreFeatures() {
    // Remove no-js class
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js-loaded");

    // Set CSS custom property for viewport height (fixes mobile Safari issues)
    this.setViewportHeight();

    // Add loaded class to body after a short delay
    setTimeout(() => {
      document.body.classList.add("app-loaded");
    }, 100);

    this.log("🔧 Core features initialized");
  },

  /**
   * Set viewport height CSS variable
   */
  setViewportHeight() {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", () => {
      requestAnimationFrame(setVH);
    });
  },

  /**
   * Initialize all modules in the correct order
   */
  async initModules() {
    const moduleLoadOrder = ["animations", "navigation", "components"];

    for (const moduleName of moduleLoadOrder) {
      if (!this.config.modules[moduleName]) {
        this.log(`⏭️ Skipping module: ${moduleName}`);
        continue;
      }

      try {
        await this.loadModule(moduleName);
        this.state.modulesLoaded[moduleName] = true;
        this.log(`✅ Module loaded: ${moduleName}`);
      } catch (error) {
        this.state.modulesLoaded[moduleName] = false;
        this.handleError(`Failed to load module: ${moduleName}`, error);
      }
    }

    // Initialize Lenis smooth scroll
    if (this.config.modules.lenis) {
      this.initLenisScroll();
    }

    // Initialize Swiper if available
    if (this.config.modules.swiper && typeof Swiper !== "undefined") {
      this.initSwiperInstances();
    }
  },

  /**
   * Load a specific module
   */
  async loadModule(moduleName) {
    return new Promise((resolve, reject) => {
      // Check if module is already available
      switch (moduleName) {
        case "animations":
          if (typeof Animations !== "undefined") {
            Animations.init();
            resolve();
          } else {
            // Module not loaded, but we can continue
            this.log("⚠️ Animations module not found, continuing without it");
            resolve();
          }
          break;

        case "navigation":
          if (typeof Navigation !== "undefined") {
            Navigation.init();
            resolve();
          } else {
            this.log("⚠️ Navigation module not found, continuing without it");
            resolve();
          }
          break;

        case "components":
          if (typeof Components !== "undefined") {
            Components.init();
            resolve();
          } else {
            // Try to initialize components directly
            this.initComponentsDirectly();
            resolve();
          }
          break;

        default:
          resolve();
      }
    });
  },

  /**
   * Initialize components directly if Components module isn't available
   */
  initComponentsDirectly() {
    this.log("🔧 Initializing components directly...");

    // Initialize hero carousels
    this.initHeroCarousels();

    // Initialize product sliders
    this.initProductSliders();

    // Initialize FAQ accordions
    this.initFAQAccordions();

    // Initialize forms
    this.initForms();

    // Initialize galleries
    this.initGalleries();

    // Initialize tabs
    this.initTabs();
  },

  /**
   * Initialize Lenis smooth scrolling
   */
  initLenisScroll() {
    if (typeof Lenis === "undefined") {
      this.log("⚠️ Lenis library not loaded");
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Animation frame loop
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Store lenis instance globally
      window.lenis = lenis;

      // Connect lenis with Navigation module scroll-to events
      document.addEventListener("agrim:scrollTo", (e) => {
        if (e.detail && e.detail.target) {
          lenis.scrollTo(e.detail.target, e.detail.options || {});
        }
      });

      // Sync scroll position
      lenis.on("scroll", ({ scroll }) => {
        this.state.scrollPosition = scroll;
      });

      this.log("✅ Lenis smooth scroll initialized");
    } catch (error) {
      this.handleError("Lenis initialization failed", error);
    }
  },

  /**
   * Initialize Swiper instances
   */
  initSwiperInstances() {
    if (typeof Swiper === "undefined") return;

    try {
      // Product gallery swipers
      document
        .querySelectorAll(".swiper-product-gallery")
        .forEach((element) => {
          new Swiper(element, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            pagination: {
              el: element.querySelector(".swiper-pagination"),
              clickable: true,
            },
            navigation: {
              nextEl: element.querySelector(".swiper-button-next"),
              prevEl: element.querySelector(".swiper-button-prev"),
            },
          });
        });

      // Testimonial swipers
      document.querySelectorAll(".swiper-testimonials").forEach((element) => {
        new Swiper(element, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 4000,
          },
          pagination: {
            el: element.querySelector(".swiper-pagination"),
            clickable: true,
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          },
        });
      });

      this.log("✅ Swiper instances initialized");
    } catch (error) {
      this.handleError("Swiper initialization failed", error);
    }
  },

  /**
   * Initialize hero carousels
   */
  initHeroCarousels() {
    document.querySelectorAll(".hero-carousel").forEach((carousel) => {
      const slides = carousel.querySelectorAll(".hero-slide");
      const indicators = carousel.querySelectorAll(".carousel-dot");
      let currentIndex = 0;
      let autoplayInterval;

      if (slides.length === 0) return;

      const showSlide = (index) => {
        slides.forEach((slide) => slide.classList.remove("active"));
        indicators.forEach((dot) => dot.classList.remove("active"));

        slides[index].classList.add("active");
        if (indicators[index]) {
          indicators[index].classList.add("active");
        }
        currentIndex = index;
      };

      const nextSlide = () => {
        const next = (currentIndex + 1) % slides.length;
        showSlide(next);
      };

      const startAutoplay = () => {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, 6000);
      };

      const stopAutoplay = () => {
        if (autoplayInterval) {
          clearInterval(autoplayInterval);
          autoplayInterval = null;
        }
      };

      // Bind indicator clicks
      indicators.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
          startAutoplay();
        });
      });

      // Pause on hover
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);

      // Show first slide and start
      showSlide(0);
      startAutoplay();
    });
  },

  /**
   * Initialize product sliders
   */
  initProductSliders() {
    document.querySelectorAll(".product-slider").forEach((slider) => {
      const track = slider.querySelector(".product-slider-track");
      const slides = slider.querySelectorAll(".product-slide");
      const prevBtn = slider.querySelector(".slider-prev");
      const nextBtn = slider.querySelector(".slider-next");

      if (!track || slides.length === 0) return;

      let currentPosition = 0;
      let slidesPerView = 3;
      const gap = 24;

      const updateSlidesPerView = () => {
        if (window.innerWidth < 768) {
          slidesPerView = 1;
        } else if (window.innerWidth < 1024) {
          slidesPerView = 2;
        } else {
          slidesPerView = 3;
        }
        return Math.max(0, slides.length - slidesPerView);
      };

      const getSlideWidth = () => {
        const trackWidth = track.parentElement.clientWidth;
        return (trackWidth - gap * (slidesPerView - 1)) / slidesPerView;
      };

      const goToSlide = (index) => {
        const maxPosition = updateSlidesPerView();
        currentPosition = Math.max(0, Math.min(index, maxPosition));
        const offset = currentPosition * (getSlideWidth() + gap);
        track.style.transform = `translateX(-${offset}px)`;
        track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      };

      // Button events
      prevBtn?.addEventListener("click", () => goToSlide(currentPosition - 1));
      nextBtn?.addEventListener("click", () => goToSlide(currentPosition + 1));

      // Touch/swipe support
      let startX = 0;
      let isDragging = false;
      let startPosition = 0;

      track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        startPosition = currentPosition;
        isDragging = true;
        track.style.transition = "none";
      });

      track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const diff = startX - e.touches[0].clientX;
        const slideWidth = getSlideWidth() + gap;
        const offset = startPosition * slideWidth + diff;
        track.style.transform = `translateX(-${offset}px)`;
      });

      track.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diff = startX - e.changedTouches[0].clientX;
        const threshold = getSlideWidth() / 3;

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            goToSlide(startPosition + 1);
          } else {
            goToSlide(startPosition - 1);
          }
        } else {
          goToSlide(startPosition);
        }
      });

      // Initialize position
      updateSlidesPerView();
      goToSlide(0);

      // Update on resize
      window.addEventListener("resize", () => {
        updateSlidesPerView();
        goToSlide(currentPosition);
      });
    });
  },

  /**
   * Initialize FAQ accordions
   */
  initFAQAccordions() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");

      question?.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all other items in the same group
        const group = item.closest(".faq-group") || item.parentElement;
        group.querySelectorAll(".faq-item.open").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("open");
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove("open");
        } else {
          item.classList.add("open");
        }
      });
    });
  },

  /**
   * Initialize forms
   */
  initForms() {
    // Contact forms
    document.querySelectorAll(".contact-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          submitBtn.textContent = "Message Sent ✓";
          form.reset();

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2500);

          this.dispatchEvent("formSubmitted", {
            formType: form.getAttribute("data-form-type") || "contact",
          });
        }, 1500);
      });
    });

    // Newsletter forms
    document.querySelectorAll(".newsletter-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!emailInput || !submitBtn) return;

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Subscribing...";
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = "Subscribed ✓";
          emailInput.value = "";

          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2500);

          this.dispatchEvent("newsletterSubscribed", {
            email: emailInput.value,
          });
        }, 1000);
      });
    });

    // Search form
    const searchInput = document.querySelector(".search-input");
    searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          this.log(`🔍 Search query: ${query}`);
          this.dispatchEvent("searchSubmitted", { query });

          // Close search overlay
          document.querySelector(".search-overlay")?.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  },

  /**
   * Initialize image galleries
   */
  initGalleries() {
    document.querySelectorAll(".gallery-main").forEach((gallery) => {
      const mainImage = gallery.querySelector(".gallery-main-image");
      const thumbnails = gallery.querySelectorAll(".gallery-thumb");

      thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
          const newSrc = thumb.getAttribute("data-full");
          if (newSrc && mainImage) {
            // Fade out, change source, fade in
            mainImage.style.opacity = "0";
            mainImage.style.transition = "opacity 0.3s ease";

            setTimeout(() => {
              mainImage.src = newSrc;
              mainImage.style.opacity = "1";
            }, 300);

            // Update active thumbnail
            thumbnails.forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
          }
        });
      });
    });
  },

  /**
   * Initialize tab systems
   */
  initTabs() {
    document.querySelectorAll(".tab-nav").forEach((tabNav) => {
      const tabs = tabNav.querySelectorAll(".tab-btn");
      const targetSelector = tabNav.getAttribute("data-target");
      if (!targetSelector) return;

      const tabContainer = document.querySelector(targetSelector);
      if (!tabContainer) return;

      const panels = tabContainer.querySelectorAll(".tab-panel");

      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          // Update active tab
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          // Show corresponding panel
          panels.forEach((p) => p.classList.remove("active"));
          if (panels[index]) {
            panels[index].classList.add("active");
          }

          this.dispatchEvent("tabChanged", {
            tabIndex: index,
            tabLabel: tab.textContent.trim(),
          });
        });
      });
    });
  },

  /**
   * Initialize page transitions
   */
  initPageTransitions() {
    const transition = document.querySelector(".page-transition");
    if (!transition) return;

    // Intercept navigation clicks
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");

      // Skip if it's not an internal page link
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("javascript") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http") ||
        link.hasAttribute("download") ||
        link.target === "_blank"
      ) {
        return;
      }

      // Only handle HTML page links
      if (
        href.endsWith(".html") ||
        href.endsWith("/") ||
        href.includes(".html#")
      ) {
        e.preventDefault();

        // Store previous page
        this.state.previousPage = this.state.currentPage;

        // Animate transition out
        transition.classList.add("active");

        // Navigate after animation
        setTimeout(() => {
          window.location.href = href;
        }, this.config.transitions.duration);
      }
    });

    // Handle page load (remove transition)
    window.addEventListener("pageshow", () => {
      transition.classList.remove("active");

      // Update current page
      this.state.currentPage = this.getCurrentPage();

      // Refresh modules for new page content
      this.refreshForNewPage();
    });

    // Handle back/forward browser buttons
    window.addEventListener("popstate", () => {
      this.state.currentPage = this.getCurrentPage();
    });
  },

  /**
   * Refresh modules when navigating to a new page
   */
  refreshForNewPage() {
    // Re-detect device
    this.detectDevice();

    // Reset scroll position
    this.state.scrollPosition = 0;

    // Refresh animations
    if (
      typeof Animations !== "undefined" &&
      this.state.modulesLoaded.animations
    ) {
      setTimeout(() => Animations.refresh(), 150);
    }

    // Re-initialize components
    this.initComponentsDirectly();

    // Scroll to top if not a hash link
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    } else {
      // Handle hash links after page load
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          if (window.lenis) {
            window.lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 300);
    }

    this.log(`📄 Page loaded: ${this.state.currentPage}`);
  },

  /**
   * Initialize performance optimizations
   */
  initPerformanceOptimizations() {
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, this.config.performance.debounceDelay);
    });

    // Use passive scroll listeners for better performance
    window.addEventListener(
      "scroll",
      () => {
        this.state.scrollPosition = window.scrollY;
      },
      { passive: true },
    );

    // Intersection Observer for lazy loading
    if (this.config.performance.enableLazyLoading) {
      this.initLazyLoading();
    }

    this.log("⚡ Performance optimizations initialized");
  },

  /**
   * Initialize lazy loading for images
   */
  initLazyLoading() {
    if ("loading" in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll("img:not([loading])").forEach((img) => {
        img.setAttribute("loading", "lazy");
      });
    } else {
      // Fallback for browsers that don't support native lazy loading
      const lazyImages = document.querySelectorAll("img[data-src]");

      if (lazyImages.length === 0) return;

      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute("data-src");
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          });
        },
        {
          rootMargin: "100px 0px",
        },
      );

      lazyImages.forEach((img) => imageObserver.observe(img));
    }
  },

  /**
   * Handle window resize
   */
  handleResize() {
    const wasMobile = this.state.isMobile;
    const wasTablet = this.state.isTablet;

    this.detectDevice();

    // If device type changed, reinitialize certain components
    if (
      wasMobile !== this.state.isMobile ||
      wasTablet !== this.state.isTablet
    ) {
      this.log("📱 Device type changed, reinitializing...");

      // Reinitialize product sliders
      this.initProductSliders();

      // Dispatch device change event
      this.dispatchEvent("deviceChanged", {
        isMobile: this.state.isMobile,
        isTablet: this.state.isTablet,
        isDesktop: this.state.isDesktop,
      });
    }
  },

  /**
   * Handle initial page load
   */
  handleInitialLoad() {
    // Handle loading screen if present
    const loader = document.querySelector(".page-loader");
    if (loader) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          loader.classList.add("loaded");
          setTimeout(() => {
            loader.remove();
            this.state.isLoaded = true;
            this.dispatchEvent("loadingComplete");
          }, 500);
        }, 500);
      });
    } else {
      this.state.isLoaded = true;
    }

    // Handle hash links on initial load
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          if (window.lenis) {
            window.lenis.scrollTo(target, { offset: -80, immediate: true });
          } else {
            target.scrollIntoView();
          }
        }
      }, 300);
    }

    // Add page-specific class to body
    const pageName = this.state.currentPage
      .replace(".html", "")
      .replace(/\//g, "-");
    document.body.classList.add(`page-${pageName || "home"}`);
  },

  /**
   * Bind global event listeners
   */
  bindGlobalEvents() {
    // Handle escape key globally
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        // Close any open overlays
        document
          .querySelector(".search-overlay.active")
          ?.classList.remove("active");
        document.body.style.overflow = "";

        // Dispatch escape event
        this.dispatchEvent("escapePressed");
      }
    });

    // Handle online/offline status
    window.addEventListener("online", () => {
      this.log("🌐 Online");
      document.body.classList.remove("is-offline");
    });

    window.addEventListener("offline", () => {
      this.log("📡 Offline");
      document.body.classList.add("is-offline");
    });

    // Handle print
    window.addEventListener("beforeprint", () => {
      document.body.classList.add("is-printing");
    });

    window.addEventListener("afterprint", () => {
      document.body.classList.remove("is-printing");
    });
  },

  /**
   * Get current page name from URL
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const pageName = path.split("/").pop() || "index.html";
    return pageName;
  },

  /**
   * Logging utility (only logs when debug is enabled)
   */
  log(message) {
    if (this.config.debug) {
      console.log(`[Agrim] ${message}`);
    }
  },

  /**
   * Error handling
   */
  handleError(message, error) {
    const errorDetails = {
      message,
      error: error?.message || error,
      timestamp: new Date().toISOString(),
      page: this.state.currentPage,
    };

    this.state.errors.push(errorDetails);

    console.error(`[Agrim Error] ${message}`, error);

    // Dispatch error event
    this.dispatchEvent("error", errorDetails);

    // Show user-friendly error message in development
    if (this.config.debug) {
      // Could show a toast notification here
    }
  },

  /**
   * Dispatch custom events
   */
  dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(`agrim:${name}`, {
      bubbles: true,
      cancelable: true,
      detail: {
        ...detail,
        timestamp: Date.now(),
        page: this.state.currentPage,
      },
    });

    document.dispatchEvent(event);
  },

  /**
   * Public API - Get application state
   */
  getState() {
    return {
      ...this.state,
      config: { ...this.config },
    };
  },

  /**
   * Public API - Check if a module is loaded
   */
  isModuleLoaded(moduleName) {
    return this.state.modulesLoaded[moduleName] === true;
  },

  /**
   * Public API - Get current scroll position
   */
  getScrollPosition() {
    return this.state.scrollPosition;
  },

  /**
   * Public API - Scroll to element
   */
  scrollTo(target, options = {}) {
    const defaultOptions = {
      offset: -80,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };

    const mergedOptions = { ...defaultOptions, ...options };

    if (typeof target === "string") {
      target = document.querySelector(target);
    }

    if (!target) {
      this.log("⚠️ Scroll target not found");
      return;
    }

    if (window.lenis) {
      window.lenis.scrollTo(target, mergedOptions);
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  },

  /**
   * Public API - Navigate to a page programmatically
   */
  navigateTo(url) {
    const transition = document.querySelector(".page-transition");

    if (transition && this.config.transitions.enabled) {
      transition.classList.add("active");
      setTimeout(() => {
        window.location.href = url;
      }, this.config.transitions.duration);
    } else {
      window.location.href = url;
    }
  },

  /**
   * Public API - Refresh application (useful after dynamic content changes)
   */
  refresh() {
    this.detectDevice();
    this.initComponentsDirectly();

    if (typeof Animations !== "undefined") {
      Animations.refresh();
    }

    if (typeof Navigation !== "undefined") {
      Navigation.initActiveLinkDetection?.();
    }

    this.log("🔄 Application refreshed");
  },

  /**
   * Destroy application (cleanup)
   */
  destroy() {
    this.log("🗑️ Destroying application...");

    // Destroy modules
    if (typeof Animations !== "undefined") {
      Animations.destroy();
    }

    if (typeof Navigation !== "undefined") {
      Navigation.destroy();
    }

    // Remove global event listeners (would need to store references)
    // Reset state
    this.state.isInitialized = false;
    this.state.modulesLoaded = {};
    this.state.errors = [];

    // Remove classes
    document.documentElement.classList.remove("js-loaded");
    document.body.classList.remove("app-loaded");

    this.log("✅ Application destroyed");
  },
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });
} else {
  // DOM already loaded
  App.init();
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}

// Make available globally
window.AgrimApp = App;
