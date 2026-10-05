(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  function renderSatinExtrasControls(ctx) {
    // Tautan WhatsApp konsultasi tangkai lain (FR-P7)
    const consultDiv = document.createElement('div');
    consultDiv.className = 'mt-1 mb-4 flex items-center justify-between text-xs text-neutral-500';
    const consultLabel = document.createElement('span');
    consultLabel.textContent = 'Jumlah tangkai lain?';
    const consultLink = document.createElement('a');
    consultLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo ' + CONFIG.namaUsaha + ', saya ingin bertanya buket satin glitter dengan jumlah tangkai di luar pilihan.')}`;
    consultLink.target = '_blank';
    consultLink.rel = 'noopener noreferrer';
    consultLink.className = 'text-brand-rose font-semibold hover:underline inline-flex items-center min-h-[44px] py-2 focus-visible-ring';
    consultLink.textContent = 'Tanyakan lewat WhatsApp \u2192';
    consultDiv.appendChild(consultLabel);
    consultDiv.appendChild(consultLink);
    ctx.configContainer.appendChild(consultDiv);

    // 3. Tambahan Aksesori (Stepper 0-99 per jenis)
    const tambahanWrapper = document.createElement('div');
    tambahanWrapper.className = 'mb-4';
    const tambahanTitle = document.createElement('span');
    tambahanTitle.className = 'block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2';
    tambahanTitle.textContent = 'Tambahan (Opsional)';
    tambahanWrapper.appendChild(tambahanTitle);

    const tambahanList = HARGA['satin-glitter'].tambahan || [];
    const tambahanContainer = document.createElement('div');
    tambahanContainer.className = 'space-y-2';

    tambahanList.forEach(tItem => {
      const defaultQuantity = ctx.produk.tambahanDefault?.[tItem.id] ?? 0;
      ctx.selectedTambahan[tItem.id] = defaultQuantity;
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
      btnMinus.disabled = defaultQuantity <= 0;
      btnMinus.setAttribute('aria-label', `Kurangi ${tItem.nama}`);

      const countDisplay = document.createElement('span');
      countDisplay.className = 'w-6 text-center text-xs font-bold text-neutral-800';
      countDisplay.textContent = String(defaultQuantity);

      const btnPlus = document.createElement('button');
      btnPlus.type = 'button';
      btnPlus.className = 'w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold disabled:opacity-40 focus-visible-ring';
      btnPlus.textContent = '+';
      btnPlus.disabled = defaultQuantity >= 99;
      btnPlus.setAttribute('aria-label', `Tambah ${tItem.nama}`);

      btnMinus.onclick = () => {
        if (ctx.selectedTambahan[tItem.id] > 0) {
          ctx.selectedTambahan[tItem.id] -= 1;
          countDisplay.textContent = ctx.selectedTambahan[tItem.id];
          btnMinus.disabled = ctx.selectedTambahan[tItem.id] <= 0;
          btnPlus.disabled = ctx.selectedTambahan[tItem.id] >= 99;
          ctx.updateSatinTotals();
        }
      };

      btnPlus.onclick = () => {
        if (ctx.selectedTambahan[tItem.id] < 99) {
          ctx.selectedTambahan[tItem.id] += 1;
          countDisplay.textContent = ctx.selectedTambahan[tItem.id];
          btnMinus.disabled = ctx.selectedTambahan[tItem.id] <= 0;
          btnPlus.disabled = ctx.selectedTambahan[tItem.id] >= 99;
          ctx.updateSatinTotals();
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


  Object.assign(app, { renderSatinExtrasControls });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
