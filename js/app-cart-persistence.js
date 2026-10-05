(function (app) {

  'use strict';

  const checkLocalStorageAvailability = (...args) => app.checkLocalStorageAvailability(...args);

  const showToast = (...args) => app.showToast(...args);

  function saveCart() {
    if (typeof localStorage === 'undefined') return;
    if (!app.isLocalStorageAvailable && !checkLocalStorageAvailability()) return;
    try {
      // Pastikan harga hasil hitung skema bertingkat tidak disimpan di localStorage (FR-P4)
      const toSave = app.cart.map(item => {
        if (item.skema && item.skema !== 'tetap') {
          const { harga, ...rest } = item;
          return rest;
        }
        return item;
      });
      localStorage.setItem(CONFIG.localStorageKey, JSON.stringify(toSave));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        if (typeof showToast === 'function') {
          showToast('Penyimpanan penuh, keranjang tidak dapat disimpan', 'error');
        }
      }
    }
  }

  Object.assign(app, { saveCart });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
