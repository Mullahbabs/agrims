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