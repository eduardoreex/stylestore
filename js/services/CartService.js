/**
 * CART SERVICE - Regras de negócio do carrinho
 */
export const CartService = {
    state: JSON.parse(localStorage.getItem('ss_cart')) || [],

    add(product) {
        const existing = this.state.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.state.push({ ...product, quantity: 1 });
        }
        this.save();
        this.notify();
    },

    remove(id) {
        this.state = this.state.filter(item => item.id !== id);
        this.save();
        this.notify();
    },

    updateQuantity(id, delta) {
        const item = this.state.find(item => item.id === id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) return this.remove(id);
        }
        this.save();
        this.notify();
    },

    save() {
        localStorage.setItem('ss_cart', JSON.stringify(this.state));
    },

    getTotal() {
        return this.state.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },

    getCount() {
        return this.state.reduce((acc, item) => acc + item.quantity, 0);
    },

    notify() {
        // Dispara um evento customizado para que a UI se atualize
        const event = new CustomEvent('cartUpdated', { detail: this.state });
        window.dispatchEvent(event);
    }
};