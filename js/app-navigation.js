(function (app) {

  'use strict';

  const insertNoteChip = (...args) => app.insertNoteChip(...args);

  function initNavbar() {
    const btnMobile = document.getElementById('btn-menu-mobile');
    const mobileNav = document.getElementById('mobile-nav');

    btnMobile.addEventListener('click', () => {
      const isExpanded = btnMobile.getAttribute('aria-expanded') === 'true';
      btnMobile.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        mobileNav.classList.add('hidden');
      } else {
        mobileNav.classList.remove('hidden');
      }
    });

    // Close mobile nav on click link
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        btnMobile.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initTextCounters() {
    const ucapan = document.getElementById('ucapan');
    const catatan = document.getElementById('catatan');
    const ucapanCount = document.getElementById('ucapan-count');
    const catatanCount = document.getElementById('catatan-count');

    ucapan.addEventListener('input', () => {
      let val = ucapan.value;
      if (val.length > CONFIG.maxUcapan) {
        val = val.substring(0, CONFIG.maxUcapan);
        ucapan.value = val;
      }
      ucapanCount.textContent = `${val.length}/${CONFIG.maxUcapan}`;
    });

    if (catatan && catatanCount) {
      catatan.addEventListener('input', () => {
        let val = catatan.value;
        if (val.length > CONFIG.maxCatatan) {
          val = val.substring(0, CONFIG.maxCatatan);
          catatan.value = val;
        }
        catatanCount.textContent = `${val.length}/${CONFIG.maxCatatan}`;
      });
    }

    // Modal Catatan Produk (FR-C, FR-E, FR-F)
    const modalNote = document.getElementById('modal-note');
    const modalNoteCount = document.getElementById('modal-note-count');
    if (modalNote && modalNoteCount) {
      modalNote.addEventListener('input', () => {
        let val = modalNote.value;
        if (val.length > 200) {
          val = val.substring(0, 200);
          modalNote.value = val;
        }
        modalNoteCount.textContent = `${val.length}/200`;
      });
    }

    const modalChips = document.querySelectorAll('.modal-chip-btn');
    modalChips.forEach(btn => {
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Mencegah hilangnya fokus dari textarea
      });
      btn.addEventListener('click', () => {
        const prefix = btn.dataset.prefix || btn.textContent;
        insertNoteChip(modalNote, prefix, modalNoteCount);
      });
    });
  }

  Object.assign(app, { initNavbar, initTextCounters });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
