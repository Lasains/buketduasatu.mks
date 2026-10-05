(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getHargaItem = (...args) => app.getHargaItem(...args);

  const getSubtotalItem = (...args) => app.getSubtotalItem(...args);

  function buildMoneyAddonControls(ctx) {
    // 3. Tambahan Aksesori Buket Uang
    const tambahanWrapper = document.createElement('div');
    tambahanWrapper.className = 'mb-4';
    const tambahanTitle = document.createElement('span');
    tambahanTitle.className = 'block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2';
    tambahanTitle.textContent = 'Tambahan (Opsional)';
    tambahanWrapper.appendChild(tambahanTitle);

    const tambahanList = HARGA['buket-uang'].tambahan || [];
    const tambahanContainer = document.createElement('div');
    tambahanContainer.className = 'space-y-2';

    tambahanList.forEach(tItem => {
      ctx.selectedTambahan[tItem.id] = 0;
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100';

      const info = document.createElement('div');
      info.className = 'flex flex-col min-w-0 pr-2';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'text-xs font-medium text-neutral-800 truncate';
      nameSpan.textContent = tItem.nama;
      const priceSpan = document.createElement('span');
      priceSpan.className = 'text-[11px] text-neutral-500';
      priceSpan.textContent = `+${CONFIG.currency} ${formatRupiah(tItem.harga)} / ${tItem.satuan}`;
      info.appendChild(nameSpan);
      info.appendChild(priceSpan);

      const stepper = document.createElement('div');
      stepper.className = 'flex items-center gap-1.5 shrink-0';

      const btnMinus = document.createElement('button');
      btnMinus.type = 'button';
      btnMinus.className = 'w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold disabled:opacity-40 focus-visible-ring';
      btnMinus.textContent = '−';
      btnMinus.disabled = true;
      btnMinus.setAttribute('aria-label', `Kurangi ${tItem.nama}`);

      const countDisplay = document.createElement('span');
      countDisplay.className = 'w-6 text-center text-xs font-bold text-neutral-800';
      countDisplay.textContent = '0';

      const btnPlus = document.createElement('button');
      btnPlus.type = 'button';
      btnPlus.className = 'w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold disabled:opacity-40 focus-visible-ring';
      btnPlus.textContent = '+';
      btnPlus.setAttribute('aria-label', `Tambah ${tItem.nama}`);

      btnMinus.onclick = () => {
        if (ctx.selectedTambahan[tItem.id] > 0) {
          ctx.selectedTambahan[tItem.id] -= 1;
          countDisplay.textContent = ctx.selectedTambahan[tItem.id];
          btnMinus.disabled = ctx.selectedTambahan[tItem.id] <= 0;
          btnPlus.disabled = ctx.selectedTambahan[tItem.id] >= 99;
          ctx.updateUangTotals();
        }
      };

      btnPlus.onclick = () => {
        if (ctx.selectedTambahan[tItem.id] < 99) {
          ctx.selectedTambahan[tItem.id] += 1;
          countDisplay.textContent = ctx.selectedTambahan[tItem.id];
          btnMinus.disabled = ctx.selectedTambahan[tItem.id] <= 0;
          btnPlus.disabled = ctx.selectedTambahan[tItem.id] >= 99;
          ctx.updateUangTotals();
        }
      };

      stepper.appendChild(btnMinus);
      stepper.appendChild(countDisplay);
      stepper.appendChild(btnPlus);

      row.appendChild(info);
      row.appendChild(stepper);
      tambahanContainer.appendChild(row);
    });

    tambahanWrapper.appendChild(tambahanContainer);
    ctx.configContainer.appendChild(tambahanWrapper);
  }

  function updateMoneyTotals(ctx) {
    // Fungsi update hitungan tanpa memicu render ulang (agar fokus input tidak hilang)
    const helperValue = String(ctx.helperInput.value || '').trim();
    const helperCount = Number(helperValue);
    if (Number.isFinite(helperCount) && helperValue !== '' && helperCount > 100) {
      ctx.modalPriceEl.textContent = 'Konsultasi WhatsApp';
      ctx.liveTotal.textContent = 'Hubungi via WhatsApp';
      ctx.btnAdd.disabled = true;
      return;
    }
    const itemConfig = {
      skema: 'buket-uang',
      paket: ctx.selectedPaket,
      tambahan: ctx.selectedTambahan,
      qty: ctx.selectedQtyBuket
    };
    const hargaPerBuket = getHargaItem(itemConfig);
    const subtotal = getSubtotalItem(itemConfig);

    if (hargaPerBuket !== null && subtotal !== null) {
      ctx.modalPriceEl.textContent = `${CONFIG.currency} ${formatRupiah(hargaPerBuket)} (jasa)`;
      ctx.liveTotal.textContent = `${CONFIG.currency} ${formatRupiah(subtotal)}`;
      if (ctx.produk.tersedia) {
        ctx.btnAdd.disabled = false;
        ctx.btnAdd.textContent = 'Tambah ke Keranjang';
      }
    } else {
      ctx.modalPriceEl.textContent = 'Rp 0';
      ctx.liveTotal.textContent = 'Pilihan tidak valid';
      ctx.btnAdd.disabled = true;
    }
  }

  Object.assign(app, { buildMoneyAddonControls, updateMoneyTotals });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
