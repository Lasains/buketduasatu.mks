(function (app) {

  'use strict';

  const getCartItemKey = (...args) => app.getCartItemKey(...args);

  const insertNoteChip = (...args) => app.insertNoteChip(...args);

  const saveCart = (...args) => app.saveCart(...args);

  const updateCartItemNote = (...args) => app.updateCartItemNote(...args);

  function createCartNoteSection(item, index) {
      // Section Catatan Item Keranjang (FR-D, FR-E, FR-F, FR-I)
      const noteSection = document.createElement('div');
      noteSection.className = 'pt-2.5 border-t border-neutral-100 space-y-1.5';

      const noteHeader = document.createElement('div');
      noteHeader.className = 'flex justify-between items-center';

      const noteInputId = `cart-note-${index}`;
      const noteLabel = document.createElement('label');
      noteLabel.htmlFor = noteInputId;
      noteLabel.className = 'text-xs font-medium text-neutral-700';
      noteLabel.textContent = `Catatan untuk ${item.namaProduk} (warna, bentuk, pita, bunga yang dihindari):`;

      const counterEl = document.createElement('span');
      counterEl.id = `cart-note-count-${index}`;
      counterEl.className = 'text-xs text-neutral-400 shrink-0';
      counterEl.setAttribute('aria-live', 'polite');
      const currentNote = typeof item.note === 'string' ? item.note : '';
      counterEl.textContent = `${currentNote.length}/200`;

      noteHeader.appendChild(noteLabel);
      noteHeader.appendChild(counterEl);
      noteSection.appendChild(noteHeader);

      // Chip Saran Awalan Catatan (FR-F)
      const chipsDiv = document.createElement('div');
      chipsDiv.className = 'flex flex-wrap gap-1.5';
      chipsDiv.setAttribute('role', 'group');
      chipsDiv.setAttribute('aria-label', `Saran awalan catatan untuk ${item.namaProduk}`);

      const chipPrefixes = ['Warna: ', 'Pita: ', 'Hindari: ', 'Bentuk: '];
      chipPrefixes.forEach(prefix => {
        const chipBtn = document.createElement('button');
        chipBtn.type = 'button';
        chipBtn.className = 'inline-flex items-center justify-center min-h-[44px] px-2.5 py-1.5 text-xs font-medium rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus-visible-ring transition-colors';
        chipBtn.textContent = prefix;
        chipBtn.setAttribute('aria-label', `Sisipkan awalan ${prefix}untuk ${item.namaProduk}`);
        chipBtn.onmousedown = (e) => e.preventDefault(); // Mencegah hilangnya fokus dari textarea
        chipBtn.onclick = () => {
          insertNoteChip(textarea, prefix, counterEl, item);
        };
        chipsDiv.appendChild(chipBtn);
      });
      noteSection.appendChild(chipsDiv);

      // Textarea Catatan (FR-D, FR-E)
      const textarea = document.createElement('textarea');
      textarea.id = noteInputId;
      textarea.rows = 2;
      textarea.maxLength = 200;
      textarea.placeholder = 'Contoh: dominan warna putih dan sage, pita emas, tanpa bunga lili';
      textarea.className = 'w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:border-brand-rose focus:ring-1 focus:ring-brand-rose outline-none transition-colors';
      // Keamanan: assign melalui value, TIDAK menggunakan innerHTML
      textarea.value = currentNote;

      // Input event: Update penghitung dan simpan perubahan TANPA render ulang agar kursor dan fokus tidak melompat (FR-D)
      textarea.addEventListener('input', () => {
        if (textarea.value.length > 200) {
          textarea.value = textarea.value.slice(0, 200);
        }
        counterEl.textContent = `${textarea.value.length}/200`;
        item.note = textarea.value;
        item.cartItemId = getCartItemKey(item);
        saveCart();
      });

      // Blur & Change event: Validasi penggabungan baris jika catatan baru identik dengan baris lain (FR-B & FR-D)
      const handleNoteCommit = () => {
        const finalVal = textarea.value.slice(0, 200);
        updateCartItemNote(item.cartItemId || getCartItemKey(item), finalVal);
      };
      textarea.addEventListener('blur', handleNoteCommit);
      textarea.addEventListener('change', handleNoteCommit);

      noteSection.appendChild(textarea);
      return noteSection;
  }

  Object.assign(app, { createCartNoteSection });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
