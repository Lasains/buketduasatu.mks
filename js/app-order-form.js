(function (app) {

  'use strict';

  const trapFocus = (...args) => app.trapFocus(...args);

  function openOrderForm() {
    const modal = document.getElementById('order-modal');

    // Reset form
    document.getElementById('order-form').reset();
    document.getElementById('form-error').classList.add('hidden');
    document.getElementById('ucapan-count').textContent = `0/${CONFIG.maxUcapan}`;
    document.getElementById('catatan-count').textContent = `0/${CONFIG.maxCatatan}`;

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tanggal').min = today;

    // Handle metode change for alamat visibility
    const radios = document.getElementsByName('metode');
    const alamatContainer = document.getElementById('alamat-container');
    const alamatInput = document.getElementById('alamat');

    radios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'antar') {
          alamatContainer.style.display = 'block';
          alamatInput.required = true;
        } else {
          alamatContainer.style.display = 'none';
          alamatInput.required = false;
        }
      });
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
    app.activeModal = 'order';
  }

  function closeOrderForm() {
    const modal = document.getElementById('order-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    app.activeModal = null;
  }

  function validateForm() {
    const errorEl = document.getElementById('form-error');
    const pemesan = document.getElementById('pemesan').value.trim();
    const penerima = document.getElementById('penerima').value.trim();
    const tanggal = document.getElementById('tanggal').value;
    const metode = document.querySelector('input[name="metode"]:checked').value;
    const alamat = document.getElementById('alamat').value.trim();

    if (!pemesan || !penerima || !tanggal) {
      errorEl.textContent = 'Mohon isi semua field yang wajib (*).';
      errorEl.classList.remove('hidden');
      return false;
    }

    // Validate past date (EC-07)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(tanggal);
    if (selectedDate < today) {
      errorEl.textContent = 'Tanggal pengiriman tidak boleh di masa lampau.';
      errorEl.classList.remove('hidden');
      return false;
    }

    if (metode === 'antar' && !alamat) {
      errorEl.textContent = 'Alamat pengiriman wajib diisi untuk metode antar.';
      errorEl.classList.remove('hidden');
      return false;
    }

    errorEl.classList.add('hidden');
    return true;
  }

  function formatDateID(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  function sanitizeNoteForWhatsApp(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/\r?\n/g, ' ')  // Baris baru → spasi agar satu baris (FR-G)
      .replace(/[*_~`]/g, ' ') // Karakter format WhatsApp → spasi (FR-G)
      .replace(/\s+/g, ' ')    // Gabungkan spasi berlebih hasil netralisasi
      .trim();
  }

  Object.assign(app, { openOrderForm, closeOrderForm, validateForm, formatDateID, sanitizeNoteForWhatsApp });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
