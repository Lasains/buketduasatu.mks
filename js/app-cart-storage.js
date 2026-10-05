(function (app) {

  'use strict';

  const getCartItemKey = (...args) => app.getCartItemKey(...args);

  const getHargaDasar = (...args) => app.getHargaDasar(...args);

  const getHargaPaket = (...args) => app.getHargaPaket(...args);

  const getHargaTambahan = (...args) => app.getHargaTambahan(...args);

  const getPaketUntukLembar = (...args) => app.getPaketUntukLembar(...args);

  const saveCart = (...args) => app.saveCart(...args);

  const showToast = (...args) => app.showToast(...args);

  function validateConfig() {
    if (!CONFIG.whatsappNumber.startsWith('62')) {
      console.warn("Peringatan: Nomor WhatsApp sebaiknya diawali dengan '62'");
    }
  }

  function checkLocalStorageAvailability() {
    try {
      if (typeof localStorage === 'undefined' || localStorage === null) return false;
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadCart() {
    if (typeof localStorage === 'undefined') return;
    if (!app.isLocalStorageAvailable && !checkLocalStorageAvailability()) return;
    try {
      const savedCart = localStorage.getItem(CONFIG.localStorageKey);
      if (savedCart) {
        let parsed;
        try {
          parsed = JSON.parse(savedCart);
        } catch (jsonErr) {
          console.warn('Format JSON keranjang tidak valid, mereset keranjang:', jsonErr);
          app.cart = [];
          return;
        }

        // Pastikan tipe data yang tersimpan adalah array (FR-J)
        if (!Array.isArray(parsed)) {
          console.warn('Data keranjang di localStorage bukan array, mereset keranjang');
          app.cart = [];
          return;
        }

        // Validasi ketersediaan produk (EC-13) & validasi seleksi harga terhadap HARGA (FR-P6)
        let hasUnavailable = false;
        let removedInvalidCount = 0;
        let hasMigratedData = false;
        const validCart = [];

        for (const item of parsed) {
          if (!item || typeof item !== 'object' || (!item.produkId && !item.id)) {
            continue;
          }
          let isLegacyMoneyItem = false;

          // Standardisasi properti produkId
          if (!item.produkId && item.id) {
            item.produkId = item.id;
          }

          // Fallback field note untuk data lama yang belum memiliki catatan (FR-A & FR-J)
          if (typeof item.note !== 'string') {
            item.note = '';
          }

          // Validasi ketersediaan produk jika daftar PRODUCTS tersedia
          const product = (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS))
            ? PRODUCTS.find(p => p.id === item.produkId)
            : null;

          if (product && product.tersedia === false) {
            hasUnavailable = true;
            item.tersedia = false;
          } else {
            item.tersedia = true;
          }

          // Fallback skema harga untuk item lama tanpa field skema (FR-P6)
          if (!item.skema) {
            item.skema = 'tetap';
            if (item.harga === undefined && product && typeof product.harga === 'number') {
              item.harga = product.harga;
            }
          }

          if (item.skema === 'buket-uang') {
            if (item.paket === undefined && Object.prototype.hasOwnProperty.call(item, 'lembar')) {
              item.paket = getPaketUntukLembar(item.lembar);
              hasMigratedData = true;
              isLegacyMoneyItem = true;
            }
            if (Object.prototype.hasOwnProperty.call(item, 'lembar')) {
              delete item.lembar;
              hasMigratedData = true;
              isLegacyMoneyItem = true;
            }
          }

          // Validasi seleksi terhadap HARGA saat ini (FR-P6, T10)
          let isValidSelection = true;
          if (item.skema === 'satin-glitter') {
            if (product && product.skemaHarga && product.skemaHarga !== 'satin-glitter') {
              isValidSelection = false;
            } else if (getHargaDasar(item) === null || getHargaTambahan(item) === null) {
              isValidSelection = false;
            }
          } else if (item.skema === 'buket-uang') {
            if (product && product.skemaHarga && product.skemaHarga !== 'buket-uang') {
              isValidSelection = false;
            } else if (getHargaPaket(item.paket) === null || getHargaTambahan(item) === null) {
              isValidSelection = false;
            }
          } else if (item.skema === 'tetap') {
            if (typeof item.harga !== 'number' && (!product || typeof product.harga !== 'number')) {
              isValidSelection = false;
            }
          } else {
            isValidSelection = false;
          }

          if (!isValidSelection) {
            removedInvalidCount++;
            continue;
          }

          // Pastikan cartItemId selalu konsisten menyertakan catatan & seleksi (FR-B, FR-P5)
          const previousKey = item.cartItemId;
          item.cartItemId = getCartItemKey(item);
          if (previousKey !== item.cartItemId) hasMigratedData = true;
          const duplicateIndex = isLegacyMoneyItem
            ? validCart.findIndex(existing => existing.cartItemId === item.cartItemId && existing.skema === 'buket-uang')
            : -1;
          if (duplicateIndex >= 0) {
            validCart[duplicateIndex].qty += item.qty;
            hasMigratedData = true;
          } else {
            validCart.push(item);
          }
        }

        app.cart = validCart;

        if (removedInvalidCount > 0 && typeof showToast === 'function') {
          showToast(`${removedInvalidCount} item dihapus karena pilihan tidak lagi tersedia`, 'warning');
        }

        if (hasUnavailable && typeof showToast === 'function') {
          showToast('Beberapa produk di keranjang sudah tidak tersedia', 'warning');
        }
        if (removedInvalidCount > 0) hasMigratedData = true;
        if (hasMigratedData) saveCart();
      } else {
        app.cart = [];
      }
    } catch (e) {
      console.error('Gagal memuat keranjang:', e);
      app.cart = [];
    }
  }

  Object.assign(app, { validateConfig, checkLocalStorageAvailability, loadCart });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
