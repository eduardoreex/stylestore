import { Header } from './components/Header.js';
import { products } from './api/products.js';

// Simulador de Rotas
const routes = {
    '/': { title: 'Home', render: renderHome },
    '/catalogo': { title: 'Coleção Completa', render: renderCatalog },
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
    
    // Scroll para o topo ao mudar de rota
    window.scrollTo(0, 0);
};

// --- VIEWS (Funções que geram o conteúdo de cada página) ---

function renderHome() {
    return `
        <section class="hero-simple">
            <div class="container">
                <h1>Elegância Sem Limites</h1>
                <p>A nova coleção de alfaiataria moderna chegou.</p>
                <a href="/catalogo" data-link class="btn-primary">VER COLEÇÃO</a>
            </div>
        </section>
    `;
}

function renderCatalog(filterCategory = null) {
    return `
        <section class="catalog-page">
            <div class="container">
                <h2>${filterCategory ? filterCategory : 'Toda a Coleção'}</h2>
                <div class="catalog-status">Mostrando produtos premium selecionados.</div>
                <div id="product-list" class="product-grid-refined">
                    <!-- Será populado na Fase 3 -->
                    <p style="color: #aaa;">Carregando catálogo...</p>
                </div>
            </div>
        </section>
    `;
}

// --- INICIALIZAÇÃO ---
window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza Header e Footer fixos
    document.getElementById('header-root').innerHTML = Header();
    
    // Intercepta cliques para navegação SPA
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
            e.preventDefault();
            const url = e.target.closest('[data-link]').getAttribute('href');
            navigateTo(url);
        }
    });

    router();
});
