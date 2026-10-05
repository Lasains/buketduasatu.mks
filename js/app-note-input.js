(function (app) {

  'use strict';

  const getCartItemKey = (...args) => app.getCartItemKey(...args);

  const saveCart = (...args) => app.saveCart(...args);

  function insertNoteChip(textarea, prefix, counterEl, item) {
    if (!textarea) return;
    const currentVal = textarea.value || '';
    let newVal = '';
    if (!currentVal.trim()) {
      newVal = prefix;
    } else {
      const trimmed = currentVal.trimEnd();
      if (trimmed.endsWith(',') || trimmed.endsWith(';') || trimmed.endsWith('.')) {
        newVal = `${trimmed} ${prefix}`;
      } else {
        newVal = `${trimmed}, ${prefix}`;
      }
    }

    // Batasan maksimal 200 karakter (FR-E)
    if (newVal.length > 200) {
      newVal = newVal.slice(0, 200);
    }

    textarea.value = newVal;
    if (counterEl) {
      counterEl.textContent = `${newVal.length}/200`;
    }

    if (item) {
      item.note = newVal;
      item.cartItemId = getCartItemKey({ ...item, note: newVal });
      saveCart();
    }

    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
  }

  Object.assign(app, { insertNoteChip });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
