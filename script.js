(function() {
      // --- User dropdown toggle ---
      const userBtn = document.getElementById('userIconBtn');
      const userDropdown = document.getElementById('userDropdown');

      if (userBtn && userDropdown) {
        userBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
          if (!userBtn.contains(event.target) && !userDropdown.contains(event.target)) {
            userDropdown.classList.remove('show');
          }
        });
      }

      // --- Mobile menu toggle (hamburger) ---
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');

      if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
          hamburgerBtn.classList.toggle('active');
          mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
          });
        });
      }

      // --- Fade-in carousel (crossfade effect) ---
      const track = document.getElementById('carouselTrack');
      if (track) {
        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        let currentIndex = 0;
        const totalSlides = slides.length;
        
        function resetSlides() {
          slides.forEach((slide, idx) => {
            slide.style.transition = 'opacity 0.8s ease-in-out';
            slide.style.opacity = idx === 0 ? '1' : '0';
            slide.style.position = 'absolute';
            slide.style.inset = '0';
            slide.style.minWidth = '100%';
          });
          track.style.position = 'relative';
          track.style.width = '100%';
          track.style.height = '100%';
          if (slides[0]) {
            slides[0].style.position = 'relative';
            slides[0].style.opacity = '1';
          }
        }

        resetSlides();

        function goToSlide(index) {
          if (index === currentIndex) return;
          const currentSlide = slides[currentIndex];
          const nextSlide = slides[index];
          if (!currentSlide || !nextSlide) return;

          nextSlide.style.position = 'relative';
          nextSlide.style.opacity = '0';
          void nextSlide.offsetWidth;
          
          currentSlide.style.transition = 'opacity 0.8s ease-in-out';
          nextSlide.style.transition = 'opacity 0.8s ease-in-out';
          
          currentSlide.style.opacity = '0';
          nextSlide.style.opacity = '1';

          setTimeout(() => {
            slides.forEach((slide, i) => {
              if (i !== index) {
                slide.style.position = 'absolute';
                slide.style.opacity = '0';
              } else {
                slide.style.position = 'relative';
                slide.style.opacity = '1';
              }
            });
          }, 800);

          currentIndex = index;
        }

        setInterval(() => {
          let nextIdx = (currentIndex + 1) % totalSlides;
          goToSlide(nextIdx);
        }, 4500);
      }

      // Close dropdown on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (userDropdown) userDropdown.classList.remove('show');
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
          }
        }
      });

    })();

    // Interactive Grid Cards JavaScript
(function() {
  const gridCards = document.querySelectorAll('.grid-card');
  
  gridCards.forEach(card => {
    // Mouse enter - add active class for any additional effects
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-active');
    });
    
    // Mouse leave - remove active class
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-active');
    });
    
    // Click handler - you can navigate or trigger modals
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking the link directly
      if (e.target.closest('.card-link')) return;
      
      const category = this.dataset.category;
      console.log(`Navigate to: ${category}`);
      // Example: window.location.href = `/${category}`;
    });
    
    // Optional: 3D tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -5; // max 5deg tilt
      const rotateY = (x - centerX) / centerX * 5;
      
      this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
})();

// Products JSON Data - Prices in Naira (₦)
const productsData = [
  {
    id: 1,
    name: "Silk Evening Gown",
    brand: "Valentino",
    price: 245000,
    originalPrice: 320000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1883&auto=format&fit=crop",
    badge: "hot",
    badgeText: "Hot Pick",
    description: "Stunning silk evening gown with hand-embroidered details. Perfect for gala events and special occasions."
  },
  {
    id: 2,
    name: "Leather Tote Bag",
    brand: "Bottega Veneta",
    price: 380000,
    originalPrice: 450000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
    badge: "trending",
    badgeText: "Trending",
    description: "Iconic intrecciato leather tote. Spacious interior with signature craftsmanship."
  },
  {
    id: 3,
    name: "Cashmere Blazer",
    brand: "Loro Piana",
    price: 520000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1880&auto=format&fit=crop",
    badge: "new",
    badgeText: "New",
    description: "Ultra-soft cashmere blazer in timeless navy. Unstructured fit for effortless elegance."
  },
  {
    id: 4,
    name: "Crystal Heels",
    brand: "Jimmy Choo",
    price: 185000,
    originalPrice: 240000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1880&auto=format&fit=crop",
    badge: "hot",
    badgeText: "Hot Pick",
    description: "Dazzling crystal-embellished heels with a comfortable 85mm heel. Red carpet ready."
  },
  {
    id: 5,
    name: "Oversized Sunglasses",
    brand: "Celine",
    price: 62000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1880&auto=format&fit=crop",
    badge: "trending",
    badgeText: "Trending",
    description: "Bold acetate frames with gradient lenses. The ultimate statement accessory."
  },
  {
    id: 6,
    name: "Silk Scarf",
    brand: "Hermès",
    price: 89000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1880&auto=format&fit=crop",
    badge: "new",
    badgeText: "New",
    description: "Hand-rolled silk twill scarf featuring the iconic Brides de Gala pattern."
  },
  {
    id: 7,
    name: "Wool Coat",
    brand: "Max Mara",
    price: 310000,
    originalPrice: 380000,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1887&auto=format&fit=crop",
    badge: "hot",
    badgeText: "Hot Pick",
    description: "Timeless camel coat in premium wool-cashmere blend. A wardrobe investment piece."
  },
  {
    id: 8,
    name: "Pearl Necklace",
    brand: "Mikimoto",
    price: 420000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1599643478518-a530e6b1e9b8?q=80&w=1887&auto=format&fit=crop",
    badge: "trending",
    badgeText: "Trending",
    description: "Akoya pearl strand with 18k gold clasp. Exceptional luster and perfectly matched."
  }
];

// ============ Format Price in Naira ============
function formatNaira(price) {
  return '₦' + price.toLocaleString('en-NG');
}

