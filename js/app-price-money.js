(function (app) {

  'use strict';

  const formatRupiah = (...args) => app.formatRupiah(...args);

  function createMoneyPricePanel() {
    // --- PANEL BUKET UANG ---
    const panelUang = document.createElement('div');
    panelUang.id = 'panel-harga-uang';
    panelUang.setAttribute('role', 'tabpanel');
    panelUang.setAttribute('aria-labelledby', 'tab-btn-uang');
    panelUang.className = 'space-y-6 hidden';

    const uangData = HARGA['buket-uang'];
    if (uangData) {
      // 1. Keterangan Callout Jasa Rangkai
      const noticeUang = document.createElement('div');
      noticeUang.className = 'p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2';
      const noticeIcon = document.createElement('span');
      noticeIcon.textContent = 'ℹ️';
      const noticeText = document.createElement('p');
      noticeText.className = 'font-medium leading-relaxed';
      noticeText.textContent = uangData.keterangan || 'Harga adalah jasa rangkai, belum termasuk uang.';
      noticeUang.appendChild(noticeIcon);
      noticeUang.appendChild(noticeText);
      panelUang.appendChild(noticeUang);

      // 2. Tabel Paket Kapasitas
      const tableCard = document.createElement('div');
      tableCard.className = 'bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm';

      const tableTitleWrap = document.createElement('div');
      tableTitleWrap.className = 'px-6 py-4 bg-brand-blush/30 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1';
      const tableTitle = document.createElement('h3');
      tableTitle.className = 'font-bold font-display text-lg text-neutral-900';
      tableTitle.textContent = 'Tarif Jasa Buket Uang';
      const tableSubtitle = document.createElement('span');
      tableSubtitle.className = 'text-xs text-neutral-500';
      tableSubtitle.textContent = 'Harga mengikuti kapasitas paket, bukan jumlah lembar sebenarnya.';
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
      th1.textContent = 'Paket';

      const th2 = document.createElement('th');
      th2.scope = 'col';
      th2.className = 'px-6 py-3.5 text-right';
      th2.textContent = 'Biaya Jasa Rangkai';

      headRow.appendChild(th1);
      headRow.appendChild(th2);
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      tbody.className = 'divide-y divide-neutral-100';

      const paketList = uangData.paket || [];
      paketList.forEach((paket, idx) => {
        const tr = document.createElement('tr');
        tr.className = idx % 2 === 0 ? 'bg-white hover:bg-brand-blush/20 transition-colors' : 'bg-neutral-50/50 hover:bg-brand-blush/20 transition-colors';

        const td1 = document.createElement('td');
        td1.className = 'px-6 py-3 font-semibold text-neutral-900';
        td1.textContent = `Maks. ${paket.kapasitas} lembar`;

        const td2 = document.createElement('td');
        td2.className = 'px-6 py-3 text-right text-brand-rose font-bold';
        td2.textContent = `${CONFIG.currency} ${formatRupiah(paket.harga)}`;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      tableOverflow.appendChild(table);
      tableCard.appendChild(tableOverflow);
      panelUang.appendChild(tableCard);

      // 3. Tabel / Kotak Tambahan Aksesori
      if (Array.isArray(uangData.tambahan) && uangData.tambahan.length > 0) {
        const tambahanCard = document.createElement('div');
        tambahanCard.className = 'bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4';

        const tambTitle = document.createElement('h4');
        tambTitle.className = 'font-bold text-sm text-neutral-900 uppercase tracking-wider';
        tambTitle.textContent = 'Tambahan Aksesori Buket Uang (Opsional)';
        tambahanCard.appendChild(tambTitle);

        const tambGrid = document.createElement('div');
        tambGrid.className = 'grid sm:grid-cols-2 lg:grid-cols-4 gap-3';

        uangData.tambahan.forEach(tamb => {
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
        panelUang.appendChild(tambahanCard);
      }

      // 4. Callout Buket Uang > 100 lembar
      const calloutUang = document.createElement('div');
      calloutUang.className = 'p-4 rounded-xl bg-brand-cream border border-brand-rose/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs';
      const calloutUangText = document.createElement('p');
      calloutUangText.className = 'text-neutral-700';
      calloutUangText.innerHTML = '💸 <strong>Butuh buket uang lebih dari 100 lembar?</strong> Silakan hubungi kami via WhatsApp untuk konsultasi dan penawaran khusus.';
      const calloutUangBtn = document.createElement('a');
      calloutUangBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent('Halo ' + CONFIG.namaUsaha + ', saya mau pesan buket uang lebih dari 100 lembar. Mohon info estimasi biaya jasanya.')}`;
      calloutUangBtn.target = '_blank';
      calloutUangBtn.rel = 'noopener noreferrer';
      calloutUangBtn.className = 'inline-flex items-center justify-center shrink-0 px-4 py-2 rounded-lg bg-brand-rose hover:bg-brand-rose-dark text-white font-medium focus-visible-ring transition-colors';
      calloutUangBtn.textContent = 'Hubungi via WhatsApp';
      calloutUang.appendChild(calloutUangText);
      calloutUang.appendChild(calloutUangBtn);
      panelUang.appendChild(calloutUang);
    }


    return panelUang;
  }

  Object.assign(app, { createMoneyPricePanel });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
