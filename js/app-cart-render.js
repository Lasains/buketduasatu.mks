(function (app) {

  'use strict';

  const createCartItemElement = (...args) => app.createCartItemElement(...args);

  const createCartNoteSection = (...args) => app.createCartNoteSection(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getHargaItem = (...args) => app.getHargaItem(...args);

  const getSubtotalItem = (...args) => app.getSubtotalItem(...args);

  function updateCartBadge() {
    if (typeof document === 'undefined') return;
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const totalQty = app.cart.reduce((sum, item) => sum + item.qty, 0);

    badge.textContent = totalQty;
    if (totalQty > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }

    const countTitle = document.getElementById('cart-count-title');
    if (countTitle) {
      countTitle.textContent = totalQty;
    }
  }

  function renderCart() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const btnCheckout = document.getElementById('btn-checkout');
    if (!container || !totalEl || !btnCheckout) return;

    container.innerHTML = '';

    if (app.cart.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'text-center py-10 text-neutral-400';
      emptyMsg.textContent = 'Keranjang belanjamu masih kosong.';
      container.appendChild(emptyMsg);
      totalEl.textContent = `${CONFIG.currency} 0`;
      btnCheckout.disabled = true;
      updateCartBadge();
      return;
    }

    let total = 0;
    let hasUnavailable = false;

    app.cart.forEach((item, index) => {
      const itemUnitPrice = getHargaItem(item) || item.harga || 0;
      const itemSubtotal = getSubtotalItem(item) !== null ? getSubtotalItem(item) : (itemUnitPrice * item.qty);
      if (item.tersedia !== false) {
        total += itemSubtotal;
      } else {
        hasUnavailable = true;
      }
      const itemEl = createCartItemElement(item, index, itemSubtotal, itemUnitPrice);
      itemEl.appendChild(createCartNoteSection(item, index));
      container.appendChild(itemEl);
    });

    totalEl.textContent = `${CONFIG.currency} ${formatRupiah(total)}`;
    btnCheckout.disabled = app.cart.length === 0 || hasUnavailable;

    updateCartBadge();
  }

  Object.assign(app, { updateCartBadge, renderCart });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
