(function (app) {

  'use strict';

  const buildWhatsAppMessage = (...args) => app.buildWhatsAppMessage(...args);

  const checkLocalStorageAvailability = (...args) => app.checkLocalStorageAvailability(...args);

  const closeOrderForm = (...args) => app.closeOrderForm(...args);

  const closeProductModal = (...args) => app.closeProductModal(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const initCart = (...args) => app.initCart(...args);

  const initFaq = (...args) => app.initFaq(...args);

  const initFilters = (...args) => app.initFilters(...args);

  const initNavbar = (...args) => app.initNavbar(...args);

  const initTestimonials = (...args) => app.initTestimonials(...args);

  const initTextCounters = (...args) => app.initTextCounters(...args);

  const openWhatsApp = (...args) => app.openWhatsApp(...args);

  const renderHargaSection = (...args) => app.renderHargaSection(...args);

  const renderProducts = (...args) => app.renderProducts(...args);

  const validateConfig = (...args) => app.validateConfig(...args);

  const validateForm = (...args) => app.validateForm(...args);

  function init() {
    validateConfig();
    document.getElementById('year').textContent = new Date().getFullYear();

    app.isLocalStorageAvailable = checkLocalStorageAvailability();
    if (!app.isLocalStorageAvailable) {
      document.getElementById('ls-error-banner').classList.remove('hidden');
    }

    // Set elemen dinamis dari CONFIG
    const waText = document.getElementById('wa-text-footer');
    if (waText) waText.textContent = `WhatsApp: ${CONFIG.whatsappNumber}`;

    const waFloat = document.getElementById('wa-float-btn');
    if (waFloat) waFloat.href = `https://wa.me/${CONFIG.whatsappNumber}`;

    const igLink = document.getElementById('ig-link-footer');
    if (igLink) {
      igLink.href = CONFIG.instagramUrl;
      igLink.textContent = `Instagram: ${CONFIG.instagram}`;
    }

    const alamatFooter = document.getElementById('alamat-footer');
    if (alamatFooter && CONFIG.alamat) {
      alamatFooter.textContent = CONFIG.alamat;
    }

    const jamFooter = document.getElementById('jam-footer');
    if (jamFooter && CONFIG.jamOperasional) {
      jamFooter.textContent = `Jam: ${CONFIG.jamOperasional}`;
    }

    document.querySelectorAll('.dynamic-nama-usaha').forEach(el => {
      el.textContent = CONFIG.namaUsaha;
    });

    document.title = document.title.replace('buketduasatu.mks', CONFIG.namaUsaha);

    // Perbarui JSON-LD secara dinamis
    const ldEl = document.querySelector('script[type="application/ld+json"]');
    if (ldEl) {
      try {
        const ld = JSON.parse(ldEl.textContent);
        ld.name = CONFIG.namaUsaha;
        ld.telephone = '+' + CONFIG.whatsappNumber;
        ld.address.addressLocality = CONFIG.kota;
        if (CONFIG.alamat && ld.address) {
          ld.address.streetAddress = CONFIG.alamat;
        }

        // Hitung priceRange dinamis dari HARGA dan PRODUCTS (FR-P12)
        const allPrices = [];
        if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
          PRODUCTS.forEach(p => {
            if (p.skemaHarga !== 'buket-uang' && typeof p.harga === 'number' && p.harga > 0) allPrices.push(p.harga);
          });
        }
        if (typeof HARGA !== 'undefined') {
          if (HARGA['satin-glitter'] && HARGA['satin-glitter'].tarif) {
            Object.values(HARGA['satin-glitter'].tarif).forEach(t => {
              if (typeof t.biasa === 'number') allPrices.push(t.biasa);
              if (typeof t.kriwil === 'number') allPrices.push(t.kriwil);
            });
          }
          if (HARGA['buket-uang'] && Array.isArray(HARGA['buket-uang'].paket)) {
            HARGA['buket-uang'].paket.forEach(paket => {
              if (typeof paket.harga === 'number') allPrices.push(paket.harga);
            });
          }
        }
        if (allPrices.length > 0) {
          const minPrice = Math.min(...allPrices);
          const maxPrice = Math.max(...allPrices);
          ld.priceRange = `${CONFIG.currency} ${formatRupiah(minPrice)} - ${CONFIG.currency} ${formatRupiah(maxPrice)}`;
        }

        ldEl.textContent = JSON.stringify(ld);
      } catch (e) {
        console.error('Gagal memperbarui JSON-LD', e);
      }
    }

    renderProducts();
    initFilters();
    renderHargaSection();
    initFaq();
    initTestimonials();
    initNavbar();
    initCart();
    initTextCounters();

    // Bind global modal closes
    document.getElementById('btn-close-modal').addEventListener('click', closeProductModal);
    document.getElementById('product-modal-backdrop').addEventListener('click', closeProductModal);

    document.getElementById('btn-close-order').addEventListener('click', closeOrderForm);
    document.getElementById('order-modal-backdrop').addEventListener('click', closeOrderForm);

    // Bind order form submit
    document.getElementById('order-form').addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      const formData = {
        pemesan: document.getElementById('pemesan').value.trim(),
        penerima: document.getElementById('penerima').value.trim(),
        tanggal: document.getElementById('tanggal').value,
        metode: document.querySelector('input[name="metode"]:checked').value,
        alamat: document.getElementById('alamat').value.trim(),
        ucapan: document.getElementById('ucapan').value.trim(),
        catatan: document.getElementById('catatan').value.trim()
      };

      const message = buildWhatsAppMessage(formData);
      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      openWhatsApp(waUrl);
    });
  }

  Object.assign(app, { init });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
