(function (app) {

  'use strict';

  const addToCart = (...args) => app.addToCart(...args);

  const buildMoneyAddonControls = (...args) => app.buildMoneyAddonControls(...args);

  const buildMoneyQuantityControls = (...args) => app.buildMoneyQuantityControls(...args);

  const closeProductModal = (...args) => app.closeProductModal(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const updateMoneyHelperFeedback = (...args) => app.updateMoneyHelperFeedback(...args);

  const updateMoneyTotals = (...args) => app.updateMoneyTotals(...args);

  function renderMoneyConfigurator(ctx) {
    ctx.selectedPaket = 10;
    ctx.selectedTambahan = {};
    ctx.selectedQtyBuket = 1;
    ctx.updateUangTotals = () => updateMoneyTotals(ctx);
    ctx.updateHelperFeedback = () => updateMoneyHelperFeedback(ctx);
    buildMoneyNotice(ctx);
    buildMoneyPackageControls(ctx);
    buildMoneyAddonControls(ctx);
    buildMoneyQuantityControls(ctx);
    ctx.helperInput.addEventListener('input', ctx.updateHelperFeedback);
    ctx.updateUangTotals();

    ctx.btnAdd.onclick = () => {
      const modalNoteVal = ctx.modalNoteEl ? ctx.modalNoteEl.value.slice(0, 200) : '';
      addToCart(ctx.produk, ctx.selectedImage, modalNoteVal, {
        skema: 'buket-uang',
        paket: ctx.selectedPaket,
        tambahan: { ...ctx.selectedTambahan },
        qty: ctx.selectedQtyBuket
      });
      closeProductModal();
    };
  }

  function buildMoneyNotice(ctx) {
    if (ctx.configContainer) ctx.configContainer.classList.remove('hidden');


    // 1. Keterangan jasa rangkai (FR-P7)
    const noticeBox = document.createElement('div');
    noticeBox.className = 'mb-4 bg-brand-cream border border-brand-rose/20 rounded-xl p-3 text-xs text-neutral-700 leading-relaxed flex items-center gap-2';
    const noticeIcon = document.createElement('span');
    noticeIcon.className = 'text-brand-rose font-bold';
    noticeIcon.textContent = 'ⓘ';
    const noticeText = document.createElement('span');
    noticeText.textContent = 'Harga adalah jasa rangkai, belum termasuk uang.';
    noticeBox.appendChild(noticeIcon);
    noticeBox.appendChild(noticeText);
    ctx.configContainer.appendChild(noticeBox);
  }

  function buildMoneyPackageControls(ctx) {
    // 2. Pilihan kapasitas paket uang dan helper jumlah lembar (FR-P7)
    const paketFieldset = document.createElement('fieldset');
    paketFieldset.className = 'mb-4';
    const paketLegend = document.createElement('legend');
    paketLegend.className = 'text-sm font-bold text-neutral-800 mb-2';
    paketLegend.textContent = 'Pilih paket sesuai jumlah lembar uang Anda';
    paketFieldset.appendChild(paketLegend);

    ctx.paketGrid = document.createElement('div');
    ctx.paketGrid.className = 'grid grid-cols-2 gap-2';
    HARGA['buket-uang'].paket.forEach(paket => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'flex items-center gap-2 min-h-[44px] p-2.5 rounded-xl border border-neutral-200 bg-white cursor-pointer hover:border-brand-rose focus-within:ring-1 focus-within:ring-brand-rose';
      const option = document.createElement('input');
      option.type = 'radio';
      option.name = 'uang-paket';
      option.value = String(paket.kapasitas);
      option.checked = paket.kapasitas === ctx.selectedPaket;
      option.className = 'accent-brand-rose';
      option.setAttribute('aria-label', `Maks. ${paket.kapasitas} lembar, ${CONFIG.currency} ${formatRupiah(paket.harga)}`);
      const optionText = document.createElement('span');
      optionText.className = 'flex flex-col text-xs';
      const capacityLabel = document.createElement('span');
      capacityLabel.className = 'font-semibold text-neutral-800';
      capacityLabel.textContent = `Maks. ${paket.kapasitas} lembar`;
      const priceLabel = document.createElement('span');
      priceLabel.className = 'text-neutral-500';
      priceLabel.textContent = `${CONFIG.currency} ${formatRupiah(paket.harga)}`;
      optionText.appendChild(capacityLabel);
      optionText.appendChild(priceLabel);
      optionLabel.appendChild(option);
      optionLabel.appendChild(optionText);
      option.addEventListener('change', () => {
        if (option.checked) {
          ctx.selectedPaket = paket.kapasitas;
          const helperCount = Number(String(ctx.helperInput.value || '').trim());
          if (Number.isInteger(helperCount) && helperCount >= 1 && helperCount <= 100) {
            ctx.helperFeedback.textContent = helperCount > ctx.selectedPaket
              ? 'Jumlah lembar Anda melebihi kapasitas paket ini, pilih paket yang lebih besar.'
              : '';
          }
          ctx.updateUangTotals();
        }
      });
      ctx.paketGrid.appendChild(optionLabel);
    });
    paketFieldset.appendChild(ctx.paketGrid);
    ctx.configContainer.appendChild(paketFieldset);

    const packageExplanation = document.createElement('p');
    packageExplanation.className = 'mb-3 text-xs text-neutral-600 leading-relaxed';
    packageExplanation.textContent = 'Harga mengikuti kapasitas paket, bukan jumlah lembar sebenarnya. Contoh: 15 lembar masuk paket maks. 20 lembar.';
    ctx.configContainer.appendChild(packageExplanation);

    const helperLabel = document.createElement('label');
    helperLabel.htmlFor = 'uang-lembar-helper';
    helperLabel.className = 'block text-xs font-semibold text-neutral-700 mb-1';
    helperLabel.textContent = 'Berapa lembar uang Anda? (hanya untuk membantu memilih paket)';
    ctx.helperInput = document.createElement('input');
    ctx.helperInput.type = 'number';
    ctx.helperInput.id = 'uang-lembar-helper';
    ctx.helperInput.min = '1';
    ctx.helperInput.step = '1';
    ctx.helperInput.inputMode = 'numeric';
    ctx.helperInput.className = 'w-full min-h-[44px] px-3 py-2 border border-neutral-200 rounded-xl focus:border-brand-rose focus:ring-1 focus:ring-brand-rose outline-none transition-colors';
    ctx.helperInput.setAttribute('aria-describedby', 'uang-lembar-feedback');
    ctx.configContainer.appendChild(helperLabel);
    ctx.configContainer.appendChild(ctx.helperInput);

    ctx.helperFeedback = document.createElement('p');
    ctx.helperFeedback.id = 'uang-lembar-feedback';
    ctx.helperFeedback.className = 'mt-2 text-xs text-semantic-error';
    ctx.helperFeedback.setAttribute('aria-live', 'polite');
    ctx.configContainer.appendChild(ctx.helperFeedback);

    ctx.over100Box = document.createElement('div');
    ctx.over100Box.id = 'uang-over-100';
    ctx.over100Box.className = 'hidden mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2';
    const over100Text = document.createElement('p');
    over100Text.className = 'text-xs text-amber-800 font-medium';
    over100Text.textContent = 'Lebih dari 100 lembar? Hubungi kami via WhatsApp';
    const over100Btn = document.createElement('a');
    over100Btn.id = 'btn-wa-custom-lembar';
    over100Btn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(`Halo ${CONFIG.namaUsaha}, saya ingin konsultasi buket uang.`)}`;
    over100Btn.target = '_blank';
    over100Btn.rel = 'noopener noreferrer';
    over100Btn.className = 'inline-flex items-center justify-center gap-1.5 w-full min-h-[44px] py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors focus-visible-ring';
    over100Btn.textContent = 'Hubungi via WhatsApp';
    ctx.over100Box.appendChild(over100Text);
    ctx.over100Box.appendChild(over100Btn);
    ctx.configContainer.appendChild(ctx.over100Box);
  }

  Object.assign(app, { renderMoneyConfigurator, buildMoneyNotice, buildMoneyPackageControls });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