// ============ Stats Counter ============
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;
  
  function startCounting() {
    if (animated) return;
    
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      animated = true;
      
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(counter);
            // Check if this stat should show percentage
            if (stat.parentElement.querySelector('.stat-label')?.textContent.includes('%')) {
              stat.textContent = target + '%';
            } else {
              stat.textContent = target.toLocaleString('en-NG');
            }
          } else {
            stat.textContent = Math.floor(current).toLocaleString('en-NG');
          }
        }, 16);
      });
    }
  }
  
  window.addEventListener('scroll', startCounting);
  startCounting(); // Check on load
}

// ============ Product Carousel ============
function loadProducts() {
  const productCarousel = document.getElementById('productCarousel');
  if (!productCarousel) return;
  
  productCarousel.innerHTML = ''; // Clear existing
  
  productsData.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.productId = product.id;
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge ${product.badge}">${product.badgeText}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn wishlist-btn" data-product-id="${product.id}" aria-label="Add to wishlist">♡</button>
          <button class="action-btn cart-btn" data-product-id="${product.id}" aria-label="Add to cart">🛒</button>
        </div>
        <button class="quickview-btn" data-product-id="${product.id}">Quick View</button>
      </div>
      <div class="product-info">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">
          <span class="current-price">${formatNaira(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price">${formatNaira(product.originalPrice)}</span>` : ''}
        </div>
      </div>
    `;
    
    productCarousel.appendChild(productCard);
  });
  
  // Initialize carousel after products are loaded
  initCarousel();
  initProductActions();
}

// ============ Carousel Functionality ============
let currentSlide = 0;

function initCarousel() {
  const carousel = document.getElementById('productCarousel');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!carousel || !prevBtn || !nextBtn) return;
  
  function getVisibleCards() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  }
  
  function updateCarousel() {
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) return;
    
    const visibleCards = getVisibleCards();
    const cardWidth = productCards[0].offsetWidth + 24; // 24px gap (1.5rem)
    const maxSlides = productCards.length - visibleCards;
    
    if (currentSlide > maxSlides) currentSlide = maxSlides;
    if (currentSlide < 0) currentSlide = 0;
    
    carousel.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    const productCards = document.querySelectorAll('.product-card');
    const visibleCards = getVisibleCards();
    const maxSlides = productCards.length - visibleCards;
    if (currentSlide < maxSlides) {
      currentSlide++;
      updateCarousel();
    }
  });
  
  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}

// ============ Product Actions (Quickview, Cart, Wishlist) ============
let wishlist = JSON.parse(localStorage.getItem('fasNexiWishlist')) || [];
let cart = JSON.parse(localStorage.getItem('fasNexiCart')) || [];

function initProductActions() {
  // Quickview buttons
  document.querySelectorAll('.quickview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      openQuickview(productId);
    });
  });
  
  // Wishlist buttons
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const productId = parseInt(btn.dataset.productId);
    if (wishlist.includes(productId)) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(productId, btn);
    });
  });
  
  // Cart buttons
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(btn.dataset.productId);
      addToCart(productId);
    });
  });
  
  // Card click also opens quickview
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = parseInt(card.dataset.productId);
      openQuickview(productId);
    });
  });
}

function openQuickview(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  
  const quickviewBody = document.getElementById('quickviewBody');
  if (!quickviewBody) return;
  
  quickviewBody.innerHTML = `
    <div class="quickview-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="quickview-details">
      <p class="brand">${product.brand}</p>
      <h2>${product.name}</h2>
      <p class="description">${product.description}</p>
      <p class="price">${formatNaira(product.price)}</p>
      ${product.originalPrice ? `<p style="color: var(--light); text-decoration: line-through; margin-bottom: 1rem;">${formatNaira(product.originalPrice)}</p>` : ''}
      <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      <p style="color: var(--mid); font-size: 0.9rem;">Free shipping & returns</p>
    </div>
  `;
  
  const modal = document.getElementById('quickviewModal');
  if (modal) modal.classList.add('active');
  
  // Add to cart from quickview
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(productId);
    });
  }
}

function closeQuickview() {
  const modal = document.getElementById('quickviewModal');
  if (modal) modal.classList.remove('active');
}

// Quickview close events
const quickviewCloseBtn = document.getElementById('quickviewClose');
const quickviewOverlay = document.querySelector('.quickview-overlay');

if (quickviewCloseBtn) {
  quickviewCloseBtn.addEventListener('click', closeQuickview);
}
if (quickviewOverlay) {
  quickviewOverlay.addEventListener('click', closeQuickview);
}

function toggleWishlist(productId, btn) {
  const index = wishlist.indexOf(productId);
  const product = productsData.find(p => p.id === productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    btn.classList.remove('active');
    showToast(`Removed "${product.name}" from wishlist`);
  } else {
    wishlist.push(productId);
    btn.classList.add('active');
    showToast(`Added "${product.name}" to wishlist ♡`);
  }
  localStorage.setItem('fasNexiWishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity++;
    showToast(`Updated "${product.name}" quantity in cart (${existingItem.quantity})`);
  } else {
    cart.push({ productId, quantity: 1 });
    showToast(`Added "${product.name}" to cart 🛒`);
  }
  localStorage.setItem('fasNexiCart', JSON.stringify(cart));
  updateCartCount();
}

function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

function updateWishlistCount() {
  const wishlistCount = document.querySelector('.wishlist-count');
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
  }
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// ============ Initialize Everything ============
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
  loadProducts();
  updateWishlistCount();
  updateCartCount();
  
  // Close quickview on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickview();
    }
  });
});

// ============ Nigerian States & Delivery Fees ============
const nigerianStates = [
  { name: "Abia", fee: 3500 },
  { name: "Adamawa", fee: 4500 },
  { name: "Akwa Ibom", fee: 4000 },
  { name: "Anambra", fee: 3500 },
  { name: "Bauchi", fee: 4500 },
  { name: "Bayelsa", fee: 5000 },
  { name: "Benue", fee: 4000 },
  { name: "Borno", fee: 5500 },
  { name: "Cross River", fee: 4500 },
  { name: "Delta", fee: 4000 },
  { name: "Ebonyi", fee: 3800 },
  { name: "Edo", fee: 3500 },
  { name: "Ekiti", fee: 3500 },
  { name: "Enugu", fee: 3500 },
  { name: "FCT (Abuja)", fee: 3000 },
  { name: "Gombe", fee: 4500 },
  { name: "Imo", fee: 3500 },
  { name: "Jigawa", fee: 5000 },
  { name: "Kaduna", fee: 4000 },
  { name: "Kano", fee: 4000 },
  { name: "Katsina", fee: 4800 },
  { name: "Kebbi", fee: 5200 },
  { name: "Kogi", fee: 3800 },
  { name: "Kwara", fee: 3500 },
  { name: "Lagos", fee: 2500 },
  { name: "Nasarawa", fee: 3500 },
  { name: "Niger", fee: 4200 },
  { name: "Ogun", fee: 2800 },
  { name: "Ondo", fee: 3500 },
  { name: "Osun", fee: 3500 },
  { name: "Oyo", fee: 3200 },
  { name: "Plateau", fee: 4200 },
  { name: "Rivers", fee: 4000 },
  { name: "Sokoto", fee: 5500 },
  { name: "Taraba", fee: 4800 },
  { name: "Yobe", fee: 5500 },
  { name: "Zamfara", fee: 5200 }
];

const SERVICE_FEE = 1500; // Fixed service fee in Naira

// ============ Cart Modal Functions ============
function openCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (!cartModal) return;
  
  renderCartItems();
  cartModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (!cartModal) return;
  
  cartModal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');
  const cartCount = document.querySelector('.cart-item-count');
  
  if (!cartBody || !cartFooter) return;
  
  // Update cart from localStorage
  cart = JSON.parse(localStorage.getItem('fasNexiCart')) || [];
  
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some luxury pieces to get started</p>
      </div>
    `;
    cartFooter.innerHTML = '';
    if (cartCount) cartCount.textContent = '(0 items)';
    return;
  }
  
  let subtotal = 0;
  let cartHTML = '';
  
  cart.forEach(item => {
    const product = productsData.find(p => p.id === item.productId);
    if (!product) return;
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    cartHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item-details">
          <p class="cart-item-brand">${product.brand}</p>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatNaira(itemTotal)}</p>
          <div class="cart-item-actions">
            <div class="quantity-controls">
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity - 1})">−</button>
              <span class="qty-input">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${product.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartBody.innerHTML = cartHTML;
  
  if (cartCount) cartCount.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)} items)`;
  
  // Render footer with summary
  cartFooter.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatNaira(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Service Fee</span>
        <span>${formatNaira(SERVICE_FEE)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatNaira(subtotal + SERVICE_FEE)}</span>
      </div>
      <p style="font-size: 0.8rem; color: var(--mid); margin-top: 0.5rem;">* Delivery fee calculated at checkout</p>
    </div>
    <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
    <span class="continue-shopping" onclick="closeCartModal()">Continue Shopping</span>
  `;
}

function updateCartQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }
  
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('fasNexiCart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('fasNexiCart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
  showToast('Item removed from cart');
}

// ============ Wishlist Modal Functions ============
function openWishlistModal() {
  const wishlistModal = document.getElementById('wishlistModal');
  if (!wishlistModal) return;
  
  renderWishlistItems();
  wishlistModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishlistModal() {
  const wishlistModal = document.getElementById('wishlistModal');
  if (!wishlistModal) return;
  
  wishlistModal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderWishlistItems() {
  const wishlistBody = document.getElementById('wishlistBody');
  const wishlistCount = document.querySelector('.wishlist-item-count');
  
  if (!wishlistBody) return;
  
  wishlist = JSON.parse(localStorage.getItem('fasNexiWishlist')) || [];
  
  if (wishlist.length === 0) {
    wishlistBody.innerHTML = `
      <div class="empty-wishlist">
        <div class="empty-icon">♡</div>
        <p>Your wishlist is empty</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Save your favorite items for later</p>
      </div>
    `;
    if (wishlistCount) wishlistCount.textContent = '(0 items)';
    return;
  }
  
  let wishlistHTML = '';
  
  wishlist.forEach(productId => {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    wishlistHTML += `
      <div class="wishlist-item">
        <div class="wishlist-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="wishlist-item-details">
          <p class="cart-item-brand">${product.brand}</p>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatNaira(product.price)}</p>
          <div class="wishlist-item-actions">
            <button class="move-to-cart-btn" onclick="moveToCart(${product.id})">Move to Cart</button>
            <button class="remove-wishlist-btn" onclick="removeFromWishlist(${product.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });
  
  wishlistBody.innerHTML = wishlistHTML;
  if (wishlistCount) wishlistCount.textContent = `(${wishlist.length} items)`;
}

function moveToCart(productId) {
  // Add to cart
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  localStorage.setItem('fasNexiCart', JSON.stringify(cart));
  
  // Remove from wishlist
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('fasNexiWishlist', JSON.stringify(wishlist));
  
  renderWishlistItems();
  updateCartCount();
  updateWishlistCount();
  showToast('Item moved to cart');
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('fasNexiWishlist', JSON.stringify(wishlist));
  renderWishlistItems();
  updateWishlistCount();
  showToast('Item removed from wishlist');
}

// ============ Checkout Modal Functions ============
function proceedToCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  
  closeCartModal();
  renderCheckout();
  
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) {
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (!checkoutModal) return;
  
  checkoutModal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCheckout() {
  const checkoutBody = document.getElementById('checkoutBody');
  if (!checkoutBody) return;
  
  let subtotal = 0;
  cart.forEach(item => {
    const product = productsData.find(p => p.id === item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });
  
  const statesOptions = nigerianStates.map(state => 
    `<option value="${state.name}" data-fee="${state.fee}">${state.name} - ${formatNaira(state.fee)}</option>`
  ).join('');
  
  checkoutBody.innerHTML = `
    <div class="checkout-steps">
      <div class="step active">Shipping</div>
      <div class="step">Payment</div>
      <div class="step">Confirm</div>
    </div>
    
    <form class="checkout-form" id="checkoutForm" onsubmit="placeOrder(event)">
      <h3 style="font-family: var(--font-display); margin-bottom: 1rem;">Shipping Information</h3>
      
      <div class="form-row">
        <div class="form-group">
          <label>First Name *</label>
          <input type="text" id="firstName" required placeholder="Enter first name">
        </div>
        <div class="form-group">
          <label>Last Name *</label>
          <input type="text" id="lastName" required placeholder="Enter last name">
        </div>
      </div>
      
      <div class="form-group">
        <label>Email Address *</label>
        <input type="email" id="email" required placeholder="your@email.com">
      </div>
      
      <div class="form-group">
        <label>Phone Number *</label>
        <input type="tel" id="phone" required placeholder="+234 800 000 0000">
      </div>
      
      <div class="form-group">
        <label>Delivery Address *</label>
        <input type="text" id="address" required placeholder="House number, street name">
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>City *</label>
          <input type="text" id="city" required placeholder="Enter city">
        </div>
        <div class="form-group">
          <label>State *</label>
          <select id="state" required onchange="updateDeliveryFee()">
            <option value="">Select State</option>
            ${statesOptions}
          </select>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="order-item">
          <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
          <span>${formatNaira(subtotal)}</span>
        </div>
        <div class="order-item">
          <span>Service Fee</span>
          <span>${formatNaira(SERVICE_FEE)}</span>
        </div>
        <div class="order-item" id="deliveryFeeRow">
          <span>Delivery Fee</span>
          <span id="deliveryFeeDisplay">Select state</span>
        </div>
        <div class="order-item total">
          <span>Total</span>
          <span id="totalDisplay">${formatNaira(subtotal + SERVICE_FEE)}</span>
        </div>
      </div>
      
      <!-- Bank Transfer Details -->
      <div class="bank-details">
        <h4>🏦 Bank Transfer Details</h4>
        <div class="bank-info">
          <div class="bank-row">
            <span class="label">Bank</span>
            <span class="value">Access Bank Plc</span>
          </div>
          <div class="bank-row">
            <span class="label">Account Name</span>
            <span class="value">FasNexi Fashion Ltd</span>
          </div>
          <div class="bank-row">
            <span class="label">Account Number</span>
            <span class="value">0123456789</span>
          </div>
          <div class="bank-row">
            <span class="label">Reference</span>
            <span class="value" id="paymentRef">FAS-${Date.now().toString(36).toUpperCase()}</span>
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--mid); margin-top: 1rem;">
          ⚠️ Please use your name as the payment reference when making the transfer. 
          Your order will be processed once payment is confirmed.
        </p>
      </div>
      
      <button type="submit" class="place-order-btn">Place Order</button>
    </form>
  `;
  
  // Initialize delivery fee
  updateDeliveryFee();
}

function updateDeliveryFee() {
  const stateSelect = document.getElementById('state');
  const deliveryFeeDisplay = document.getElementById('deliveryFeeDisplay');
  const totalDisplay = document.getElementById('totalDisplay');
  
  if (!stateSelect || !deliveryFeeDisplay || !totalDisplay) return;
  
  let deliveryFee = 0;
  if (stateSelect.value) {
    const selectedOption = stateSelect.options[stateSelect.selectedIndex];
    deliveryFee = parseInt(selectedOption.dataset.fee) || 0;
    deliveryFeeDisplay.textContent = formatNaira(deliveryFee);
  } else {
    deliveryFeeDisplay.textContent = 'Select state';
  }
  
  // Calculate total
  let subtotal = 0;
  cart.forEach(item => {
    const product = productsData.find(p => p.id === item.productId);
    if (product) {
      subtotal += product.price * item.quantity;
    }
  });
  
  const total = subtotal + SERVICE_FEE + deliveryFee;
  totalDisplay.textContent = formatNaira(total);
}

function placeOrder(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstName')?.value;
  const lastName = document.getElementById('lastName')?.value;
  const state = document.getElementById('state')?.value;
  
  if (!firstName || !lastName || !state) {
    showToast('Please fill in all required fields');
    return;
  }
  
  // Generate order reference
  const orderRef = 'FAS-' + Date.now().toString(36).toUpperCase();
  
  // Clear cart
  cart = [];
  localStorage.setItem('fasNexiCart', JSON.stringify(cart));
  updateCartCount();
  
  // Close checkout and show success
  closeCheckoutModal();
  
  showToast(`✅ Order ${orderRef} placed successfully! Please complete your bank transfer.`);
  
  // Open cart to show it's empty
  setTimeout(() => {
    if (document.getElementById('cartModal').classList.contains('active')) {
      renderCartItems();
    }
  }, 500);
}

// ============ Event Listeners ============
document.addEventListener('DOMContentLoaded', () => {
  // Cart icon click
  const cartIcon = document.querySelector('.cart-btn');
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      openCartModal();
    });
  }
  
  // Also trigger on cart icon in nav
  const navCartBtn = document.querySelector('.nav-actions .icon-btn:nth-child(2)');
  if (navCartBtn) {
    navCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCartModal();
    });
  }
  
  // Wishlist icon click
  const wishlistIcon = document.querySelector('.nav-actions .icon-btn:nth-child(1)');
  if (wishlistIcon) {
    wishlistIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      openWishlistModal();
    });
  }
  
  // Close modals
  document.getElementById('cartClose')?.addEventListener('click', closeCartModal);
  document.getElementById('wishlistClose')?.addEventListener('click', closeWishlistModal);
  document.getElementById('checkoutClose')?.addEventListener('click', closeCheckoutModal);
  
  document.querySelector('.cart-overlay')?.addEventListener('click', closeCartModal);
  document.querySelector('.wishlist-overlay')?.addEventListener('click', closeWishlistModal);
  document.querySelector('.checkout-overlay')?.addEventListener('click', closeCheckoutModal);
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartModal();
      closeWishlistModal();
      closeCheckoutModal();
      closeQuickview();
    }
  });
});

// ============ Collection Products Data ============
const collectionProducts = [
  {
    id: 101,
    name: "Òṣùpá Evening Gown",
    price: 450000,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1888&auto=format&fit=crop",
    description: "Floor-length silk gown with hand-beaded moon phases"
  },
  {
    id: 102,
    name: "Adire Blazer Set",
    price: 280000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1880&auto=format&fit=crop",
    description: "Tailored blazer and trousers in indigo Adire"
  },
  {
    id: 103,
    name: "Moonlight Kaftan",
    price: 195000,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1887&auto=format&fit=crop",
    description: "Flowing silk kaftan with crystal embellishments"
  },
  {
    id: 104,
    name: "Yoruba Pearl Top",
    price: 165000,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a20?q=80&w=1740&auto=format&fit=crop",
    description: "Hand-embroidered top with freshwater pearls"
  },
  {
    id: 105,
    name: "Adire Midi Dress",
    price: 220000,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1892&auto=format&fit=crop",
    description: "Contemporary midi dress in hand-dyed Adire"
  },
  {
    id: 106,
    name: "Beaded Headpiece",
    price: 85000,
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1887&auto=format&fit=crop",
    description: "Intricate beadwork crown with crystal drops"
  }
];

// ============ Portfolio Modal Functions ============
function openPortfolioModal() {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;
  
  // Reset to first tab
  switchPortfolioTab('about', document.querySelector('.portfolio-tab'));
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
  const modal = document.getElementById('portfolioModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function switchPortfolioTab(tabName, btnElement) {
  // Update active tab button
  document.querySelectorAll('.portfolio-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  }
  
  // Show corresponding content
  document.querySelectorAll('.portfolio-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const targetContent = document.getElementById(`tab-${tabName}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

// ============ Collection Modal Functions ============
function openCollectionModal() {
  const modal = document.getElementById('collectionModal');
  if (!modal) return;
  
  renderCollectionProducts();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCollectionModal() {
  const modal = document.getElementById('collectionModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderCollectionProducts() {
  const productsGrid = document.getElementById('collectionProducts');
  if (!productsGrid) return;
  
  let productsHTML = '';
  
  collectionProducts.forEach(product => {
    productsHTML += `
      <div class="collection-product-card">
        <div class="collection-product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="collection-product-info">
          <h4>${product.name}</h4>
          <p class="price">${formatNaira(product.price)}</p>
          <button class="collection-add-btn" onclick="addCollectionToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
  });
  
  productsGrid.innerHTML = productsHTML;
}

function addCollectionToCart(productId) {
  const product = collectionProducts.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity++;
    showToast(`Updated "${product.name}" quantity in cart`);
  } else {
    cart.push({ productId, quantity: 1, isCollection: true });
    showToast(`Added "${product.name}" to cart 🛒`);
  }
  
  localStorage.setItem('fasNexiCart', JSON.stringify(cart));
  updateCartCount();
}

// Update the existing addToCart function to handle collection products
const originalAddToCart = addToCart;
addToCart = function(productId) {
  // Check if it's a collection product
  const collectionProduct = collectionProducts.find(p => p.id === productId);
  if (collectionProduct) {
    addCollectionToCart(productId);
    return;
  }
  // Otherwise use original function
  originalAddToCart(productId);
};

// Update renderCartItems to handle collection products
const originalRenderCartItems = renderCartItems;
renderCartItems = function() {
  const cartBody = document.getElementById('cartBody');
  const cartFooter = document.getElementById('cartFooter');
  const cartCount = document.querySelector('.cart-item-count');
  
  if (!cartBody || !cartFooter) return;
  
  cart = JSON.parse(localStorage.getItem('fasNexiCart')) || [];
  
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some luxury pieces to get started</p>
      </div>
    `;
    cartFooter.innerHTML = '';
    if (cartCount) cartCount.textContent = '(0 items)';
    return;
  }
  
  let subtotal = 0;
  let cartHTML = '';
  
  cart.forEach(item => {
    // Check both regular products and collection products
    let product = productsData.find(p => p.id === item.productId);
    if (!product) {
      product = collectionProducts.find(p => p.id === item.productId);
    }
    if (!product) return;
    
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    
    cartHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="cart-item-details">
          <p class="cart-item-brand">${product.brand || 'AMŌ Studio'}</p>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatNaira(itemTotal)}</p>
          <div class="cart-item-actions">
            <div class="quantity-controls">
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity - 1})">−</button>
              <span class="qty-input">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${product.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  });
  
  cartBody.innerHTML = cartHTML;
  
  if (cartCount) cartCount.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)} items)`;
  
  cartFooter.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>${formatNaira(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Service Fee</span>
        <span>${formatNaira(SERVICE_FEE)}</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>${formatNaira(subtotal + SERVICE_FEE)}</span>
      </div>
      <p style="font-size: 0.8rem; color: var(--mid); margin-top: 0.5rem;">* Delivery fee calculated at checkout</p>
    </div>
    <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
    <span class="continue-shopping" onclick="closeCartModal()">Continue Shopping</span>
  `;
};

// ============ Countdown Timer ============
function startCountdown() {
  // Set countdown to 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(23, 59, 59, 0);
  
  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) {
      // Reset countdown
      endDate.setDate(endDate.getDate() + 7);
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('countdownDays');
    const hoursEl = document.getElementById('countdownHours');
    const minutesEl = document.getElementById('countdownMinutes');
    const secondsEl = document.getElementById('countdownSeconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ============ Sticky Ad Bar ============
function initStickyBar() {
  const stickyBar = document.getElementById('adStickyBar');
  if (!stickyBar) return;
  
  let lastScrollY = window.scrollY;
  let showTimer = null;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Show after scrolling past 1000px and scrolling up
    if (currentScrollY > 1000 && currentScrollY < lastScrollY) {
      if (showTimer) clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        stickyBar.classList.add('visible');
      }, 300);
    } else if (currentScrollY < 500 || currentScrollY > lastScrollY + 50) {
      stickyBar.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
  });
}

function closeStickyBar() {
  const stickyBar = document.getElementById('adStickyBar');
  if (stickyBar) {
    stickyBar.classList.remove('visible');
    // Don't show again for this session
    sessionStorage.setItem('stickyBarClosed', 'true');
  }
}

// ============ Ad Click Handler ============
function handleAdClick(type) {
  switch(type) {
    case 'sale':
      showToast('🎉 Redirecting to Sale Page...');
      // window.location.href = '/sale';
      break;
    case 'collections':
      showToast('👗 Loading Designer Collections...');
      break;
    case 'new-arrivals':
      showToast('✨ Browsing New Arrivals...');
      break;
    case 'custom':
      showToast('📏 Opening Custom Tailoring...');
      break;
    case 'thrift':
      showToast('🔍 Exploring Thrift Finds...');
      break;
    case 'shipping':
      showToast('📦 Loading Shipping Information...');
      break;
    case 'flash-sale':
      showToast('⚡ Flash Sale - Use code THRIFT30 at checkout!');
      break;
    default:
      break;
  }
}

// ============ Newsletter Subscription ============
function subscribeNewsletter() {
  const emailInput = document.getElementById('newsletterEmail');
  if (!emailInput) return;
  
  const email = emailInput.value.trim();
  
  if (!email) {
    showToast('⚠️ Please enter your email address');
    return;
  }
  
  if (!isValidEmail(email)) {
    showToast('⚠️ Please enter a valid email address');
    return;
  }
  
  // Simulate subscription
  showToast('🎉 Welcome to FasNexi! Check your email for your ₦10,000 discount code.');
  emailInput.value = '';
  
  // Store in localStorage
  const subscribers = JSON.parse(localStorage.getItem('fasNexiSubscribers')) || [];
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    localStorage.setItem('fasNexiSubscribers', JSON.stringify(subscribers));
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============ Initialize Ad Section ============
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  initStickyBar();
  
  // Check if sticky bar was closed earlier
  if (sessionStorage.getItem('stickyBarClosed') === 'true') {
    const stickyBar = document.getElementById('adStickyBar');
    if (stickyBar) {
      stickyBar.classList.remove('visible');
    }
  }
  
  // Newsletter form submit on Enter key
  const newsletterInput = document.getElementById('newsletterEmail');
  if (newsletterInput) {
    newsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        subscribeNewsletter();
      }
    });
  }
});
// ============ Virtual Fashion Shows JavaScript ============

