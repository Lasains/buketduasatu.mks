(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  function createSatinPricePanel() {
    // --- PANEL SATIN GLITTER ---
    const panelSatin = document.createElement('div');
    panelSatin.id = 'panel-harga-satin';
    panelSatin.setAttribute('role', 'tabpanel');
    panelSatin.setAttribute('aria-labelledby', 'tab-btn-satin');
    panelSatin.className = 'space-y-6';

    const satinData = HARGA['satin-glitter'];
    if (satinData) {
      // 1. Tabel Utama Tarif Satin
      const tableCard = document.createElement('div');
      tableCard.className = 'bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm';

      const tableTitleWrap = document.createElement('div');
      tableTitleWrap.className = 'px-6 py-4 bg-brand-blush/30 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1';
      const tableTitle = document.createElement('h3');
      tableTitle.className = 'font-bold font-display text-lg text-neutral-900';
      tableTitle.textContent = 'Pricelist Buket Satin Glitter';
      const tableSubtitle = document.createElement('span');
      tableSubtitle.className = 'text-xs text-neutral-500';
      tableSubtitle.textContent = 'Tersedia pilihan Model Biasa & Model Kriwil';
      tableTitleWrap.appendChild(tableTitle);
      tableTitleWrap.appendChild(tableSubtitle);
      tableCard.appendChild(tableTitleWrap);

      const tableOverflow = document.createElement('div');
      tableOverflow.className = 'overflow-x-auto';

      const table = document.createElement('table');
      table.className = 'w-full text-left border-collapse text-sm';

      const thead = document.createElement('thead');
      thead.className = 'bg-neutral-50 text-neutral-800 text-xs uppercase tracking-wider font-semibold border-b border-neutral-200';
      const headRow = document.createElement('tr');

      const th1 = document.createElement('th');
      th1.scope = 'col';
      th1.className = 'px-6 py-3.5';
      th1.textContent = 'Jumlah Tangkai';

      const th2 = document.createElement('th');
      th2.scope = 'col';
      th2.className = 'px-6 py-3.5 text-right';
      th2.textContent = 'Model Biasa';

      const th3 = document.createElement('th');
      th3.scope = 'col';
      th3.className = 'px-6 py-3.5 text-right';
      th3.textContent = 'Model Kriwil';

      headRow.appendChild(th1);
      headRow.appendChild(th2);
      headRow.appendChild(th3);
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      tbody.className = 'divide-y divide-neutral-100';

      const tangkaiList = satinData.pilihanTangkai || [7, 12, 18, 30, 40, 50, 70, 100];
      tangkaiList.forEach((tangkai, idx) => {
        const tarif = satinData.tarif[tangkai];
        const tr = document.createElement('tr');
        tr.className = idx % 2 === 0 ? 'bg-white hover:bg-brand-blush/20 transition-colors' : 'bg-neutral-50/50 hover:bg-brand-blush/20 transition-colors';

        const td1 = document.createElement('td');
        td1.className = 'px-6 py-3 font-semibold text-neutral-900';
        td1.textContent = `${tangkai} Tangkai`;

        const td2 = document.createElement('td');
        td2.className = 'px-6 py-3 text-right text-neutral-700 font-medium';
        td2.textContent = `${CONFIG.currency} ${formatRupiah(tarif.biasa)}`;

        const td3 = document.createElement('td');
        td3.className = 'px-6 py-3 text-right text-brand-rose font-bold';
        td3.textContent = `${CONFIG.currency} ${formatRupiah(tarif.kriwil)}`;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      tableOverflow.appendChild(table);
      tableCard.appendChild(tableOverflow);
      panelSatin.appendChild(tableCard);

      // 2. Tabel / Kotak Tambahan Aksesori
      if (Array.isArray(satinData.tambahan) && satinData.tambahan.length > 0) {
        const tambahanCard = document.createElement('div');
        tambahanCard.className = 'bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4';

        const tambTitle = document.createElement('h4');
        tambTitle.className = 'font-bold text-sm text-neutral-900 uppercase tracking-wider';
        tambTitle.textContent = 'Tambahan Aksesori Buket Satin (Opsional)';
        tambahanCard.appendChild(tambTitle);

        const tambGrid = document.createElement('div');
        tambGrid.className = 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3';

        satinData.tambahan.forEach(tamb => {
          const itemBox = document.createElement('div');
          itemBox.className = 'flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs';
          const nameSpan = document.createElement('span');
          nameSpan.className = 'font-medium text-neutral-800';
          nameSpan.textContent = tamb.nama;
          const priceSpan = document.createElement('span');
          priceSpan.className = 'font-bold text-brand-rose';
          priceSpan.textContent = `+${CONFIG.currency} ${formatRupiah(tamb.harga)} / ${tamb.satuan}`;
          itemBox.appendChild(nameSpan);
          itemBox.appendChild(priceSpan);
          tambGrid.appendChild(itemBox);
        });

        tambahanCard.appendChild(tambGrid);
        panelSatin.appendChild(tambahanCard);
      }

      // 3. Callout Konsultasi Tangkai Lain
      const calloutSatin = document.createElement('div');
      calloutSatin.className = 'p-4 rounded-xl bg-brand-cream border border-brand-rose/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs';
      const calloutSatinText = document.createElement('p');
      calloutSatinText.className = 'text-neutral-700';
      calloutSatinText.innerHTML = '✨ <strong>Jumlah tangkai lain di luar daftar</strong> (misal 10 atau 25 tangkai)? Kami siap menyesuaikan dengan kebutuhanmu.';
      const calloutSatinBtn = document.createElement('a');
      calloutSatinBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo ' + CONFIG.namaUsaha + ', saya mau tanya harga buket satin glitter dengan jumlah tangkai khusus.')}`;
      calloutSatinBtn.target = '_blank';
      calloutSatinBtn.rel = 'noopener noreferrer';
      calloutSatinBtn.className = 'inline-flex items-center justify-center shrink-0 px-4 py-2 rounded-lg bg-brand-rose hover:bg-brand-rose-dark text-white font-medium focus-visible-ring transition-colors';
      calloutSatinBtn.textContent = 'Konsultasi via WhatsApp';
      calloutSatin.appendChild(calloutSatinText);
      calloutSatin.appendChild(calloutSatinBtn);
      panelSatin.appendChild(calloutSatin);
    }


    return panelSatin;
  }

  Object.assign(app, { createSatinPricePanel });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
