import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { ProductCard } from './components/ProductCard.js';
import { CartSidebar } from './components/CartSidebar.js';
import { products } from './api/products.js';
import { FilterService } from './services/FilterService.js';
import { CartService } from './services/CartService.js';
import { Tracking } from './services/Tracking.js';

let currentFilters = { category: null, maxPrice: 2000 };

const routes = {
    '/': { title: 'Home', render: renderHome },
    '/catalogo': { title: 'Coleção Completa', render: () => renderCatalog() },
    '/camisas': { title: 'Camisas Elite', render: () => renderCatalog('Camisas') },
    '/ternos': { title: 'Ternos & Blazers', render: () => renderCatalog('Ternos') },
};

function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    document.title = `StyleStore | ${route.title}`;
    document.getElementById('app').innerHTML = route.render();
    
    Tracking.trackView(route.title);
    
    if (path === '/' ) initHomeEvents();
    if (path.includes('catalogo') || path === '/camisas' || path === '/ternos') initCatalogEvents();
    
    window.scrollTo(0, 0);
};

// --- VIEWS ---
function renderHome() {
    return `
        <section class="hero-simple">
            <div class="container">
                <h5>PREMIUM MENSWEAR</h5>
                <h1>Elegância Sem Limites</h1>
                <p>A nova coleção de alfaiataria moderna chegou.</p>
                <a href="/catalogo" data-link class="btn-primary">VER COLEÇÃO</a>
            </div>
        </section>
        <section class="newsletter-section">
            <div class="container">
                <div class="newsletter-box">
                    <h2>ENTRE PARA O CLUBE</h2>
                    <p>Receba lançamentos exclusivos e 10% OFF na primeira compra.</p>
                    <form id="newsletter-form">
                        <input type="email" placeholder="SEU MELHOR E-MAIL" required>
                        <button type="submit" class="btn-primary">INSCREVER</button>
                    </form>
                </div>
            </div>
        </section>
    `;
}

function renderCatalog(category = null) {
    currentFilters.category = category;
    const filtered = FilterService.filter(products, currentFilters);
    return `
        <section class="catalog-page">
            <div class="container catalog-layout">
                <aside class="sidebar-filters">
                    <div class="filter-group">
                        <h3>Preço Máximo</h3>
                        <input type="range" id="price-range" min="100" max="2000" value="${currentFilters.maxPrice}">
                        <div class="price-labels"><span>R$ 100</span><span id="price-value">R$ ${currentFilters.maxPrice}</span></div>
                    </div>
                </aside>
                <div class="catalog-main">
                    <h2>${category || 'Toda a Coleção'}</h2>
                    <div class="catalog-status">${filtered.length} produtos premium encontrados</div>
                    <div id="product-grid" class="product-grid">${filtered.map(p => ProductCard(p)).join('')}</div>
                </div>
            </div>
        </section>
    `;
}

// --- EVENTS ---
function initHomeEvents() {
    const form = document.getElementById('newsletter-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        Tracking.trackLead(email);
        alert('Obrigado por se inscrever!');
        form.reset();
    });
}

function initCatalogEvents() {
    const range = document.getElementById('price-range');
    range?.addEventListener('input', (e) => {
        currentFilters.maxPrice = e.target.value;
        document.getElementById('price-value').textContent = `R$ ${e.target.value}`;
        const filtered = FilterService.filter(products, currentFilters);
        document.getElementById('product-grid').innerHTML = filtered.map(p => ProductCard(p)).join('');
    });

    document.getElementById('product-grid')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add-cart');
        if (btn) {
            const id = parseInt(btn.dataset.id);
            const product = products.find(p => p.id === id);
            CartService.add(product);
            Tracking.trackAddToCart(product);
            toggleCart();
        }
    });
}

// --- CART UI LOGIC ---
const injectCart = () => {
    let root = document.getElementById('cart-root');
    if (!root) { root = document.createElement('div'); root.id = 'cart-root'; document.body.appendChild(root); }
    root.innerHTML = CartSidebar();
    
    document.getElementById('close-cart')?.addEventListener('click', toggleCart);
    document.getElementById('cart-overlay')?.addEventListener('click', toggleCart);
    document.querySelector('.cart-items')?.addEventListener('click', (e) => {
        const id = parseInt(e.target.closest('button')?.dataset.id);
        if (e.target.closest('.remove-item')) CartService.remove(id);
        if (e.target.closest('.qty-btn')) CartService.updateQuantity(id, parseInt(e.target.closest('.qty-btn').dataset.delta));
    });
};

const toggleCart = () => {
    const s = document.getElementById('cart-sidebar');
    const o = document.getElementById('cart-overlay');
    s?.classList.toggle('active'); o?.classList.toggle('active');
    document.body.style.overflow = s?.classList.contains('active') ? 'hidden' : '';
};

window.addEventListener('cartUpdated', () => {
    injectCart();
    const b = document.querySelectorAll('.cart-count');
    b.forEach(n => { n.textContent = CartService.getCount(); n.classList.add('bump'); setTimeout(() => n.classList.remove('bump'), 300); });
});

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header-root').innerHTML = Header();
    document.getElementById('footer-root').innerHTML = Footer();
    injectCart();
    document.body.addEventListener('click', e => {
        if (e.target.closest('#open-cart-btn')) toggleCart();
        const l = e.target.closest('[data-link]');
        if (l) { e.preventDefault(); navigateTo(l.getAttribute('href')); }
    });
    router();
});