// Filter Shows
function filterShows(category, btnElement) {
  // Update active button
  document.querySelectorAll('.virtual-filter').forEach(btn => {
    btn.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  }
  
  // Filter cards
  const cards = document.querySelectorAll('.virtual-show-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Open Video Modal
function openVideoModal(videoId, title, description, views, badge) {
  const modal = document.getElementById('videoModal');
  if (!modal) return;
  
  // Update modal content
  document.getElementById('videoModalTitle').textContent = title;
  document.getElementById('videoDescription').textContent = description;
  document.getElementById('videoViews').textContent = '👁 ' + views;
  
  const badgeElement = document.getElementById('videoModalBadge');
  badgeElement.textContent = badge;
  
  // Style badge based on type
  if (badge.includes('LIVE')) {
    badgeElement.style.background = 'var(--red)';
  } else if (badge.includes('Upcoming')) {
    badgeElement.style.background = 'var(--yellow)';
    badgeElement.style.color = 'var(--off-black)';
  } else {
    badgeElement.style.background = 'rgba(255,255,255,0.15)';
    badgeElement.style.color = 'white';
  }
  
  // Reset to description tab
  switchVideoTab('description', document.querySelector('.video-info-tab'));
  
  // Load YouTube video (using placeholder for demo)
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
    </iframe>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Video Modal
function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Stop video by clearing iframe
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.innerHTML = `
    <div class="video-placeholder">
      <div class="video-placeholder-content">
        <span class="video-placeholder-icon">🎬</span>
        <p>Click play to start watching</p>
      </div>
    </div>
  `;
}

// Switch Video Info Tab
function switchVideoTab(tabName, btnElement) {
  // Update active tab button
  document.querySelectorAll('.video-info-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  }
  
  // Show corresponding content
  document.querySelectorAll('.video-tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  const targetContent = document.getElementById(`videoTab-${tabName}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
}

// Video Controls
let isPlaying = false;

function togglePlayPause() {
  isPlaying = !isPlaying;
  const icon = document.getElementById('playPauseIcon');
  if (icon) {
    icon.textContent = isPlaying ? '⏸' : '▶';
  }
}

function seekVideo(seconds) {
  showToast(`⏩ Skipped ${seconds > 0 ? 'forward' : 'backward'} ${Math.abs(seconds)} seconds`);
  // In real implementation, would seek the YouTube player
}

function toggleTheaterMode() {
  const modal = document.querySelector('.video-modal-content');
  if (modal) {
    modal.classList.toggle('theater-mode');
  }
}

function toggleFullscreen() {
  const videoPlayer = document.getElementById('videoPlayer');
  if (videoPlayer) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoPlayer.requestFullscreen();
    }
  }
}

function toggleMute() {
  showToast('🔇 Audio toggled');
}

function adjustVolume(value) {
  // In real implementation, would adjust YouTube player volume
}

// Chat Functions
function sendChatMessage(event) {
  if (event && event.key && event.key !== 'Enter') return;
  
  const input = document.getElementById('chatInput');
  if (!input) return;
  
  const message = input.value.trim();
  if (!message) return;
  
  const chatMessages = document.getElementById('videoChatMessages');
  if (!chatMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message';
  messageElement.innerHTML = `
    <span class="chat-user">You</span>
    <span class="chat-text">${message}</span>
  `;
  
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  input.value = '';
}

// Additional Functions
function setReminder(showName) {
  showToast(`🔔 Reminder set for "${showName}"! You'll be notified before the show starts.`);
}

function shareShow(showName) {
  if (navigator.share) {
    navigator.share({
      title: showName,
      text: `Check out ${showName} on FasNexi!`,
      url: window.location.href
    });
  } else {
    showToast(`📤 Share link copied for "${showName}"!`);
  }
}

function addToWatchlist(showName) {
  const watchlist = JSON.parse(localStorage.getItem('fasNexiWatchlist')) || [];
  if (!watchlist.includes(showName)) {
    watchlist.push(showName);
    localStorage.setItem('fasNexiWatchlist', JSON.stringify(watchlist));
    showToast(`📋 "${showName}" added to your watchlist!`);
  } else {
    showToast(`"${showName}" is already in your watchlist`);
  }
}

function shopLook(lookId) {
  showToast(`🛍️ Opening Look #${lookId} for shopping...`);
}

function shopCollection() {
  showToast('🛍️ Opening collection shop...');
  closeVideoModal();
  openCollectionModal();
}

function viewDesigners(showName) {
  showToast(`👥 Loading designers for ${showName}...`);
}

function loadMoreShows() {
  showToast('📺 Loading more shows...');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Close video modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
    }
  });
});

