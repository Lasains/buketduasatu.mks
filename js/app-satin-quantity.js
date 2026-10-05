(function (app) {
  'use strict';
  const addToCart = (...args) => app.addToCart(...args);
  const closeProductModal = (...args) => app.closeProductModal(...args);

  function renderSatinQuantityControls(ctx) {
    // 4. Stepper Jumlah Buket & Total Langsung (aria-live)
    const footerConfig = document.createElement('div');
    footerConfig.className = 'pt-3 border-t border-neutral-100 flex flex-col gap-2';

    const buketQtyRow = document.createElement('div');
    buketQtyRow.className = 'flex items-center justify-between';
    const buketQtyLabel = document.createElement('span');
    buketQtyLabel.className = 'text-xs font-semibold text-neutral-700';
    buketQtyLabel.textContent = 'Jumlah Buket';

    const buketStepper = document.createElement('div');
    buketStepper.className = 'flex items-center gap-1.5 bg-neutral-50 p-1 border border-neutral-200 rounded-xl';

    const btnBuketMinus = document.createElement('button');
    btnBuketMinus.type = 'button';
    btnBuketMinus.className = 'w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold disabled:opacity-40 focus-visible-ring';
    btnBuketMinus.textContent = '−';
    btnBuketMinus.disabled = true;
    btnBuketMinus.setAttribute('aria-label', 'Kurangi jumlah buket');

    const buketCountDisplay = document.createElement('span');
    buketCountDisplay.className = 'w-8 text-center text-xs font-bold text-neutral-800';
    buketCountDisplay.textContent = '1';

    const btnBuketPlus = document.createElement('button');
    btnBuketPlus.type = 'button';
    btnBuketPlus.className = 'w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 flex items-center justify-center font-bold disabled:opacity-40 focus-visible-ring';
    btnBuketPlus.textContent = '+';
    btnBuketPlus.setAttribute('aria-label', 'Tambah jumlah buket');

    btnBuketMinus.onclick = () => {
      if (ctx.selectedQtyBuket > 1) {
        ctx.selectedQtyBuket -= 1;
        buketCountDisplay.textContent = ctx.selectedQtyBuket;
        btnBuketMinus.disabled = ctx.selectedQtyBuket <= 1;
        btnBuketPlus.disabled = ctx.selectedQtyBuket >= 99;
        ctx.updateSatinTotals();
      }
    };

    btnBuketPlus.onclick = () => {
      if (ctx.selectedQtyBuket < 99) {
        ctx.selectedQtyBuket += 1;
        buketCountDisplay.textContent = ctx.selectedQtyBuket;
        btnBuketMinus.disabled = ctx.selectedQtyBuket <= 1;
        btnBuketPlus.disabled = ctx.selectedQtyBuket >= 99;
        ctx.updateSatinTotals();
      }
    };

    buketStepper.appendChild(btnBuketMinus);
    buketStepper.appendChild(buketCountDisplay);
    buketStepper.appendChild(btnBuketPlus);

    buketQtyRow.appendChild(buketQtyLabel);
    buketQtyRow.appendChild(buketStepper);
    footerConfig.appendChild(buketQtyRow);

    const totalRow = document.createElement('div');
    totalRow.className = 'flex items-center justify-between pt-2 border-t border-neutral-100';
    const totalLabel = document.createElement('span');
    totalLabel.className = 'text-xs font-bold text-neutral-600';
    totalLabel.textContent = 'Total Perkiraan';

    const liveTotal = document.createElement('div');
    liveTotal.id = 'satin-live-total';
    liveTotal.className = 'text-lg font-bold text-brand-rose';
    liveTotal.setAttribute('aria-live', 'polite');

    totalRow.appendChild(totalLabel);
    totalRow.appendChild(liveTotal);
    footerConfig.appendChild(totalRow);
    ctx.configContainer.appendChild(footerConfig);

    ctx.updateSatinTotals();

    ctx.btnAdd.onclick = () => {
      const modalNoteVal = ctx.modalNoteEl ? ctx.modalNoteEl.value.slice(0, 200) : '';
      addToCart(ctx.produk, ctx.selectedImage, modalNoteVal, {
        skema: 'satin-glitter',
        model: ctx.selectedModel,
        tangkai: ctx.selectedTangkai,
        tambahan: { ...ctx.selectedTambahan },
        qty: ctx.selectedQtyBuket
      });
      closeProductModal();
    };
  }

  Object.assign(app, { renderSatinQuantityControls });
})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
