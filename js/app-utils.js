(function (app) {

  'use strict';

  function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID').format(angka);
  }

  function showToast(message, type = 'success') {
    if (typeof global !== 'undefined' && typeof global.showToast === 'function' && typeof document === 'undefined') {
      global.showToast(message, type);
      return;
    }
    if (typeof document === 'undefined') return;
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    const bgClass = type === 'error' ? 'bg-semantic-error' : type === 'warning' ? 'bg-semantic-warning' : type === 'info' ? 'bg-semantic-info' : 'bg-semantic-success';

    toast.className = `${bgClass} text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 transform -translate-y-full opacity-0 pointer-events-auto`;
    toast.textContent = message;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('-translate-y-full', 'opacity-0');
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('-translate-y-full', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function getSvgPlaceholder() {
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23F7E8EC"/><text x="50" y="55" font-size="40" text-anchor="middle">🌸</text></svg>';
  }

  function normalizeNote(note) {
    if (typeof note !== 'string') return '';
    return note.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function getPaketUntukLembar(jumlahLembar) {
    if (typeof jumlahLembar !== 'number' || !Number.isInteger(jumlahLembar) || jumlahLembar < 1 || jumlahLembar > 100) {
      return null;
    }
    return Math.ceil(jumlahLembar / 10) * 10;
  }

  function getHargaPaket(kapasitas) {
    if (typeof kapasitas !== 'number' || !Number.isInteger(kapasitas)) {
      return null;
    }
    if (typeof HARGA === 'undefined' || !HARGA['buket-uang'] || !Array.isArray(HARGA['buket-uang'].paket)) {
      return null;
    }
    const paket = HARGA['buket-uang'].paket.find(item => item.kapasitas === kapasitas);
    return paket ? paket.harga : null;
  }

  Object.assign(app, { formatRupiah, showToast, getSvgPlaceholder, normalizeNote, getPaketUntukLembar, getHargaPaket });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
