/**
 * Agrim International - Advanced Animation System
 * Handles all animations including:
 * - Scroll-triggered reveal animations
 * - Parallax effects
 * - Counter animations
 * - Text reveal effects
 * - Image reveal effects
 * - Stagger children animations
 * - Hover micro-interactions
 * - Floating elements
 * - Cursor effects
 * - Loading animations
 * - Three.js background effects (optional)
 */

const Animations = {
  // Configuration
  config: {
    revealThreshold: 0.15,
    revealRootMargin: '0px 0px -50px 0px',
    parallaxIntensity: 0.5,
    counterDuration: 2000,
    floatAmplitude: 20,
    floatDuration: 6000,
    loadingTimeout: 2000,
    reducedMotion: false,
  },

  // State
  state: {
    observers: [],
    animatedElements: new Set(),
    parallaxElements: [],
    floatElements: [],
    counterElements: [],
    rafId: null,
    isReducedMotion: false,
  },

  /**
   * Initialize all animations
   */
  init() {
    this.checkReducedMotion();
    
    if (this.state.isReducedMotion) {
      this.initReducedMotionMode();
      return;
    }
    
    this.initRevealAnimations();
    this.initParallaxEffects();
    this.initCounterAnimations();
    this.initFloatingElements();
    this.initTextReveal();
    this.initImageReveal();
    this.initHoverMicroInteractions();
    this.initStaggerAnimations();
    this.initScrollProgress();
    this.initLazyImageLoading();
    this.initBackgroundEffects();
    this.startAnimationLoop();
    
    // Dispatch ready event
    this.dispatchEvent('animationsReady');
  },

  /**
   * Check if user prefers reduced motion
   */
  checkReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.state.isReducedMotion = mediaQuery.matches;
    
    mediaQuery.addEventListener('change', (e) => {
      this.state.isReducedMotion = e.matches;
      if (e.matches) {
        this.disableAnimations();
        this.initReducedMotionMode();
      } else {
        this.enableAnimations();
      }
    });
  },

  /**
   * Initialize reduced motion mode
   */
  initReducedMotionMode() {
    // Make all elements visible immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    
    // Disable parallax
    document.querySelectorAll('[data-parallax]').forEach(el => {
      el.style.transform = 'none';
    });
    
    // Disable float animations
    document.querySelectorAll('.float-element').forEach(el => {
      el.style.animation = 'none';
    });
  },

  /**
   * Disable all animations
   */
  disableAnimations() {
    if (this.state.rafId) {
      cancelAnimationFrame(this.state.rafId);
      this.state.rafId = null;
    }
    
    this.state.observers.forEach(observer => observer.disconnect());
    this.state.observers = [];
  },

  /**
   * Enable all animations
   */
  enableAnimations() {
    this.init();
  },

  /**
   * Initialize scroll-triggered reveal animations
   */
  initRevealAnimations() {
    const revealElements = document.querySelectorAll(`
      .reveal:not(.visible),
      .reveal-left:not(.visible),
      .reveal-right:not(.visible),
      .reveal-scale:not(.visible),
      .stagger-children:not(.visible)
    `);
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add visible class with delay if specified
          const delay = element.getAttribute('data-reveal-delay') || 0;
          
          setTimeout(() => {
            element.classList.add('visible');
            
            // Handle stagger children
            if (element.classList.contains('stagger-children')) {
              this.animateStaggerChildren(element);
            }
            
            // Handle counter animation
            const counters = element.querySelectorAll('.counter-number[data-target]');
            counters.forEach(counter => {
              if (!this.state.counterElements.includes(counter)) {
                this.state.counterElements.push(counter);
                this.animateCounter(counter);
              }
            });
            
            // Dispatch reveal event
            this.dispatchEvent('elementRevealed', { element });
          }, delay);
          
          // Unobserve if not repeating
          if (!element.hasAttribute('data-reveal-repeat')) {
            observer.unobserve(element);
          }
        } else if (element.hasAttribute('data-reveal-repeat')) {
          element.classList.remove('visible');
        }
      });
    }, {
      threshold: this.config.revealThreshold,
      rootMargin: this.config.revealRootMargin
    });
    
    revealElements.forEach(el => observer.observe(el));
    this.state.observers.push(observer);
  },

  /**
   * Animate stagger children within a container
   */
  animateStaggerChildren(container) {
    const children = container.children;
    const staggerDelay = parseInt(container.getAttribute('data-stagger-delay')) || 100;
    
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * staggerDelay}ms`;
      child.style.opacity = '1';
      child.style.transform = 'translateY(0)';
    });
  },

  /**
   * Initialize parallax effects
   */
  initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax], .parallax-bg');
    
    parallaxElements.forEach(element => {
      const intensity = parseFloat(element.getAttribute('data-parallax')) || this.config.parallaxIntensity;
      
      this.state.parallaxElements.push({
        element,
        intensity,
        initialY: 0,
        currentY: 0,
      });
    });
  },

  /**
   * Update parallax positions
   */
  updateParallax() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    this.state.parallaxElements.forEach(item => {
      const rect = item.element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      const parallaxY = distanceFromCenter * item.intensity * 0.1;
      
      item.currentY = parallaxY;
      item.element.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
    });
  },

  /**
   * Initialize counter animations
   */
  initCounterAnimations() {
    const counters = document.querySelectorAll('.counter-number[data-target]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!this.state.counterElements.includes(counter)) {
            this.state.counterElements.push(counter);
            this.animateCounter(counter);
          }
          observer.unobserve(counter);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -30px 0px'
    });
    
    counters.forEach(counter => observer.observe(counter));
    this.state.observers.push(observer);
  },

  /**
   * Animate a single counter
   */
  animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = parseInt(counter.getAttribute('data-duration')) || this.config.counterDuration;
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '+';
    const separator = counter.hasAttribute('data-separator');
    const decimalPlaces = parseInt(counter.getAttribute('data-decimals')) || 0;
    
    if (isNaN(target)) return;
    
    const startTime = performance.now();
    const startValue = 0;
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-expo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentValue = startValue + (target - startValue) * eased;
      
      // Format the number
      let displayValue = currentValue.toFixed(decimalPlaces);
      
      if (separator) {
        displayValue = this.formatNumber(parseFloat(displayValue));
      } else {
        displayValue = Math.floor(currentValue);
        if (separator) {
          displayValue = this.formatNumber(displayValue);
        }
      }
      
      counter.textContent = `${prefix}${displayValue}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        this.dispatchEvent('counterComplete', { counter, target });
      }
    };
    
    requestAnimationFrame(updateCounter);
  },

  /**
   * Format number with commas
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Initialize floating elements
   */
  initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element, [data-float]');
    
    floatElements.forEach((element, index) => {
      const amplitude = parseFloat(element.getAttribute('data-float-amplitude')) || this.config.floatAmplitude;
      const duration = parseFloat(element.getAttribute('data-float-duration')) || this.config.floatDuration;
      const delay = parseFloat(element.getAttribute('data-float-delay')) || (index * 200);
      
      this.state.floatElements.push({
        element,
        amplitude,
        duration,
        delay,
        phase: (delay / 1000) * Math.PI * 2,
        startTime: performance.now() + delay,
      });
    });
  },

  /**
   * Update floating elements
   */
  updateFloatingElements(currentTime) {
    this.state.floatElements.forEach(item => {
      const elapsed = currentTime - item.startTime;
      const progress = (elapsed % item.duration) / item.duration;
      const angle = progress * Math.PI * 2 + item.phase;
      
      const yOffset = Math.sin(angle) * item.amplitude;
      const xOffset = Math.cos(angle * 0.5) * item.amplitude * 0.3;
      
      item.element.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
    });
  },

  /**
   * Initialize text reveal animations
   */
  initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const text = element.textContent;
          const delay = parseInt(element.getAttribute('data-reveal-delay')) || 0;
          
          // Split text into characters
          element.innerHTML = '';
          element.style.opacity = '1';
          
          text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.5s ease ${index * 30 + delay}ms`;
            
            element.appendChild(span);
            
            // Trigger animation
            setTimeout(() => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
            }, 50);
          });
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.5
    });
    
    textElements.forEach(el => observer.observe(el));
    this.state.observers.push(observer);
  },

  /**
   * Initialize image reveal effects
   */
  initImageReveal() {
    const imageContainers = document.querySelectorAll('[data-image-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const image = container.querySelector('img');
          
          if (image) {
            container.style.position = 'relative';
            container.style.overflow = 'hidden';
            
            // Create reveal overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
              position: absolute;
              inset: 0;
              background: var(--color-gold, #c4a747);
              transform: scaleX(1);
              transform-origin: right;
              transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
              z-index: 2;
            `;
            
            container.appendChild(overlay);
            
            // Animate overlay
            requestAnimationFrame(() => {
              overlay.style.transform = 'scaleX(0)';
            });
            
            // Clean up after animation
            setTimeout(() => {
              overlay.remove();
            }, 800);
          }
          
          observer.unobserve(container);
        }
      });
    }, {
      threshold: 0.2
    });
    
    imageContainers.forEach(container => observer.observe(container));
    this.state.observers.push(observer);
  },

  /**
   * Initialize hover micro-interactions
   */
  initHoverMicroInteractions() {
    // Magnetic hover effect
    document.querySelectorAll('[data-magnetic]').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const intensity = parseFloat(element.getAttribute('data-magnetic')) || 0.3;
        
        element.style.transform = `translate(${mouseX * intensity}px, ${mouseY * intensity}px)`;
        element.style.transition = 'transform 0.1s ease-out';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.5s ease-out';
      });
    });
    
    // 3D tilt effect
    document.querySelectorAll('[data-tilt]').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const percentX = (mouseX / rect.width - 0.5) * 2;
        const percentY = (mouseY / rect.height - 0.5) * 2;
        
        const maxTilt = parseInt(element.getAttribute('data-tilt')) || 15;
        
        element.style.transform = `
          perspective(1000px)
          rotateY(${percentX * maxTilt}deg)
          rotateX(${-percentY * maxTilt}deg)
          scale3d(1.02, 1.02, 1.02)
        `;
        element.style.transition = 'transform 0.1s ease-out';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
        element.style.transition = 'transform 0.6s ease-out';
      });
    });
    
    // Glow follow effect
    document.querySelectorAll('[data-glow-follow]').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--glow-x', `${x}px`);
        element.style.setProperty('--glow-y', `${y}px`);
      });
    });
  },

  /**
   * Initialize stagger animations for lists/grids
   */
  initStaggerAnimations() {
    // This is handled by the reveal animation system
    // Additional stagger configurations can be added here
  },

  /**
   * Initialize scroll progress indicator
   */
  initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      progressBar.style.transform = `scaleX(${progress / 100})`;
      progressBar.style.transformOrigin = 'left';
    };
    
    window.addEventListener('scroll', updateProgress, { passive: true });
  },

  /**
   * Initialize lazy image loading with blur effect
   */
  initLazyImageLoading() {
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          if (img.hasAttribute('data-src')) {
            // Create a temporary image to preload
            const tempImage = new Image();
            tempImage.src = img.getAttribute('data-src');
            
            tempImage.onload = () => {
              img.style.filter = 'blur(10px)';
              img.style.transition = 'filter 0.6s ease';
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              
              requestAnimationFrame(() => {
                img.style.filter = 'blur(0)';
              });
            };
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px 0px'
    });
    
    lazyImages.forEach(img => observer.observe(img));
    this.state.observers.push(observer);
  },

  /**
   * Initialize background effects
   */
  initBackgroundEffects() {
    // Animated gradient mesh background (optional)
    const meshBackgrounds = document.querySelectorAll('[data-mesh-bg]');
    
    meshBackgrounds.forEach(bg => {
      // Subtle animated background effect
      let hue = 0;
      
      const animateMesh = () => {
        hue = (hue + 0.1) % 360;
        bg.style.background = `
          radial-gradient(
            ellipse at ${50 + Math.sin(hue * 0.02) * 20}% ${50 + Math.cos(hue * 0.03) * 20}%,
            rgba(196, 167, 71, 0.05) 0%,
            transparent 70%
          )
        `;
        
        if (bg.hasAttribute('data-mesh-bg')) {
          requestAnimationFrame(animateMesh);
        }
      };
      
      requestAnimationFrame(animateMesh);
    });
    
    // Particle background (lightweight)
    const particleBg = document.querySelector('[data-particles]');
    if (particleBg) {
      this.initParticles(particleBg);
    }
  },

  /**
   * Initialize lightweight particles
   */
  initParticles(container) {
    const count = parseInt(container.getAttribute('data-particles')) || 50;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    container.style.position = 'relative';
    container.appendChild(canvas);
    
    const particles = [];
    
    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 167, 71, ${p.opacity})`;
        ctx.fill();
      });
      
      if (container.hasAttribute('data-particles')) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  },

  /**
   * Start the main animation loop
   */
  startAnimationLoop() {
    const animate = (currentTime) => {
      this.updateParallax();
      this.updateFloatingElements(currentTime);
      
      this.state.rafId = requestAnimationFrame(animate);
    };
    
    this.state.rafId = requestAnimationFrame(animate);
  },

  /**
   * Initialize intersection observer for any custom animations
   */
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: this.config.revealThreshold,
      rootMargin: this.config.revealRootMargin,
    };
    
    const observer = new IntersectionObserver(callback, {
      ...defaultOptions,
      ...options
    });
    
    this.state.observers.push(observer);
    return observer;
  },

  /**
   * Animate element entrance
   */
  animateIn(element, animation = 'fadeUp', duration = 800, delay = 0) {
    const animations = {
      fadeUp: {
        from: { opacity: 0, transform: 'translateY(40px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      scaleIn: {
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: { opacity: 1, transform: 'scale(1)' }
      },
      slideLeft: {
        from: { opacity: 0, transform: 'translateX(60px)' },
        to: { opacity: 1, transform: 'translateX(0)' }
      },
      slideRight: {
        from: { opacity: 0, transform: 'translateX(-60px)' },
        to: { opacity: 1, transform: 'translateX(0)' }
      },
    };
    
    const config = animations[animation] || animations.fadeUp;
    
    element.style.opacity = config.from.opacity;
    element.style.transform = config.from.transform;
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
    
    requestAnimationFrame(() => {
      element.style.opacity = config.to.opacity;
      element.style.transform = config.to.transform;
    });
    
    return new Promise(resolve => {
      setTimeout(resolve, duration + delay);
    });
  },

  /**
   * Animate element exit
   */
  animateOut(element, animation = 'fadeUp', duration = 600, delay = 0) {
    const animations = {
      fadeUp: { opacity: 0, transform: 'translateY(-40px)' },
      fadeIn: { opacity: 0 },
      scaleIn: { opacity: 0, transform: 'scale(0.9)' },
      slideLeft: { opacity: 0, transform: 'translateX(-60px)' },
      slideRight: { opacity: 0, transform: 'translateX(60px)' },
    };
    
    const config = animations[animation] || animations.fadeUp;
    
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
    element.style.opacity = config.opacity;
    element.style.transform = config.transform;
    
    return new Promise(resolve => {
      setTimeout(resolve, duration + delay);
    });
  },

  /**
   * Stagger animate multiple elements
   */
  staggerAnimate(elements, animation = 'fadeUp', duration = 800, staggerDelay = 100) {
    const promises = [];
    
    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      promises.push(this.animateIn(element, animation, duration, delay));
    });
    
    return Promise.all(promises);
  },

  /**
   * Dispatch custom event
   */
  dispatchEvent(name, detail = {}) {
    const event = new CustomEvent(`agrim:${name}`, {
      bubbles: true,
      detail: detail
    });
    document.dispatchEvent(event);
  },

  /**
   * Public API - Refresh animations (useful after dynamic content loads)
   */
  refresh() {
    this.initRevealAnimations();
    this.initCounterAnimations();
    this.initFloatingElements();
    this.initLazyImageLoading();
  },

  /**
   * Public API - Get animation state
   */
  getState() {
    return { ...this.state };
  },

  /**
   * Destroy all animations (cleanup)
   */
  destroy() {
    if (this.state.rafId) {
      cancelAnimationFrame(this.state.rafId);
      this.state.rafId = null;
    }
    
    this.state.observers.forEach(observer => observer.disconnect());
    this.state.observers = [];
    
    this.state.parallaxElements = [];
    this.state.floatElements = [];
    this.state.counterElements = [];
    this.state.animatedElements.clear();
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Animations;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize after a short delay to ensure all elements are rendered
  setTimeout(() => {
    Animations.init();
  }, 100);
});