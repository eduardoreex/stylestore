// StyleStore - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});

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