(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getHargaItem = (...args) => app.getHargaItem(...args);

  const getSubtotalItem = (...args) => app.getSubtotalItem(...args);

  const renderSatinExtrasControls = (...args) => app.renderSatinExtrasControls(...args);

  const renderSatinQuantityControls = (...args) => app.renderSatinQuantityControls(...args);

  function renderSatinConfigurator(ctx) {
          if (ctx.configContainer) ctx.configContainer.classList.remove('hidden');

          ctx.selectedModel = ctx.produk.modelDefault || 'biasa';
          ctx.selectedTangkai = ctx.produk.tangkaiDefault || 7;
          ctx.selectedTambahan = {};
          ctx.selectedQtyBuket = 1;

          // Fungsi perbarui hitungan dan tampilan harga satin



    ctx.updateSatinTotals = () => {
      const itemConfig = {
        skema: 'satin-glitter',
        model: ctx.selectedModel,
        tangkai: ctx.selectedTangkai,
        tambahan: ctx.selectedTambahan,
        qty: ctx.selectedQtyBuket
      };
      const hargaPerBuket = getHargaItem(itemConfig);
      const subtotal = getSubtotalItem(itemConfig);

      if (hargaPerBuket !== null && subtotal !== null) {
        ctx.modalPriceEl.textContent = `${CONFIG.currency} ${formatRupiah(hargaPerBuket)}`;
        const liveTotalEl = document.getElementById('satin-live-total');
        if (liveTotalEl) {
          liveTotalEl.textContent = `${CONFIG.currency} ${formatRupiah(subtotal)}`;
        }
        if (ctx.produk.tersedia) {
          ctx.btnAdd.disabled = false;
          ctx.btnAdd.textContent = 'Tambah ke Keranjang';
        }
      } else {
        ctx.modalPriceEl.textContent = 'Rp 0';
        const liveTotalEl = document.getElementById('satin-live-total');
        if (liveTotalEl) liveTotalEl.textContent = 'Pilihan tidak valid';
        ctx.btnAdd.disabled = true;
      }
    };
          renderSatinModelControls(ctx);
          renderSatinStemControls(ctx);
          renderSatinExtrasControls(ctx);
          renderSatinQuantityControls(ctx);
  }

  function renderSatinModelControls(ctx) {
    // 1. Fieldset Model (Biasa / Kriwil)
    const fieldsetModel = document.createElement('fieldset');
    fieldsetModel.className = 'mb-4';
    const legendModel = document.createElement('legend');
    legendModel.className = 'text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2';
    legendModel.textContent = 'Pilih Model';
    fieldsetModel.appendChild(legendModel);

    const modelGrid = document.createElement('div');
    modelGrid.className = 'grid grid-cols-2 gap-2';
    modelGrid.setAttribute('role', 'radiogroup');
    modelGrid.setAttribute('aria-label', 'Pilih Model Buket Satin');

    const modelOptions = [
      { id: 'biasa', label: 'Model Biasa' },
      { id: 'kriwil', label: 'Model Kriwil' }
    ];

    const modelRadioLabels = [];

    modelOptions.forEach(opt => {
      const label = document.createElement('label');
      label.className = `flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer min-h-[44px] transition-all ${
        ctx.selectedModel === opt.id ? 'border-brand-rose bg-brand-blush/30 font-bold text-brand-rose' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
      }`;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'satin-model';
      radio.value = opt.id;
      radio.checked = ctx.selectedModel === opt.id;
      radio.className = 'accent-brand-rose w-4 h-4';

      const span = document.createElement('span');
      span.className = 'text-xs';
      span.textContent = opt.label;

      label.appendChild(radio);
      label.appendChild(span);
      modelGrid.appendChild(label);
      modelRadioLabels.push({ label, radio, id: opt.id });

      radio.addEventListener('change', () => {
        if (radio.checked) {
          ctx.selectedModel = opt.id;
          modelRadioLabels.forEach(m => {
            const active = m.id === ctx.selectedModel;
            m.label.className = `flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer min-h-[44px] transition-all ${
              active ? 'border-brand-rose bg-brand-blush/30 font-bold text-brand-rose' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`;
          });
          ctx.updateTangkaiPrices();
          ctx.updateSatinTotals();
        }
      });
    });
    fieldsetModel.appendChild(modelGrid);
    ctx.configContainer.appendChild(fieldsetModel);
  }

  function renderSatinStemControls(ctx) {
    // 2. Fieldset Pilihan Tangkai (8 pilihan)
    const fieldsetTangkai = document.createElement('fieldset');
    fieldsetTangkai.className = 'mb-2';
    const legendTangkai = document.createElement('legend');
    legendTangkai.className = 'text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2';
    legendTangkai.textContent = 'Pilih Jumlah Tangkai';
    fieldsetTangkai.appendChild(legendTangkai);

    const tangkaiGrid = document.createElement('div');
    tangkaiGrid.className = 'grid grid-cols-2 sm:grid-cols-4 gap-2';
    tangkaiGrid.setAttribute('role', 'radiogroup');
    tangkaiGrid.setAttribute('aria-label', 'Pilihan Jumlah Tangkai');

    const tangkaiChoices = HARGA['satin-glitter'].pilihanTangkai || [7, 12, 18, 30, 40, 50, 70, 100];
    const tangkaiElements = [];

    tangkaiChoices.forEach(t => {
      const label = document.createElement('label');
      const isChecked = ctx.selectedTangkai === t;
      label.className = `flex flex-col items-center justify-center p-2.5 border rounded-xl cursor-pointer min-h-[44px] text-center transition-all ${
        isChecked ? 'border-brand-rose bg-brand-blush/30 font-bold' : 'border-neutral-200 hover:border-neutral-300'
      }`;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'satin-tangkai';
      radio.value = t;
      radio.checked = isChecked;
      radio.className = 'sr-only';

      const countSpan = document.createElement('span');
      countSpan.className = 'text-xs text-neutral-800';
      countSpan.textContent = `${t} Tangkai`;

      const priceSpan = document.createElement('span');
      priceSpan.className = 'text-[11px] text-brand-rose font-medium mt-0.5';
      const initialPrice = HARGA['satin-glitter'].tarif?.[t]?.[ctx.selectedModel] || 0;
      priceSpan.textContent = `${CONFIG.currency} ${formatRupiah(initialPrice)}`;

      label.appendChild(radio);
      label.appendChild(countSpan);
      label.appendChild(priceSpan);
      tangkaiGrid.appendChild(label);

      tangkaiElements.push({ label, radio, t, priceSpan });

      radio.addEventListener('change', () => {
        if (radio.checked) {
          ctx.selectedTangkai = t;
          tangkaiElements.forEach(item => {
            const active = item.t === ctx.selectedTangkai;
            item.label.className = `flex flex-col items-center justify-center p-2.5 border rounded-xl cursor-pointer min-h-[44px] text-center transition-all ${
              active ? 'border-brand-rose bg-brand-blush/30 font-bold' : 'border-neutral-200 hover:border-neutral-300'
            }`;
          });
          ctx.updateSatinTotals();
        }
      });
    });

    ctx.updateTangkaiPrices = () => {
      tangkaiElements.forEach(item => {
        const tarifTangkai = HARGA['satin-glitter'].tarif?.[item.t]?.[ctx.selectedModel] || 0;
        item.priceSpan.textContent = `${CONFIG.currency} ${formatRupiah(tarifTangkai)}`;
      });
    };

    fieldsetTangkai.appendChild(tangkaiGrid);
    ctx.configContainer.appendChild(fieldsetTangkai);
  }

  Object.assign(app, { renderSatinConfigurator, renderSatinModelControls, renderSatinStemControls });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
