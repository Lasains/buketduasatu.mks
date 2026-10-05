(function (app) {

  'use strict';

  const getCartItemKey = (...args) => app.getCartItemKey(...args);





  const renderCart = (...args) => app.renderCart(...args);

  const saveCart = (...args) => app.saveCart(...args);



  function removeCartItem(cartItemId) {
    app.cart = app.cart.filter(item => {
      const id = item.cartItemId || getCartItemKey(item);
      if (id === cartItemId) return false;
      // Kompatibilitas mundur jika ID dicari tanpa akhiran catatan ternormalisasi
      if (cartItemId && id === `${cartItemId}::`) return false;
      return true;
    });
    saveCart();
    renderCart();
  }

  function updateCartItemQty(cartItemId, delta) {
    const item = app.cart.find(i => {
      const id = i.cartItemId || getCartItemKey(i);
      return id === cartItemId || (cartItemId && id === `${cartItemId}::`);
    });
    if (item) {
      const newQty = item.qty + delta;
      if (newQty > 0 && newQty <= 99) {
        item.qty = newQty;
        saveCart();
        renderCart();
      }
    }
  }

  function updateCartItemNote(cartItemId, newNote) {
    const validNote = typeof newNote === 'string' ? newNote.slice(0, 200) : '';
    const rawNote = validNote.trim();
    const itemIndex = app.cart.findIndex(i => {
      const id = i.cartItemId || getCartItemKey(i);
      return id === cartItemId || (cartItemId && id === `${cartItemId}::`);
    });

    if (itemIndex === -1) return null;

    const currentItem = app.cart[itemIndex];
    const targetKey = getCartItemKey({ ...currentItem, note: rawNote });

    // Cari apakah ada baris item LAIN di keranjang yang identitasnya sama
    const duplicateIndex = app.cart.findIndex((item, idx) => {
      return idx !== itemIndex && getCartItemKey(item) === targetKey;
    });

    if (duplicateIndex > -1) {
      // Gabungkan kuantitas item ini ke item duplikat yang sudah ada
      const targetItem = app.cart[duplicateIndex];
      targetItem.qty = Math.min(99, targetItem.qty + currentItem.qty);
      // Hapus item saat ini karena telah dilebur/digabung
      app.cart.splice(itemIndex, 1);

      saveCart();
      renderCart();
      if (typeof showToast === 'function') {
        showToast('Item digabung', 'info');
      }
      return { merged: true, targetItem, removedItemId: cartItemId };
    } else {
      // Jika unik, perbarui catatan dan cartItemId item tanpa render ulang agar fokus tidak hilang
      currentItem.note = validNote;
      currentItem.cartItemId = targetKey;

      saveCart();
      return { merged: false, item: currentItem };
    }
  }

  Object.assign(app, { removeCartItem, updateCartItemQty, updateCartItemNote });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
