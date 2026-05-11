import { CartService } from '../services/CartService.js';

export const CartSidebar = () => {
    const items = CartService.state;
    const total = CartService.getTotal();
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
    <div class="cart-overlay" id="cart-overlay"></div>
    <aside class="cart-sidebar" id="cart-sidebar">
        <div class="cart-header">
            <h3>SEU CARRINHO</h3>
            <button id="close-cart"><i class="fas fa-times"></i></button>
        </div>

        <div class="cart-items">
            ${items.length === 0 ? '<p class="empty-msg">Seu carrinho está vazio.</p>' : 
              items.map(item => `
                <div class="cart-item">
                    <img src="${item.images[0]}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <span class="item-price">${formatter.format(item.price)}</span>
                        <div class="item-qty">
                            <button class="qty-btn" data-id="${item.id}" data-delta="-1">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="far fa-trash-alt"></i></button>
                </div>
            `).join('')}
        </div>

        <div class="cart-footer">
            <div class="total-row">
                <span>TOTAL:</span>
                <span class="total-price">${formatter.format(total)}</span>
            </div>
            <button class="btn-checkout" ${items.length === 0 ? 'disabled' : ''}>FINALIZAR COMPRA</button>
        </div>
    </aside>
    `;
};