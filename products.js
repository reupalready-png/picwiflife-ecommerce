// Premium Pet Products Database
const products = [
    {
        id: 1,
        name: "Premium Leather Leash",
        category: "leashes",
        price: 34.99,
        image: "https://via.placeholder.com/300x300?text=Premium+Leather+Leash",
        description: "Genuine leather leash with comfortable grip. Adjustable length from 4-6 feet. Perfect for dogs of all sizes.",
        stock: 25,
        rating: 5,
        reviews: 48,
        specs: ["100% Genuine Leather", "Adjustable 4-6 feet", "Stainless Steel Hardware", "Hand-stitched"]
    },
    {
        id: 2,
        name: "Organic Pet Wipes",
        category: "grooming",
        price: 12.99,
        image: "https://via.placeholder.com/300x300?text=Organic+Pet+Wipes",
        description: "Hypoallergenic, chemical-free wipes for daily pet cleaning. Gentle on sensitive skin. Pack of 100 wipes.",
        stock: 50,
        rating: 5,
        reviews: 82,
        specs: ["100% Organic Cotton", "Hypoallergenic", "Pack of 100", "Biodegradable"]
    },
    {
        id: 3,
        name: "Luxury Pet Bed - King Size",
        category: "furniture",
        price: 89.99,
        image: "https://via.placeholder.com/300x300?text=Luxury+Pet+Bed",
        description: "Plush orthopedic pet bed with memory foam. Machine washable cover. Sizes available for all pets.",
        stock: 15,
        rating: 5,
        reviews: 156,
        specs: ["Memory Foam Core", "Removable Cover", "Machine Washable", "King Size 36x48 inch"]
    },
    {
        id: 4,
        name: "Interactive Toy Set",
        category: "toys",
        price: 24.99,
        image: "https://via.placeholder.com/300x300?text=Interactive+Toy+Set",
        description: "5-piece interactive toy set with bells, squeakers, and crinkle sounds. Great for mental stimulation.",
        stock: 40,
        rating: 4.5,
        reviews: 93,
        specs: ["5 Different Toys", "Mental Stimulation", "Safe Materials", "For Cats & Small Dogs"]
    },
    {
        id: 5,
        name: "Premium Car Pet Cloth",
        category: "accessories",
        price: 44.99,
        image: "https://via.placeholder.com/300x300?text=Car+Pet+Cloth",
        description: "Durable, waterproof car seat cover designed for pets. Protects your vehicle while keeping pets safe and secure.",
        stock: 22,
        rating: 5,
        reviews: 67,
        specs: ["100% Waterproof", "Non-Slip Bottom", "Universal Fit", "Machine Washable"]
    },
    {
        id: 6,
        name: "Stainless Steel Food Bowls",
        category: "accessories",
        price: 19.99,
        image: "https://via.placeholder.com/300x300?text=Food+Bowls",
        description: "Set of 2 premium stainless steel bowls. Non-slip rubber base. Easy to clean and durable.",
        stock: 35,
        rating: 4.8,
        reviews: 124,
        specs: ["Stainless Steel", "Set of 2", "Non-Slip Base", "Easy to Clean"]
    },
    {
        id: 7,
        name: "Professional Grooming Brush",
        category: "grooming",
        price: 29.99,
        image: "https://via.placeholder.com/300x300?text=Grooming+Brush",
        description: "Professional-grade grooming brush designed for all coat types. Reduces shedding by up to 90%.",
        stock: 28,
        rating: 5,
        reviews: 178,
        specs: ["Professional Grade", "All Coat Types", "Reduces Shedding 90%", "Ergonomic Handle"]
    },
    {
        id: 8,
        name: "Cozy Pet Blanket",
        category: "furniture",
        price: 39.99,
        image: "https://via.placeholder.com/300x300?text=Cozy+Pet+Blanket",
        description: "Ultra-soft fleece blanket perfect for bedding, couches, or car use. Washable and durable.",
        stock: 32,
        rating: 4.9,
        reviews: 91,
        specs: ["Ultra-Soft Fleece", "Washable", "Lightweight", "Multiple Colors Available"]
    },
    {
        id: 9,
        name: "Premium Retractable Leash",
        category: "leashes",
        price: 27.99,
        image: "https://via.placeholder.com/300x300?text=Retractable+Leash",
        description: "Ergonomic retractable leash with 16-foot range. Anti-slip handle with one-hand braking system.",
        stock: 45,
        rating: 4.7,
        reviews: 134,
        specs: ["16-Foot Range", "Anti-Slip Handle", "One-Hand Brake", "Durable Nylon"]
    },
    {
        id: 10,
        name: "Organic Pet Treats Box",
        category: "grooming",
        price: 22.99,
        image: "https://via.placeholder.com/300x300?text=Pet+Treats",
        description: "Assorted organic pet treats. No artificial ingredients, preservatives, or GMOs. Healthy & delicious.",
        stock: 55,
        rating: 5,
        reviews: 203,
        specs: ["100% Organic", "No Artificial Ingredients", "Assorted Flavors", "150g Box"]
    }
];

// Load products to the grid
function loadProducts(filter = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    let filtered = products;
    if (filter !== 'all') {
        filtered = products.filter(p => p.category === filter);
    }

    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="product-label">PREMIUM</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating-small">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <p class="description">${product.description.substring(0, 80)}...</p>
                <div class="product-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="view-btn" onclick="viewProduct(${product.id})">View Details</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// View product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('detail-image').src = product.image;
    document.getElementById('detail-title').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-price').textContent = product.price.toFixed(2);
    document.getElementById('detail-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('detail-stock').textContent = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
    document.getElementById('detail-rating').textContent = '⭐'.repeat(Math.floor(product.rating)) + '✨';
    document.getElementById('detail-reviews').textContent = `(${product.reviews} reviews)`;
    document.getElementById('quantity-input').value = 1;
    document.getElementById('quantity-input').max = product.stock;

    // Store current product for cart addition
    window.currentProduct = product;

    // Show modal
    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            loadProducts(filter);
        });
    });
});