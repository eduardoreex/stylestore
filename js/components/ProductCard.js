export const ProductCard = (product) => {
    const { id, name, price, oldPrice, images, category } = product;
    
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const discountBadge = oldPrice 
        ? `<span class="badge-off">-${Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF</span>` 
        : '';

    return `
    <div class="product-card">
        <div class="product-image">
            ${discountBadge}
            <img src="${images[0]}" alt="${name}" loading="lazy">
            <div class="product-overlay">
                <button class="btn-add-cart" data-id="${id}">
                    <i class="fas fa-shopping-bag"></i> ADICIONAR
                </button>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category">${category}</span>
            <h3 class="product-title">${name}</h3>
            <div class="product-price">
                ${oldPrice ? `<span class="old-price">${formatter.format(oldPrice)}</span>` : ''}
                <span class="current-price">${formatter.format(price)}</span>
            </div>
        </div>
    </div>
    `;
};