(function (app) {

  'use strict';

  const getPaketUntukLembar = (...args) => app.getPaketUntukLembar(...args);

  function buildMoneyQuantityControls(ctx) {
    // 4. Stepper Jumlah Buket & Total Langsung
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
        ctx.        ctx.updateUangTotals();
      }
    };

    btnBuketPlus.onclick = () => {
      if (ctx.selectedQtyBuket < 99) {
        ctx.selectedQtyBuket += 1;
        buketCountDisplay.textContent = ctx.selectedQtyBuket;
        btnBuketMinus.disabled = ctx.selectedQtyBuket <= 1;
        btnBuketPlus.disabled = ctx.selectedQtyBuket >= 99;
        ctx.updateUangTotals();
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
    totalLabel.textContent = 'Total Perkiraan Jasa';

    ctx.liveTotal = document.createElement('div');
    ctx.liveTotal.id = 'uang-live-total';
    ctx.liveTotal.className = 'text-lg font-bold text-brand-rose';
    ctx.liveTotal.setAttribute('aria-live', 'polite');

    totalRow.appendChild(totalLabel);
    totalRow.appendChild(ctx.liveTotal);
    footerConfig.appendChild(totalRow);
    ctx.configContainer.appendChild(footerConfig);
  }

  function updateMoneyHelperFeedback(ctx) {
    const rawValue = String(ctx.helperInput.value || '').trim();
    const count = rawValue === '' ? null : Number(rawValue);
    const validCount = Number.isInteger(count) && count >= 1;
    const isOver100 = Number.isFinite(count) && rawValue !== '' && count > 100;
    ctx.over100Box.classList.toggle('hidden', !isOver100);
    ctx.helperFeedback.textContent = '';

    if (isOver100) {
      ctx.helperFeedback.textContent = 'Lebih dari 100 lembar? Hubungi kami via WhatsApp';
      ctx.modalPriceEl.textContent = 'Konsultasi WhatsApp';
      ctx.liveTotal.textContent = 'Hubungi via WhatsApp';
      ctx.btnAdd.disabled = true;
      return;
    }

    if (validCount) {
      ctx.selectedPaket = getPaketUntukLembar(count);
      const selectedOption = ctx.paketGrid.querySelector(`input[value="${ctx.selectedPaket}"]`);
      if (selectedOption) selectedOption.checked = true;
    }

    ctx.helperFeedback.textContent = validCount && count > ctx.selectedPaket
      ? 'Jumlah lembar Anda melebihi kapasitas paket ini, pilih paket yang lebih besar.'
      : '';
    ctx.updateUangTotals();
  }

  Object.assign(app, { buildMoneyQuantityControls, updateMoneyHelperFeedback });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
