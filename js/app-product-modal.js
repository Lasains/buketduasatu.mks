(function (app) {

  'use strict';

  const addToCart = (...args) => app.addToCart(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getSvgPlaceholder = (...args) => app.getSvgPlaceholder(...args);

  const renderMoneyConfigurator = (...args) => app.renderMoneyConfigurator(...args);

  const renderSatinConfigurator = (...args) => app.renderSatinConfigurator(...args);

  const trapFocus = (...args) => app.trapFocus(...args);

  function openProductModal(produk) {
    const modal = document.getElementById('product-modal');
    let selectedImage = produk.gambarUtama;

    document.getElementById('modal-img').src = produk.gambarUtama;
    document.getElementById('modal-img').onerror = function() { this.src = getSvgPlaceholder(); };
    document.getElementById('modal-title').textContent = produk.nama;
    document.getElementById('modal-category').textContent = produk.kategori;
    const modalPriceEl = document.getElementById('modal-price');

    // Reset input catatan di modal produk (FR-C, FR-E)
    const modalNoteEl = document.getElementById('modal-note');
    const modalCountEl = document.getElementById('modal-note-count');
    if (modalNoteEl) modalNoteEl.value = '';
    if (modalCountEl) modalCountEl.textContent = '0/200';

    const btnAdd = document.getElementById('btn-add-cart');
    btnAdd.disabled = !produk.tersedia;
    btnAdd.textContent = produk.tersedia ? 'Tambah ke Keranjang' : 'Stok Habis';

    // Konfigurator Dinamis di Modal Produk (FR-P7, FR-P13)
    const configContainer = document.getElementById('modal-configurator');
    if (configContainer) {
      configContainer.innerHTML = '';
    }

    const ctx = { produk, selectedImage, modalNoteEl, modalPriceEl, btnAdd, configContainer };
    ctx.skema = produk.skemaHarga || 'tetap';
    if (ctx.skema === 'satin-glitter' && typeof HARGA !== 'undefined' && HARGA['satin-glitter']) {
      renderSatinConfigurator(ctx);
    } else if (ctx.skema === 'buket-uang' && typeof HARGA !== 'undefined' && HARGA['buket-uang']) {
      renderMoneyConfigurator(ctx);
    } else {
      configureFixedPrice(ctx);
    }

    // Render thumbnails
    const thumbContainer = document.getElementById('modal-thumbnails');
    thumbContainer.innerHTML = '';

    const allImages = [produk.gambarUtama, ...(produk.gambarLain || [])];
    if (allImages.length > 0) {
      allImages.forEach(src => {
        if (!src) return;
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Thumbnail';
        img.className = `w-16 h-16 object-cover rounded cursor-pointer border-2 ${src === selectedImage ? 'border-brand-rose' : 'border-transparent'} hover:border-brand-rose transition-colors`;
        img.onerror = () => { img.src = getSvgPlaceholder(); };
        img.onclick = () => {
          selectedImage = src;
          ctx.selectedImage = src;
          document.getElementById('modal-img').src = img.src;
          thumbContainer.querySelectorAll('img').forEach((thumbnail) => {
            thumbnail.classList.toggle('border-brand-rose', thumbnail === img);
            thumbnail.classList.toggle('border-transparent', thumbnail !== img);
          });
        };
        thumbContainer.appendChild(img);
      });
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
    app.activeModal = 'product';
  }

  function configureFixedPrice(ctx) {
    // Skema Tetap
    if (ctx.configContainer) ctx.configContainer.classList.add('hidden');
    ctx.modalPriceEl.textContent = `${CONFIG.currency} ${formatRupiah(ctx.produk.harga)}`;
    ctx.btnAdd.disabled = !ctx.produk.tersedia;
    ctx.btnAdd.onclick = () => {
      const modalNoteVal = ctx.modalNoteEl ? ctx.modalNoteEl.value.slice(0, 200) : '';
      addToCart(ctx.produk, ctx.selectedImage, modalNoteVal);
      closeProductModal();
    };
  }

  function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    app.activeModal = null;
  }

  Object.assign(app, { openProductModal, configureFixedPrice, closeProductModal });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
