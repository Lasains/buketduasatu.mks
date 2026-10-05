(function (app) {

  'use strict';

  const addToCart = (...args) => app.addToCart(...args);

  const formatRupiah = (...args) => app.formatRupiah(...args);

  const getMinPriceForSchema = (...args) => app.getMinPriceForSchema(...args);

  const getSvgPlaceholder = (...args) => app.getSvgPlaceholder(...args);

  const openProductModal = (...args) => app.openProductModal(...args);

  function renderProducts(kategoriFilter = 'Semua', query = '') {
    const grid = document.getElementById('product-grid');
    const noProducts = document.getElementById('no-products');
    grid.innerHTML = '';

    let filtered = PRODUCTS;
    if (kategoriFilter !== 'Semua') {
      filtered = filtered.filter(p => p.kategori === kategoriFilter);
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => p.nama.toLowerCase().includes(q) || p.kategori.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
      noProducts.classList.remove('hidden');
      return;
    } else {
      noProducts.classList.add('hidden');
    }

    filtered.forEach(produk => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow overflow-hidden flex flex-col group cursor-pointer';
      // Make entire card clickable for accessibility and UX
      card.onclick = () => openProductModal(produk);
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProductModal(produk);
        }
      });

      const imgWrap = document.createElement('div');
      imgWrap.className = 'relative aspect-[4/5] bg-neutral-100 overflow-hidden';

      const img = document.createElement('img');
      img.src = produk.gambarUtama;
      img.alt = produk.nama;
      img.loading = 'lazy';
      img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';
      img.onerror = () => { img.src = getSvgPlaceholder(); };

      imgWrap.appendChild(img);

      if (!produk.tersedia) {
        const badge = document.createElement('div');
        badge.className = 'absolute top-2 right-2 bg-neutral-900/80 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm';
        badge.textContent = 'Habis';
        imgWrap.appendChild(badge);
      }

      const contentDiv = document.createElement('div');
      contentDiv.className = 'p-4 flex flex-col flex-1';

      const catText = document.createElement('span');
      catText.className = 'text-xs text-brand-rose font-medium mb-1';
      catText.textContent = produk.kategori;

      const nameText = document.createElement('h3');
      nameText.className = 'font-bold text-neutral-900 line-clamp-2 mb-2 flex-1';
      nameText.textContent = produk.nama;

      const priceDiv = document.createElement('div');
      priceDiv.className = 'flex items-center justify-between mt-auto';

      const priceText = document.createElement('span');
      priceText.className = 'font-bold text-neutral-700';
      const isSchemaProduct = Boolean(produk.skemaHarga && produk.skemaHarga !== 'tetap');
      const minSchemaPrice = isSchemaProduct ? getMinPriceForSchema(produk.skemaHarga) : null;
      if (minSchemaPrice !== null) {
        priceText.textContent = `Mulai dari ${CONFIG.currency} ${formatRupiah(minSchemaPrice)}`;
      } else {
        priceText.textContent = `${CONFIG.currency} ${formatRupiah(produk.harga)}`;
      }

      const btnAdd = document.createElement('button');
      btnAdd.className = 'w-8 h-8 rounded-full bg-brand-blush text-brand-rose flex items-center justify-center hover:bg-brand-rose hover:text-white transition-colors focus-visible-ring';
      btnAdd.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
      btnAdd.setAttribute('aria-label', isSchemaProduct ? `Pilih opsi untuk ${produk.nama}` : `Tambah ${produk.nama} ke keranjang`);
      btnAdd.disabled = !produk.tersedia;

      btnAdd.onclick = (e) => {
        e.stopPropagation(); // prevent opening modal from card click
        if (isSchemaProduct) {
          openProductModal(produk);
        } else {
          addToCart(produk);
        }
      };

      priceDiv.appendChild(priceText);
      priceDiv.appendChild(btnAdd);

      contentDiv.appendChild(catText);
      contentDiv.appendChild(nameText);
      contentDiv.appendChild(priceDiv);

      card.appendChild(imgWrap);
      card.appendChild(contentDiv);

      grid.appendChild(card);
    });
  }

  function filterProducts(kategori) {
    app.currentFilter = kategori;
    const searchVal = document.getElementById('search-input').value;

    // Update active pill
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.filter === kategori) {
        btn.classList.replace('bg-neutral-100', 'bg-brand-rose');
        btn.classList.replace('text-neutral-700', 'text-white');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.replace('bg-brand-rose', 'bg-neutral-100');
        btn.classList.replace('text-white', 'text-neutral-700');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    renderProducts(app.currentFilter, searchVal);
  }

  function searchProducts(query) {
    renderProducts(app.currentFilter, query);
  }

  function initFilters() {
    const container = document.getElementById('filter-container');
    const categories = ['Semua', ...new Set(PRODUCTS.map(p => p.kategori))];

    // The "Semua" button is already in HTML, we just need to bind event and add the rest
    const existingBtn = container.querySelector('.filter-btn');
    existingBtn.onclick = () => filterProducts('Semua');

    categories.slice(1).forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn bg-neutral-100 text-neutral-700 px-5 py-2 rounded-full font-medium whitespace-nowrap focus-visible-ring transition-colors hover:bg-neutral-200';
      btn.dataset.filter = cat;
      btn.textContent = cat;
      btn.setAttribute('aria-pressed', 'false');
      btn.onclick = () => filterProducts(cat);
      container.appendChild(btn);
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
      searchProducts(e.target.value);
    });
  }

  Object.assign(app, { renderProducts, filterProducts, searchProducts, initFilters });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
