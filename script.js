// Shopping Cart Functionality
let cart = [];

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('picwiflife-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Add item to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity-input').value);
    
    if (!window.currentProduct) return;
    
    const product = window.currentProduct;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('picwiflife-cart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    
    // Show success message
    showNotification('Product added to cart!');
    
    // Close modal
    closeModal('product-modal');
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
    
    // Update cart items display
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
                <div class="item-total">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `).join('');
    }
    
    // Update totals
    updateCartTotals();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('picwiflife-cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('picwiflife-cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Product removed from cart');
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 75 ? 0 : 9.99;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Modal Functions
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initCart();
    
    // Cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }
    
    // Close modals
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent! We\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Notification System
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});