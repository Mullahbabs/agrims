/**
 * Agrim International - Navigation System
 * Handles all navigation functionality including:
 * - Sticky navbar with scroll detection
 * - Mobile navigation drawer
 * - Mega menu interactions
 * - Search overlay
 * - Breadcrumb generation
 * - Active link detection
 * - Keyboard navigation
 * - Smooth scroll to sections
 */

const Navigation = {
  // Configuration
  config: {
    navbarSelector: '.navbar',
    mobileNavSelector: '.mobile-nav',
    navToggleSelector: '.nav-toggle',
    mobileNavCloseSelector: '.mobile-nav-close',
    megaMenuTriggerSelector: '.mega-menu-trigger',
    megaMenuSelector: '.mega-menu',
    searchTriggerSelector: '.search-trigger',
    searchOverlaySelector: '.search-overlay',
    searchCloseSelector: '.search-close',
    searchInputSelector: '.search-input',
    scrollThreshold: 50,
    mobileBreakpoint: 1024,
    animationDuration: 400,
  },

  // State
  state: {
    isMobileNavOpen: false,
    isSearchOpen: false,
    isScrolled: false,
    isMegaMenuOpen: false,
    lastScrollY: 0,
    scrollDirection: 'up',
    activeMegaMenu: null,
  },

  /**
   * Initialize all navigation functionality
   */
  init() {
    this.cacheDomElements();
    this.bindEvents();
    this.initStickyNav();
    this.initMobileNav();
    this.initMegaMenu();
    this.initSearchOverlay();
    this.initActiveLinkDetection();
    this.initBreadcrumbs();
    this.initSmoothScroll();
    this.initKeyboardNavigation();
    this.handleResize();
  },

  /**
   * Cache all DOM elements
   */
  cacheDomElements() {
    this.navbar = document.querySelector(this.config.navbarSelector);
    this.mobileNav = document.querySelector(this.config.mobileNavSelector);
    this.navToggle = document.querySelector(this.config.navToggleSelector);
    this.mobileNavClose = document.querySelector(this.config.mobileNavCloseSelector);
    this.megaMenuTriggers = document.querySelectorAll(this.config.megaMenuTriggerSelector);
    this.megaMenus = document.querySelectorAll(this.config.megaMenuSelector);
    this.searchTriggers = document.querySelectorAll(this.config.searchTriggerSelector);
    this.searchOverlay = document.querySelector(this.config.searchOverlaySelector);
    this.searchClose = document.querySelector(this.config.searchCloseSelector);
    this.searchInput = document.querySelector(this.config.searchInputSelector);
    this.allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a, .footer-column a');
    this.body = document.body;
    this.html = document.documentElement;
  },

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Scroll events
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    
    // Resize events
    window.addEventListener('resize', () => this.handleResize());
    
    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Click outside events
    document.addEventListener('click', (e) => this.handleClickOutside(e));
    
    // Mobile nav toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMobileNav();
      });
    }
    
    // Mobile nav close
    if (this.mobileNavClose) {
      this.mobileNavClose.addEventListener('click', () => this.closeMobileNav());
    }
    
    // Mobile nav links (close on click)
    if (this.mobileNav) {
      this.mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= this.config.mobileBreakpoint) {
            this.closeMobileNav();
          }
        });
      });
    }
    
    // Search triggers
    this.searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    });
    
    // Search close
    if (this.searchClose) {
      this.searchClose.addEventListener('click', () => this.closeSearch());
    }
    
    // Search overlay click to close
    if (this.searchOverlay) {
      this.searchOverlay.addEventListener('click', (e) => {
        if (e.target === this.searchOverlay) {
          this.closeSearch();
        }
      });
    }

    // Mega menu triggers for mobile/touch devices
    this.megaMenuTriggers.forEach(trigger => {
      const link = trigger.querySelector('a');
      if (link && window.innerWidth <= this.config.mobileBreakpoint) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMegaMenu(trigger);
        });
      }
    });
  },

  /**
   * Handle scroll events
   */
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Update scroll direction
    this.state.scrollDirection = currentScrollY > this.state.lastScrollY ? 'down' : 'up';
    this.state.lastScrollY = currentScrollY;
    
    // Sticky navbar
    if (currentScrollY > this.config.scrollThreshold) {
      if (!this.state.isScrolled) {
        this.state.isScrolled = true;
        this.navbar?.classList.add('scrolled');
        this.onNavbarScrolled();
      }
    } else {
      if (this.state.isScrolled) {
        this.state.isScrolled = false;
        this.navbar?.classList.remove('scrolled');
        this.onNavbarUnscrolled();
      }
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScrollY > 300) {
      if (this.state.scrollDirection === 'down' && !this.state.isMobileNavOpen) {
        this.navbar?.style.setProperty('transform', 'translateY(-100%)');
      } else if (this.state.scrollDirection === 'up') {
        this.navbar?.style.setProperty('transform', 'translateY(0)');
      }
    }
    
    // Update active section
    this.updateActiveSection();
  },

  /**
   * Initialize sticky navigation
   */
  initStickyNav() {
    if (!this.navbar) return;
    
    // Set initial state
    if (window.scrollY > this.config.scrollThreshold) {
      this.state.isScrolled = true;
      this.navbar.classList.add('scrolled');
    }
    
    // Add transition after initial load
    setTimeout(() => {
      this.navbar.style.transition = 'transform 0.3s ease, background 0.3s ease, padding 0.3s ease';
    }, 100);
  },

  /**
   * Callback when navbar becomes scrolled
   */
  onNavbarScrolled() {
    // Add any additional scrolled state behaviors
    this.navbar?.style.setProperty('--navbar-bg', 'rgba(10, 10, 10, 0.95)');
  },

  /**
   * Callback when navbar becomes unscrolled
   */
  onNavbarUnscrolled() {
    // Reset any scrolled state behaviors
    this.navbar?.style.setProperty('--navbar-bg', 'transparent');
  },

  /**
   * Initialize mobile navigation
   */
  initMobileNav() {
    if (!this.mobileNav) return;
    
    // Set initial state
    this.mobileNav.setAttribute('aria-hidden', 'true');
    this.mobileNav.setAttribute('inert', '');
    
    // Add swipe to close functionality
    let touchStartX = 0;
    let touchCurrentX = 0;
    
    this.mobileNav.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    this.mobileNav.addEventListener('touchmove', (e) => {
      touchCurrentX = e.touches[0].clientX;
      const diff = touchCurrentX - touchStartX;
      
      if (diff > 0) {
        this.mobileNav.style.transform = `translateX(${diff}px)`;
      }
    }, { passive: true });
    
    this.mobileNav.addEventListener('touchend', () => {
      const diff = touchCurrentX - touchStartX;
      
      if (diff > 100) {
        this.closeMobileNav();
      }
      
      this.mobileNav.style.transform = '';
      touchStartX = 0;
      touchCurrentX = 0;
    });
  },

  /**
   * Toggle mobile navigation
   */
  toggleMobileNav() {
    if (this.state.isMobileNavOpen) {
      this.closeMobileNav();
    } else {
      this.openMobileNav();
    }
  },

  /**
   * Open mobile navigation
   */
  openMobileNav() {
    if (!this.mobileNav) return;
    
    this.state.isMobileNavOpen = true;
    this.mobileNav.classList.add('open');
    this.mobileNav.setAttribute('aria-hidden', 'false');
    this.mobileNav.removeAttribute('inert');
    this.body.style.overflow = 'hidden';
    
    // Animate hamburger to X
    this.navToggle?.classList.add('active');
    
    // Focus first link
    const firstLink = this.mobileNav.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 300);
    }
    
    // Dispatch custom event
    this.dispatchEvent('mobileNavOpened');
  },

  /**
   * Close mobile navigation
   */
  closeMobileNav() {
    if (!this.mobileNav) return;
    
    this.state.isMobileNavOpen = false;
    this.mobileNav.classList.remove('open');
    this.mobileNav.setAttribute('aria-hidden', 'true');
    this.mobileNav.setAttribute('inert', '');
    this.body.style.overflow = '';
    
    // Reset hamburger
    this.navToggle?.classList.remove('active');
    
    // Dispatch custom event
    this.dispatchEvent('mobileNavClosed');
  },

  /**
   * Initialize mega menu
   */
  initMegaMenu() {
    this.megaMenuTriggers.forEach(trigger => {
      const menu = trigger.querySelector(this.config.megaMenuSelector);
      if (!menu) return;
      
      // Desktop hover behavior
      if (window.innerWidth > this.config.mobileBreakpoint) {
        let hoverTimeout;
        
        trigger.addEventListener('mouseenter', () => {
          clearTimeout(hoverTimeout);
          this.openMegaMenu(trigger, menu);
        });
        
        trigger.addEventListener('mouseleave', () => {
          hoverTimeout = setTimeout(() => {
            this.closeMegaMenu(trigger, menu);
          }, 200);
        });
        
        menu.addEventListener('mouseenter', () => {
          clearTimeout(hoverTimeout);
        });
        
        menu.addEventListener('mouseleave', () => {
          hoverTimeout = setTimeout(() => {
            this.closeMegaMenu(trigger, menu);
          }, 200);
        });
      }
      
      // Keyboard accessibility
      trigger.querySelector('a')?.addEventListener('focus', () => {
        this.openMegaMenu(trigger, menu);
      });
      
      // Close when last item loses focus
      const lastMenuItem = menu.querySelector('a:last-child');
      lastMenuItem?.addEventListener('blur', (e) => {
        if (!menu.contains(e.relatedTarget)) {
          this.closeMegaMenu(trigger, menu);
        }
      });
    });
  },

  /**
   * Open mega menu
   */
  openMegaMenu(trigger, menu) {
    this.state.activeMegaMenu = menu;
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateX(-50%) translateY(0)';
    menu.setAttribute('aria-hidden', 'false');
    trigger.classList.add('mega-menu-active');
  },

  /**
   * Close mega menu
   */
  closeMegaMenu(trigger, menu) {
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateX(-50%) translateY(10px)';
    menu.setAttribute('aria-hidden', 'true');
    trigger.classList.remove('mega-menu-active');
    this.state.activeMegaMenu = null;
  },

  /**
   * Toggle mega menu (for mobile)
   */
  toggleMegaMenu(trigger) {
    const menu = trigger.querySelector(this.config.megaMenuSelector);
    if (!menu) return;
    
    if (this.state.activeMegaMenu === menu) {
      this.closeMegaMenu(trigger, menu);
    } else {
      // Close any open mega menu
      if (this.state.activeMegaMenu) {
        const activeTrigger = this.state.activeMegaMenu.closest(this.config.megaMenuTriggerSelector);
        this.closeMegaMenu(activeTrigger, this.state.activeMegaMenu);
      }
      this.openMegaMenu(trigger, menu);
    }
  },

  /**
   * Initialize search overlay
   */
  initSearchOverlay() {
    if (!this.searchOverlay) return;
    
    // Set initial state
    this.searchOverlay.setAttribute('aria-hidden', 'true');
    
    // Add animation class
    this.searchOverlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  },

  /**
   * Open search overlay
   */
  openSearch() {
    if (!this.searchOverlay) return;
    
    this.state.isSearchOpen = true;
    this.searchOverlay.classList.add('active');
    this.searchOverlay.setAttribute('aria-hidden', 'false');
    this.body.style.overflow = 'hidden';
    
    // Focus search input
    setTimeout(() => {
      this.searchInput?.focus();
    }, 100);
    
    // Dispatch custom event
    this.dispatchEvent('searchOpened');
  },

  /**
   * Close search overlay
   */
  closeSearch() {
    if (!this.searchOverlay) return;
    
    this.state.isSearchOpen = false;
    this.searchOverlay.classList.remove('active');
    this.searchOverlay.setAttribute('aria-hidden', 'true');
    this.body.style.overflow = '';
    
    // Clear search input
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    
    // Dispatch custom event
    this.dispatchEvent('searchClosed');
  },

  /**
   * Initialize active link detection based on current URL
   */
  initActiveLinkDetection() {
    const currentPath = window.location.pathname;
    
    this.allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (href === currentPath || 
          (currentPath.includes(href) && href !== '/' && href !== '../index.html')) {
        link.classList.add('active');
        link.style.color = 'var(--color-gold)';
        
        // If in dropdown, highlight parent
        const parentMenuItem = link.closest('.nav-links > li');
        if (parentMenuItem) {
          parentMenuItem.querySelector('a:first-child')?.classList.add('active');
        }
      }
    });
  },

  /**
   * Update active section based on scroll position
   */
  updateActiveSection() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        // Update nav links
        this.allNavLinks.forEach(link => {
          link.classList.remove('active-section');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-section');
          }
        });
      }
    });
  },

  /**
   * Initialize breadcrumb generation
   */
  initBreadcrumbs() {
    const breadcrumbContainers = document.querySelectorAll('.breadcrumb');
    
    breadcrumbContainers.forEach(container => {
      // Check if breadcrumb is already populated
      if (container.children.length > 0) return;
      
      const path = window.location.pathname;
      const pathParts = path.split('/').filter(part => part && part !== 'pages');
      
      // Add home link
      const homeLink = document.createElement('a');
      homeLink.href = path.includes('/pages/') ? '../index.html' : 'index.html';
      homeLink.textContent = 'Home';
      container.appendChild(homeLink);
      
      // Add path parts
      pathParts.forEach((part, index) => {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = '/';
        container.appendChild(separator);
        
        if (index === pathParts.length - 1) {
          // Last part - current page
          const span = document.createElement('span');
          span.textContent = this.formatBreadcrumbText(part.replace('.html', ''));
          container.appendChild(span);
        } else {
          // Intermediate parts
          const link = document.createElement('a');
          link.href = part;
          link.textContent = this.formatBreadcrumbText(part.replace('.html', ''));
          container.appendChild(link);
        }
      });
    });
  },

  /**
   * Format breadcrumb text
   */
  formatBreadcrumbText(text) {
    return text
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  },

  /**
   * Initialize smooth scroll for anchor links
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Close mobile nav if open
          if (this.state.isMobileNavOpen) {
            this.closeMobileNav();
          }
          
          // Smooth scroll
          if (window.lenis) {
            window.lenis.scrollTo(targetElement, {
              offset: -80,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
          
          // Update URL without page reload
          history.pushState(null, null, targetId);
        }
      });
    });
  },

  /**
   * Initialize keyboard navigation
   */
  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  },

  /**
   * Handle keyboard events
   */
  handleKeyboard(e) {
    // Escape key
    if (e.key === 'Escape') {
      if (this.state.isMobileNavOpen) {
        this.closeMobileNav();
      }
      if (this.state.isSearchOpen) {
        this.closeSearch();
      }
      if (this.state.activeMegaMenu) {
        const trigger = this.state.activeMegaMenu.closest(this.config.megaMenuTriggerSelector);
        this.closeMegaMenu(trigger, this.state.activeMegaMenu);
      }
      // Return focus to trigger
      this.navToggle?.focus();
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (this.state.isSearchOpen) {
        this.closeSearch();
      } else {
        this.openSearch();
      }
    }
    
    // Tab key - trap focus in mobile nav
    if (e.key === 'Tab' && this.state.isMobileNavOpen && this.mobileNav) {
      this.trapFocusInMobileNav(e);
    }
    
    // Tab key - trap focus in search overlay
    if (e.key === 'Tab' && this.state.isSearchOpen && this.searchOverlay) {
      this.trapFocusInSearch(e);
    }
  },

  /**
   * Trap focus within mobile navigation
   */
  trapFocusInMobileNav(e) {
    const focusableElements = this.mobileNav.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  },

  /**
   * Trap focus within search overlay
   */
  trapFocusInSearch(e) {
    const focusableElements = this.searchOverlay.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  },

  /**
   * Handle click outside elements
   */
  handleClickOutside(e) {
    // Close mega menu when clicking outside
    if (this.state.activeMegaMenu) {
      const trigger = this.state.activeMegaMenu.closest(this.config.megaMenuTriggerSelector);
      if (!trigger?.contains(e.target)) {
        this.closeMegaMenu(trigger, this.state.activeMegaMenu);
      }
    }
  },

  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile nav on desktop resize
    if (window.innerWidth > this.config.mobileBreakpoint && this.state.isMobileNavOpen) {
      this.closeMobileNav();
    }
    
    // Update mega menu behavior based on screen size
    this.initMegaMenu();
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
   * Public API - Scroll to element
   */
  scrollTo(target, options = {}) {
    const defaultOptions = {
      offset: -80,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (window.lenis) {
      window.lenis.scrollTo(target, mergedOptions);
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  },

  /**
   * Public API - Get current navigation state
   */
  getState() {
    return { ...this.state };
  },

  /**
   * Destroy navigation (cleanup)
   */
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleKeyboard);
    document.removeEventListener('click', this.handleClickOutside);
    
    // Reset all states
    this.closeMobileNav();
    this.closeSearch();
    if (this.state.activeMegaMenu) {
      const trigger = this.state.activeMegaMenu.closest(this.config.megaMenuTriggerSelector);
      this.closeMegaMenu(trigger, this.state.activeMegaMenu);
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});