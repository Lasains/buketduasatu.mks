(function (app) {

  'use strict';

  const getHargaPaket = (...args) => app.getHargaPaket(...args);

  const getPaketUntukLembar = (...args) => app.getPaketUntukLembar(...args);

  const normalizeNote = (...args) => app.normalizeNote(...args);

  function getHargaDasar(seleksi) {
    if (!seleksi || typeof seleksi !== 'object') return null;
    const skema = seleksi.skema || seleksi.skemaHarga || 'tetap';

    if (skema === 'satin-glitter') {
      if (typeof HARGA === 'undefined' || !HARGA['satin-glitter']) return null;
      const model = seleksi.model;
      const tangkai = seleksi.tangkai;
      if (typeof model !== 'string' || !['biasa', 'kriwil'].includes(model)) return null;
      if (typeof tangkai !== 'number' || !Number.isInteger(tangkai)) return null;
      const tarif = HARGA['satin-glitter'].tarif;
      if (!tarif || !tarif[tangkai] || typeof tarif[tangkai][model] !== 'number') return null;
      return tarif[tangkai][model];
    }

    if (skema === 'buket-uang') {
      return getHargaPaket(seleksi.paket);
    }

    if (skema === 'tetap') {
      if (typeof seleksi.harga === 'number' && Number.isFinite(seleksi.harga) && seleksi.harga >= 0) {
        return seleksi.harga;
      }
      if (seleksi.produkId && typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
        const prod = PRODUCTS.find(p => p.id === seleksi.produkId);
        if (prod && typeof prod.harga === 'number' && Number.isFinite(prod.harga) && prod.harga >= 0) {
          return prod.harga;
        }
      }
      return null;
    }

    return null;
  }

  function getHargaTambahan(seleksi) {
    if (!seleksi || typeof seleksi !== 'object') return null;
    const skema = seleksi.skema || seleksi.skemaHarga || 'tetap';
    const tambahan = seleksi.tambahan;
    if (!tambahan) return 0;
    if (typeof tambahan !== 'object' || Array.isArray(tambahan)) return null;

    const daftarTambahan = (typeof HARGA !== 'undefined' && HARGA[skema] && Array.isArray(HARGA[skema].tambahan))
      ? HARGA[skema].tambahan
      : [];

    let total = 0;
    const entries = Object.entries(tambahan);
    for (const [id, qty] of entries) {
      if (qty === 0) continue; // Abaikan jumlah 0 (T9)
      if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 0 || qty > 99) {
        return null; // Tolak jumlah negatif, >99, desimal, dsb.
      }
      const def = daftarTambahan.find(t => t.id === id);
      if (!def) {
        return null; // Tolak ID tambahan yang tidak dikenal di skema ini
      }
      total += def.harga * qty;
    }
    return total;
  }

  function getHargaItem(seleksi) {
    if (!seleksi || typeof seleksi !== 'object') return null;
    const dasar = getHargaDasar(seleksi);
    if (dasar === null) return null;
    const tambahan = getHargaTambahan(seleksi);
    if (tambahan === null) return null;
    return dasar + tambahan;
  }

  function getSubtotalItem(item) {
    if (!item || typeof item !== 'object') return null;
    const qty = item.qty;
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1) return null;
    const hargaPerBuket = getHargaItem(item);
    if (hargaPerBuket === null) return null;
    return hargaPerBuket * qty;
  }

  function serializeTambahan(tambahan) {
    if (!tambahan || typeof tambahan !== 'object') return '';
    return Object.keys(tambahan)
      .filter(k => {
        const q = tambahan[k];
        return typeof q === 'number' && Number.isInteger(q) && q > 0;
      })
      .sort()
      .map(k => `${k}:${tambahan[k]}`)
      .join(',');
  }

  function getCartItemKey(itemOrProdukId, gambarUtama, note = '', seleksi = null) {
    if (itemOrProdukId && typeof itemOrProdukId === 'object') {
      const pId = itemOrProdukId.produkId !== undefined ? itemOrProdukId.produkId : itemOrProdukId.id;
      const img = itemOrProdukId.gambarUtama || itemOrProdukId.gambarDipilih || '';
      const n = itemOrProdukId.note !== undefined ? itemOrProdukId.note : '';
      const skema = itemOrProdukId.skema || itemOrProdukId.skemaHarga || (seleksi && seleksi.skema) || 'tetap';

      if (skema === 'satin-glitter') {
        const model = itemOrProdukId.model || (seleksi && seleksi.model) || '';
        const tangkai = itemOrProdukId.tangkai || (seleksi && seleksi.tangkai) || '';
        const tambahan = itemOrProdukId.tambahan || (seleksi && seleksi.tambahan) || null;
        return `${pId}::${img}::${normalizeNote(n)}::satin-glitter::${model}::${tangkai}::[${serializeTambahan(tambahan)}]`;
      }

      if (skema === 'buket-uang') {
        const legacyLembar = itemOrProdukId.lembar !== undefined
          ? itemOrProdukId.lembar
          : (seleksi && seleksi.lembar);
        const paket = itemOrProdukId.paket !== undefined
          ? itemOrProdukId.paket
          : seleksi && seleksi.paket !== undefined
            ? seleksi.paket
            : getPaketUntukLembar(legacyLembar);
        const tambahan = itemOrProdukId.tambahan || (seleksi && seleksi.tambahan) || null;
        return `${pId}::${img}::${normalizeNote(n)}::buket-uang::${paket === null ? '' : paket}::[${serializeTambahan(tambahan)}]`;
      }

      return `${pId}::${img}::${normalizeNote(n)}`;
    }

    // Pemanggilan dengan parameter terpisah
    const pId = itemOrProdukId;
    const img = gambarUtama || '';
    const n = note || '';
    if (seleksi && typeof seleksi === 'object') {
      const skema = seleksi.skema || seleksi.skemaHarga || 'tetap';
      if (skema === 'satin-glitter') {
        return `${pId}::${img}::${normalizeNote(n)}::satin-glitter::${seleksi.model || ''}::${seleksi.tangkai || ''}::[${serializeTambahan(seleksi.tambahan)}]`;
      }
      if (skema === 'buket-uang') {
        const paket = seleksi.paket !== undefined ? seleksi.paket : getPaketUntukLembar(seleksi.lembar);
        return `${pId}::${img}::${normalizeNote(n)}::buket-uang::${paket === null ? '' : paket}::[${serializeTambahan(seleksi.tambahan)}]`;
      }
    }
    return `${pId}::${img}::${normalizeNote(n)}`;
  }

  function getMinPriceForSchema(skema) {
    if (typeof HARGA === 'undefined' || !HARGA || !HARGA[skema]) return null;
    if (skema === 'satin-glitter' && HARGA['satin-glitter'].tarif) {
      const prices = [];
      const tarifObj = HARGA['satin-glitter'].tarif;
      for (const k in tarifObj) {
        if (tarifObj[k]) {
          if (typeof tarifObj[k].biasa === 'number') prices.push(tarifObj[k].biasa);
          if (typeof tarifObj[k].kriwil === 'number') prices.push(tarifObj[k].kriwil);
        }
      }
      return prices.length > 0 ? Math.min(...prices) : null;
    }
    if (skema === 'buket-uang' && Array.isArray(HARGA['buket-uang'].paket)) {
      const prices = HARGA['buket-uang'].paket
        .map(p => p.harga)
        .filter(h => typeof h === 'number');
      return prices.length > 0 ? Math.min(...prices) : null;
    }
    return null;
  }

  Object.assign(app, { getHargaDasar, getHargaTambahan, getHargaItem, getSubtotalItem, serializeTambahan, getCartItemKey, getMinPriceForSchema });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