// ============ Blog Articles JavaScript ============

// Blog article data
const blogArticles = {
  'sustainable-fashion-africa': {
    title: 'The Rise of Sustainable Luxury in African Fashion',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1886&auto=format&fit=crop',
    author: 'Chioma Adebayo',
    date: 'May 28, 2026',
    readTime: '8 min read',
    content: `
      <p>The African fashion landscape is undergoing a remarkable transformation. What was once dominated by fast fashion imports is now being reshaped by a new generation of designers who are putting sustainability at the heart of their creative process.</p>
      
      <p>At the forefront of this movement is a growing community of Nigerian designers who are reimagining traditional textiles through an eco-conscious lens. From organic cotton farming in Kano to natural indigo dyeing techniques passed down through generations in Abeokuta, the supply chain is becoming increasingly transparent and ethical.</p>
      
      <blockquote>"Sustainability isn't a trend for us—it's embedded in our heritage. Our grandmothers practiced zero-waste fashion long before it became a buzzword." <br>— Amina Okechukwu, AMŌ Studio</blockquote>
      
      <p>The numbers tell a compelling story. According to the African Fashion Council, sustainable fashion brands in Nigeria have seen a 150% increase in consumer demand over the past two years. International retailers are taking notice, with major department stores in London, Paris, and New York seeking out African sustainable luxury brands.</p>
      
      <h3>Innovative Approaches to Traditional Materials</h3>
      
      <p>Designers are finding creative ways to honor tradition while embracing sustainability. Lisa Folawiyo has pioneered the use of organic Ankara prints, while Tokyo James incorporates recycled polyester made from ocean plastics into his avant-garde designs.</p>
      
      <p>The Adire Workshop Collective in Lagos has trained over 200 women in natural dyeing techniques, creating a sustainable ecosystem that supports local communities while preserving cultural heritage. Each piece tells a story of craftsmanship, community, and conscious consumption.</p>
      
      <h3>The Future of African Sustainable Luxury</h3>
      
      <p>As consumers become more environmentally conscious, the demand for sustainable luxury is only expected to grow. African designers are uniquely positioned to lead this global conversation, armed with centuries of textile traditions and a deep connection to their materials.</p>
      
      <p>With investment in sustainable infrastructure, education, and international market access, African fashion has the potential to become the gold standard for ethical luxury worldwide.</p>
    `
  },
  'styling-adire-modern-wardrobe': {
    title: 'How to Style Adire: From Traditional to Contemporary',
    category: 'Style Guide',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1740&auto=format&fit=crop',
    author: 'Emeka Nwosu',
    date: 'May 25, 2026',
    readTime: '6 min read',
    content: `
      <p>Adire, the iconic indigo-dyed fabric from Southwestern Nigeria, has evolved from ceremonial wear to a versatile fashion staple. Whether you're attending a formal event or heading to brunch, here's how to incorporate this beautiful textile into your everyday wardrobe.</p>
      
      <blockquote>"Adire is not just fabric—it's wearable art. Each pattern tells a story, and each piece is unique." <br>— Emeka Nwosu, Style Consultant</blockquote>
      
      <h3>Office Elegance</h3>
      
      <p>For a professional setting, opt for a tailored Adire blazer paired with solid-colored trousers or a pencil skirt. The key is to let the Adire be the statement piece while keeping accessories minimal. A simple pair of nude heels and gold jewelry completes the look.</p>
      
      <h3>Casual Chic</h3>
      
      <p>Weekend styling calls for an Adire midi dress or a matching two-piece set. Pair with white sneakers for a fresh, modern look, or dress it up with strappy sandals for a lunch date. Denim jackets also make excellent companions to Adire pieces.</p>
      
      <h3>Evening Glamour</h3>
      
      <p>For special occasions, an Adire floor-length gown with strategic cutouts and modern silhouettes turns heads. Accessorize with statement earrings and a metallic clutch. The deep indigo tones photograph beautifully under evening lights.</p>
      
      <p>Remember, the beauty of Adire lies in its imperfections—each piece is handcrafted, making it uniquely yours.</p>
    `
  },
  'lagos-fashion-week-behind-scenes': {
    title: 'Behind the Seams: A Day at Lagos Fashion Week 2026',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1740&auto=format&fit=crop',
    author: 'Fatima Ibrahim',
    date: 'May 20, 2026',
    readTime: '10 min read',
    content: `
      <p>It's 4:30 AM at the Eko Convention Centre, and the air is electric with anticipation. In less than 12 hours, the biggest names in African fashion will send their collections down the runway. But before the lights, cameras, and applause, there's organized chaos.</p>
      
      <blockquote>"Fashion week is 1% glamour and 99% adrenaline, coffee, and last-minute miracles." <br>— Fatima Ibrahim, Senior Correspondent</blockquote>
      
      <h3>The Calm Before the Storm</h3>
      
      <p>Backstage is a whirlwind of activity. Makeup artists set up their stations while hairstylists unpack their tools. Racks of garments are being steamed, shoes are being sorted by size, and models are checking in for their call times.</p>
      
      <h3>Designer Moments</h3>
      
      <p>We caught up with Amina Okechukwu as she made final adjustments to her Oṣùpá collection. "Every stitch, every bead—it all matters," she says, pinning a hem with surgical precision. "This collection represents two years of work with artisans from three different communities."</p>
      
      <h3>Showtime</h3>
      
      <p>When the lights dim and the music starts, all the chaos transforms into magic. Models glide down the runway, showcasing creations that blend centuries of tradition with cutting-edge design. The audience—a mix of buyers, celebrities, and fashion enthusiasts—erupts in applause.</p>
      
      <p>As the final designer takes their bow, there's a palpable sense of pride. African fashion has arrived on the global stage, and it's here to stay.</p>
    `
  }
};

