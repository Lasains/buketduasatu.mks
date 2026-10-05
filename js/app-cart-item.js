(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getCartItemKey = (...args) => app.getCartItemKey(...args);

  const getSvgPlaceholder = (...args) => app.getSvgPlaceholder(...args);

  const removeCartItem = (...args) => app.removeCartItem(...args);

  const updateCartItemQty = (...args) => app.updateCartItemQty(...args);

  function createCartItemElement(item, index, itemSubtotal, itemUnitPrice) {
      const itemEl = document.createElement('div');
      itemEl.className = 'flex flex-col bg-white p-3 rounded-xl shadow-sm border border-neutral-100 gap-3';
      if (item.tersedia === false) itemEl.classList.add('opacity-50');

      const topDiv = document.createElement('div');
      topDiv.className = 'flex gap-3';

      const img = document.createElement('img');
      img.src = item.gambarUtama;
      img.alt = item.namaProduk;
      img.className = 'w-16 h-16 object-cover rounded-lg bg-neutral-100 shrink-0';
      img.onerror = () => { img.src = getSvgPlaceholder(); };

      const infoDiv = document.createElement('div');
      infoDiv.className = 'flex-1 flex flex-col justify-between min-w-0';

      const headerDiv = document.createElement('div');
      headerDiv.className = 'flex justify-between items-start gap-2';

      const nameCat = document.createElement('div');
      nameCat.className = 'min-w-0';
      const catText = document.createElement('p');
      catText.className = 'text-xs text-brand-rose font-medium truncate';
      catText.textContent = item.kategori;
      const nameText = document.createElement('h3');
      nameText.className = 'font-bold text-sm text-neutral-900 truncate';
      nameText.textContent = item.namaProduk;

      nameCat.appendChild(catText);
      nameCat.appendChild(nameText);

      // Rincian Konfigurasi Skema di Keranjang (FR-P9)
      if (item.skema === 'satin-glitter') {
        const modelLabel = item.model === 'kriwil' ? 'Model Kriwil' : 'Model Biasa';
        const specText = document.createElement('p');
        specText.className = 'text-xs text-neutral-600 font-medium mt-0.5';
        specText.textContent = `${modelLabel}, ${item.tangkai} tangkai`;
        nameCat.appendChild(specText);

        const tambahanList = [];
        if (item.tambahan && typeof item.tambahan === 'object') {
          const defs = (typeof HARGA !== 'undefined' && HARGA['satin-glitter']?.tambahan) || [];
          Object.keys(item.tambahan).sort().forEach(id => {
            const qty = item.tambahan[id];
            if (qty > 0) {
              const def = defs.find(t => t.id === id);
              const label = def ? def.nama : id;
              tambahanList.push(`${label} x${qty}`);
            }
          });
        }
        if (tambahanList.length > 0) {
          const extraText = document.createElement('p');
          extraText.className = 'text-xs text-neutral-500';
          extraText.textContent = `Tambahan: ${tambahanList.join(', ')}`;
          nameCat.appendChild(extraText);
        }
      } else if (item.skema === 'buket-uang') {
        const specText = document.createElement('p');
        specText.className = 'text-xs text-neutral-600 font-medium mt-0.5';
        specText.textContent = `Paket maks. ${item.paket} lembar`;
        nameCat.appendChild(specText);

        const tambahanList = [];
        if (item.tambahan && typeof item.tambahan === 'object') {
          const defs = (typeof HARGA !== 'undefined' && HARGA['buket-uang']?.tambahan) || [];
          Object.keys(item.tambahan).sort().forEach(id => {
            const qty = item.tambahan[id];
            if (qty > 0) {
              const def = defs.find(t => t.id === id);
              const label = def ? def.nama : id;
              const unitSuffix = def && def.satuan === 'tangkai' ? ' tangkai' : '';
              tambahanList.push(`${label} x${qty}${unitSuffix}`);
            }
          });
        }
        if (tambahanList.length > 0) {
          const extraText = document.createElement('p');
          extraText.className = 'text-xs text-neutral-500';
          extraText.textContent = `Tambahan: ${tambahanList.join(', ')}`;
          nameCat.appendChild(extraText);
        }
      }

      const btnDel = document.createElement('button');
      btnDel.className = 'text-neutral-400 hover:text-semantic-error p-1';
      btnDel.setAttribute('aria-label', `Hapus ${item.namaProduk}`);
      btnDel.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
      btnDel.onclick = () => removeCartItem(item.cartItemId || getCartItemKey(item));

      headerDiv.appendChild(nameCat);
      headerDiv.appendChild(btnDel);

      const actionDiv = document.createElement('div');
      actionDiv.className = 'flex justify-between items-center mt-2';

      const priceWrap = document.createElement('div');
      priceWrap.className = 'flex flex-col';
      const subtotalEl = document.createElement('p');
      subtotalEl.className = 'font-bold text-sm text-neutral-700';
      subtotalEl.textContent = `${CONFIG.currency} ${formatRupiah(itemSubtotal)}`;
      priceWrap.appendChild(subtotalEl);

      if (item.qty > 1 || (item.skema && item.skema !== 'tetap')) {
        const unitEl = document.createElement('span');
        unitEl.className = 'text-[11px] text-neutral-400 font-normal';
        unitEl.textContent = `(${CONFIG.currency} ${formatRupiah(itemUnitPrice)} / buket)`;
        priceWrap.appendChild(unitEl);
      }

      actionDiv.appendChild(priceWrap);

      if (item.tersedia === false) {
        const unavText = document.createElement('span');
        unavText.className = 'text-xs text-semantic-error font-medium';
        unavText.textContent = 'Stok habis';
        actionDiv.appendChild(unavText);
      } else {
        const qtyDiv = document.createElement('div');
        qtyDiv.className = 'flex items-center gap-2 bg-neutral-100 rounded-full px-2 py-1';

        const btnMinus = document.createElement('button');
        btnMinus.className = 'w-5 h-5 flex items-center justify-center text-neutral-700 disabled:opacity-50 hover:bg-neutral-200 rounded-full';
        btnMinus.textContent = '−';
        btnMinus.disabled = item.qty <= 1;
        btnMinus.onclick = () => updateCartItemQty(item.cartItemId || getCartItemKey(item), -1);

        const qtyText = document.createElement('span');
        qtyText.className = 'text-xs font-bold w-4 text-center';
        qtyText.textContent = item.qty;

        const btnPlus = document.createElement('button');
        btnPlus.className = 'w-5 h-5 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 rounded-full';
        btnPlus.textContent = '+';
        btnPlus.disabled = item.qty >= 99;
        btnPlus.onclick = () => updateCartItemQty(item.cartItemId || getCartItemKey(item), 1);

        qtyDiv.appendChild(btnMinus);
        qtyDiv.appendChild(qtyText);
        qtyDiv.appendChild(btnPlus);
        actionDiv.appendChild(qtyDiv);
      }

      infoDiv.appendChild(headerDiv);
      infoDiv.appendChild(actionDiv);

      topDiv.appendChild(img);
      topDiv.appendChild(infoDiv);
      itemEl.appendChild(topDiv);
      return itemEl;
  }

  Object.assign(app, { createCartItemElement });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
