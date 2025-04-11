document.addEventListener('DOMContentLoaded', cartCounter);

function addToCart(productId) {
    const products = JSON.parse(localStorage.getItem("items")) || [];
    const product = products.find(p => p.id === Number(productId))

    if (product) {
        let cart = loadCartFromStorage();
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        saveCartToStorage(cart);
        cartCounter();
    }
}

function saveCartToStorage(items) {
    localStorage.setItem('cart',JSON.stringify(items));
}

function loadCartFromStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
function cartCounter() {

    const cart = loadCartFromStorage();
    const totalQuantity = cart.reduce((total, item) => {
        return total + (item.quantity);}, 0);

    const cartCount = document.querySelector('.cart-counter');

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }
}
