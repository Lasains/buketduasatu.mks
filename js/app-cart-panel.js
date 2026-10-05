(function (app) {

  'use strict';

  const loadCart = (...args) => app.loadCart(...args);

  const openOrderForm = (...args) => app.openOrderForm(...args);

  const renderCart = (...args) => app.renderCart(...args);

  const showToast = (...args) => app.showToast(...args);

  const trapFocus = (...args) => app.trapFocus(...args);

  function initCart() {
    loadCart();
    renderCart();

    document.getElementById('btn-cart').addEventListener('click', openCart);
    document.getElementById('btn-close-cart').addEventListener('click', closeCart);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);

    document.getElementById('btn-checkout').addEventListener('click', () => {
      if (app.cart.length === 0) {
        showToast('Keranjang belanja kosong', 'error');
        return;
      }

      const hasUnavailable = app.cart.some(item => item.tersedia === false);
      if (hasUnavailable) {
        showToast('Hapus produk yang tidak tersedia untuk melanjutkan', 'error');
        return;
      }

      closeCart();
      openOrderForm();
    });
  }

  function openCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');

    overlay.classList.remove('hidden');
    // Allow reflow
    void overlay.offsetWidth;
    overlay.classList.add('opacity-100');

    panel.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    trapFocus(panel);
  }

  function closeCart() {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');

    panel.classList.remove('open');
    overlay.classList.remove('opacity-100');

    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300); // match transition

    document.body.style.overflow = '';

    if (app.activeModal === 'app.cart') {
      app.activeModal = null;
    }
  }

  Object.assign(app, { initCart, openCart, closeCart });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
