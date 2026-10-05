(function () {
  'use strict';
  const app = globalThis[Symbol.for('buketduasatu.app')] ||= {};

  if (typeof document !== 'undefined' && typeof app.init === 'function') {
    document.addEventListener('DOMContentLoaded', app.init);
  }
})();
