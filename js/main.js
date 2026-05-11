// StyleStore - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderProducts();
    initCart();
});

// Banco de Dados de Produtos
const products = [
    {
        id: 1,
        name: "Camisa Slim Premium White",
        category: "Camisas",
        price: 199.90,
        oldPrice: 259.00,
        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        discount: 23,
        rating: 5,
        colors: ["#ffffff", "#000000"],
        sizes: ["P", "M", "G"]
    },
    {
        id: 2,
        name: "Terno Italiano Nero",
        category: "Ternos",
        price: 899.00,
        oldPrice: 1200.00,
        img: "https://images.unsplash.com/photo-1594932224456-749718364b4b?auto=format&fit=crop&q=80&w=800",
        discount: 25,
        rating: 5,
        colors: ["#000000"],
        sizes: ["M", "G", "GG"]
    },
    {
        id: 3,
        name: "Oxford Leather Brown",
        category: "Calçados",
        price: 349.90,
        oldPrice: null,
        img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
        discount: 0,
        rating: 4,
        colors: ["#5d4037"],
        sizes: ["39", "40", "41", "42"]
    },
    {
        id: 4,
        name: "Calça Chino Khaki",
        category: "Calças",
        price: 159.90,
        oldPrice: 189.00,
        img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
        discount: 15,
        rating: 4,
        colors: ["#c3b091"],
        sizes: ["38", "40", "42", "44"]
    }
];

// Estado do Carrinho
let cart = [];

// Renderização dos Produtos
function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-thumb">
                ${product.discount > 0 ? `<span class="badge">${product.discount}% OFF</span>` : ''}
                <img src="${product.img}" alt="${product.name}">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> ADICIONAR AO CARRINHO
                </button>
            </div>
            <div class="product-info">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${Array(5).fill().map((_, i) => `<i class="${i < product.rating ? 'fas' : 'far'} fa-star"></i>`).join('')}
                </div>
                <div class="product-price">
                    ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                    <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Lógica do Carrinho
function initCart() {
    const openCartBtn = document.getElementById('open-cart');
    const closeCartBtn = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');

    const toggleCart = () => {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : 'auto';
    };

    openCartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    continueShoppingBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Newsletter Feedback
    const newsForm = document.querySelector('.newsletter-form');
    newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsForm.querySelector('input').value;
        alert(`Obrigado! O e-mail ${email} foi cadastrado com sucesso.`);
        newsForm.reset();
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartCount = document.querySelector('.cart-count');
    const totalDisplay = document.getElementById('cart-total-value');

    // Atualiza contador do ícone com efeito visual
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Efeito Bump
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 300);

    // Atualiza lista de itens
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart-msg">Seu carrinho está vazio.</div>';
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="price">R$ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="far fa-trash-alt"></i>
                </div>
            </div>
        `).join('');
    }

    // Atualiza total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Controle do Header ao rolar a página
function initHeader() {
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll-active');
        } else {
            header.classList.remove('scroll-active');
        }
    });
}