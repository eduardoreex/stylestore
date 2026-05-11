export const Header = () => {
    return `
    <section class="topbar">
        <div class="container flex-between">
            <div class="topbar-socials">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
            </div>
            <div class="topbar-account">
                <a href="#"><i class="fas fa-user"></i> MINHA CONTA</a>
            </div>
        </div>
    </section>

    <header class="main-header">
        <div class="container flex-between">
            <div class="logo">
                <a href="/" data-link>SS<span>.</span></a>
            </div>

            <nav class="navbar">
                <ul class="nav-links">
                    <li><a href="/" data-link class="active">HOME</a></li>
                    <li><a href="/catalogo" data-link>COLEÇÃO</a></li>
                    <li><a href="/camisas" data-link>CAMISAS</a></li>
                    <li><a href="/ternos" data-link>TERNOS</a></li>
                </ul>
            </nav>

            <div class="header-actions">
                <div class="search-box">
                    <input type="text" placeholder="BUSCAR...">
                    <button><i class="fas fa-search"></i></button>
                </div>
                <div class="cart-icon">
                    <a href="javascript:void(0)" id="open-cart-btn">
                        <i class="fas fa-shopping-bag"></i>
                        <span class="cart-count">0</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    `;
};