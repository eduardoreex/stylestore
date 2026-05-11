// StyleStore - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    renderProducts();
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

function addToCart(id) {
    console.log(`Produto ${id} adicionado ao carrinho`);
    // Lógica será expandida na Etapa 5
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