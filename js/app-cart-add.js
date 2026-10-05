(function (app) {
  'use strict';
  const getCartItemKey = (...args) => app.getCartItemKey(...args);
  const getHargaDasar = (...args) => app.getHargaDasar(...args);
  const getHargaPaket = (...args) => app.getHargaPaket(...args);
  const getHargaTambahan = (...args) => app.getHargaTambahan(...args);
  const getPaketUntukLembar = (...args) => app.getPaketUntukLembar(...args);
  const renderCart = (...args) => app.renderCart(...args);
  const saveCart = (...args) => app.saveCart(...args);
  const showToast = (...args) => app.showToast(...args);

  function addToCart(produk, gambarDipilih = (produk && produk.gambarUtama), note = '', seleksi = null) {
    if (!produk || !produk.tersedia) {
      if (typeof showToast === 'function') {
        showToast('Maaf, produk ini sedang tidak tersedia', 'error');
      }
      return;
    }

    // Normalisasi identitas item keranjang dengan catatan (FR-A, FR-B, FR-E)
    const validNote = typeof note === 'string' ? note.slice(0, 200) : '';
    const rawNote = validNote.trim();
    const imgDipilih = gambarDipilih || (produk && produk.gambarUtama) || '';

    // Tentukan skema harga produk (FR-P2, FR-P4)
    const skema = (seleksi && seleksi.skema) || produk.skemaHarga || 'tetap';

    // Bangun konfigurasi item
    const itemConfig = {
      produkId: produk.id,
      gambarUtama: imgDipilih,
      note: rawNote,
      skema: skema
    };

    if (skema === 'satin-glitter') {
      itemConfig.model = (seleksi && seleksi.model) || 'biasa';
      itemConfig.tangkai = (seleksi && seleksi.tangkai) || 7;
      itemConfig.tambahan = (seleksi && seleksi.tambahan) ? { ...seleksi.tambahan } : {};
      // Bersihkan tambahan dengan jumlah 0 (T9)
      Object.keys(itemConfig.tambahan).forEach(k => {
        if (!itemConfig.tambahan[k] || itemConfig.tambahan[k] <= 0) {
          delete itemConfig.tambahan[k];
        }
      });
      // Validasi ketat terhadap HARGA
      if (getHargaDasar(itemConfig) === null || getHargaTambahan(itemConfig) === null) {
        if (typeof showToast === 'function') {
          showToast('Pilihan konfigurasi buket tidak valid', 'error');
        }
        return;
      }
    } else if (skema === 'buket-uang') {
      itemConfig.paket = seleksi && seleksi.paket !== undefined
        ? seleksi.paket
        : getPaketUntukLembar((seleksi && seleksi.lembar) || 10);
      itemConfig.tambahan = (seleksi && seleksi.tambahan) ? { ...seleksi.tambahan } : {};
      Object.keys(itemConfig.tambahan).forEach(k => {
        if (!itemConfig.tambahan[k] || itemConfig.tambahan[k] <= 0) {
          delete itemConfig.tambahan[k];
        }
      });
      if (getHargaPaket(itemConfig.paket) === null || getHargaTambahan(itemConfig) === null) {
        if (typeof showToast === 'function') {
          showToast('Pilihan paket atau tambahan tidak valid', 'error');
        }
        return;
      }
    }

    const targetKey = getCartItemKey(itemConfig);

    // Cari apakah item dengan identitas yang sama persis sudah ada di keranjang
    const existIndex = app.cart.findIndex(item => {
      const id = item.cartItemId || getCartItemKey(item);
      return id === targetKey || getCartItemKey(item) === targetKey;
    });

    const qtyToAdd = (seleksi && typeof seleksi.qty === 'number' && Number.isInteger(seleksi.qty) && seleksi.qty >= 1)
      ? Math.min(99, seleksi.qty)
      : 1;

    if (existIndex > -1) {
      if (app.cart[existIndex].qty < 99) {
        app.cart[existIndex].qty = Math.min(99, app.cart[existIndex].qty + qtyToAdd);
        if (typeof showToast === 'function') {
          showToast('Kuantitas produk ditambahkan', 'success');
        }
      } else {
        if (typeof showToast === 'function') {
          showToast('Batas maksimal kuantitas tercapai', 'warning');
        }
      }
    } else {
      const newItem = {
        cartItemId: targetKey,
        produkId: produk.id,
        namaProduk: produk.nama,
        kategori: produk.kategori,
        qty: qtyToAdd,
        gambarUtama: imgDipilih,
        note: validNote,
        tersedia: true,
        skema: skema
      };

      if (skema === 'tetap') {
        newItem.harga = produk.harga;
      } else if (skema === 'satin-glitter') {
        newItem.model = itemConfig.model;
        newItem.tangkai = itemConfig.tangkai;
        newItem.tambahan = itemConfig.tambahan;
        // JANGAN simpan harga hasil hitung di item untuk disimpan ke localStorage (FR-P4)
      } else if (skema === 'buket-uang') {
        newItem.paket = itemConfig.paket;
        newItem.tambahan = itemConfig.tambahan;
        // JANGAN simpan harga hasil hitung di item untuk disimpan ke localStorage (FR-P4)
      }

      app.cart.push(newItem);
      if (typeof showToast === 'function') {
        showToast('Produk ditambahkan ke keranjang', 'success');
      }
    }

    saveCart();
    renderCart();
  }

  Object.assign(app, { addToCart });
})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
