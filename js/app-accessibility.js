(function (app) {

  'use strict';

  const closeCart = (...args) => app.closeCart(...args);

  const closeOrderForm = (...args) => app.closeOrderForm(...args);

  const closeProductModal = (...args) => app.closeProductModal(...args);

  const confirmCartReset = (...args) => app.confirmCartReset(...args);

  const showToast = (...args) => app.showToast(...args);

  function openWhatsApp(url) {
    // Check length (PRD requirement)
    if (url.length > 1500) {
      showToast('Pesan terlalu panjang, sebagian mungkin terpotong di WhatsApp', 'warning');
    }

    // Programmatic link click (EC-02)
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();

    // EC-14: Confirm after returning
    setTimeout(confirmCartReset, 1000);
  }

  function trapFocus(element) {
    const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    if (focusableEls.length === 0) return;

    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
      const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (element.id === 'product-modal') closeProductModal();
        if (element.id === 'order-modal') closeOrderForm();
        if (element.id === 'cart-panel') closeCart();
      }

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) { // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else { // if tab key is pressed
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });

    setTimeout(() => {
      firstFocusableEl.focus();
    }, 100);
  }

  Object.assign(app, { openWhatsApp, trapFocus });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
