export const FilterService = {
    filter(products, criteria) {
        return products.filter(product => {
            const matchCategory = !criteria.category || product.category === criteria.category;
            const matchPrice = product.price <= criteria.maxPrice;
            return matchCategory && matchPrice;
        });
    }
};