// Bookmark article
function bookmarkArticle(articleId) {
  const bookmarks = JSON.parse(localStorage.getItem('fasNexiBookmarks')) || [];
  const index = bookmarks.indexOf(articleId);
  
  if (index > -1) {
    bookmarks.splice(index, 1);
    showToast('🔖 Article removed from bookmarks');
  } else {
    bookmarks.push(articleId);
    showToast('🔖 Article saved to bookmarks');
  }
  
  localStorage.setItem('fasNexiBookmarks', JSON.stringify(bookmarks));
  updateBookmarkButtons();
}

function updateBookmarkButtons() {
  const bookmarks = JSON.parse(localStorage.getItem('fasNexiBookmarks')) || [];
  document.querySelectorAll('.blog-bookmark').forEach(btn => {
    const articleId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (articleId && bookmarks.includes(articleId)) {
      btn.classList.add('saved');
      btn.querySelector('.bookmark-icon').textContent = '🔖✓';
    } else {
      btn.classList.remove('saved');
      btn.querySelector('.bookmark-icon').textContent = '🔖';
    }
  });
}

// Open blog article modal
function openBlogArticle(articleId) {
  const article = blogArticles[articleId];
  if (!article) return;
  
  const modal = document.getElementById('blogModal');
  const modalBody = document.getElementById('blogModalBody');
  
  if (!modal || !modalBody) return;
  
  modalBody.innerHTML = `
    <div class="blog-article-header">
      <span class="blog-category">${article.category}</span>
      <h2>${article.title}</h2>
      <div class="blog-meta">
        <span>👤 ${article.author}</span>
        <span>📅 ${article.date}</span>
        <span>⏱ ${article.readTime}</span>
      </div>
    </div>
    <img src="${article.image}" alt="${article.title}" class="blog-article-image">
    <div class="blog-article-content">
      ${article.content}
    </div>
    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--pale); display: flex; gap: 1rem;">
      <button class="video-footer-btn primary" onclick="shareArticle('${articleId}')" style="background: var(--green-dark); border-color: var(--green-dark); color: white;">
        📤 Share Article
      </button>
      <button class="video-footer-btn" onclick="bookmarkArticle('${articleId}')" style="border-color: var(--mid); color: var(--charcoal);">
        🔖 Bookmark
      </button>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close blog article modal
function closeBlogArticle() {
  const modal = document.getElementById('blogModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Share article
function shareArticle(articleId) {
  const article = blogArticles[articleId];
  if (!article) return;
  
  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: `Check out this article on FasNexi: ${article.title}`,
      url: window.location.href
    });
  } else {
    showToast('📤 Link copied to clipboard!');
  }
}

// Subscribe to blog newsletter
function subscribeBlogNewsletter() {
  const emailInput = document.getElementById('blogNewsletterEmail');
  if (!emailInput) return;
  
  const email = emailInput.value.trim();
  
  if (!email) {
    showToast('⚠️ Please enter your email address');
    return;
  }
  
  if (!isValidEmail(email)) {
    showToast('⚠️ Please enter a valid email address');
    return;
  }
  
  showToast('💌 Welcome to the FasNexi Style Journal! Check your inbox.');
  emailInput.value = '';
}

// ============ Footer JavaScript ============

// Scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Download app
function downloadApp(platform) {
  if (platform === 'ios') {
    showToast('📱 Opening App Store...');
  } else {
    showToast('📱 Opening Google Play Store...');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateBookmarkButtons();
  
  // Close blog modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBlogArticle();
    }
  });
  
  // Blog newsletter Enter key support
  const blogNewsletterInput = document.getElementById('blogNewsletterEmail');
  if (blogNewsletterInput) {
    blogNewsletterInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        subscribeBlogNewsletter();
      }
    });
  }
});