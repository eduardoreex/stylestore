/**
 * TRACKING SERVICE - Centraliza eventos de marketing (Meta Pixel, GTM, GA4)
 */
export const Tracking = {
    event(name, data = {}) {
        console.log(`[TRACKING]: ${name}`, data);
        
        // Exemplo: Disparar evento para o DataLayer do GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: name,
            ...data
        });
    },

    trackAddToCart(product) {
        this.event('add_to_cart', {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category
        });
    },

    trackLead(email) {
        this.event('newsletter_signup', { email });
    },

    trackView(pageName) {
        this.event('page_view', { page: pageName });
    }
};