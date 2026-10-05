(function (app) {

  'use strict';

  const createMoneyPricePanel = (...args) => app.createMoneyPricePanel(...args);

  const createSatinPricePanel = (...args) => app.createSatinPricePanel(...args);

  function renderHargaSection() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('harga-container');
    if (!container) return;

    if (typeof HARGA === 'undefined') return;

    container.innerHTML = '';

    // Tab buttons wrapper
    const tabNavWrapper = document.createElement('div');
    tabNavWrapper.className = 'flex justify-center mb-8';

    const tabList = document.createElement('div');
    tabList.className = 'inline-flex p-1.5 bg-neutral-100 rounded-full border border-neutral-200';
    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-label', 'Pilihan Skema Daftar Harga');

    const tabBtnSatin = document.createElement('button');
    tabBtnSatin.type = 'button';
    tabBtnSatin.id = 'tab-btn-satin';
    tabBtnSatin.setAttribute('role', 'tab');
    tabBtnSatin.setAttribute('aria-selected', 'true');
    tabBtnSatin.setAttribute('aria-controls', 'panel-harga-satin');
    tabBtnSatin.className = 'px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus-visible-ring bg-brand-rose text-white shadow-rose-sm';
    tabBtnSatin.textContent = 'Buket Satin Glitter';

    const tabBtnUang = document.createElement('button');
    tabBtnUang.type = 'button';
    tabBtnUang.id = 'tab-btn-uang';
    tabBtnUang.setAttribute('role', 'tab');
    tabBtnUang.setAttribute('aria-selected', 'false');
    tabBtnUang.setAttribute('aria-controls', 'panel-harga-uang');
    tabBtnUang.className = 'px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus-visible-ring text-neutral-700 hover:text-brand-rose';
    tabBtnUang.textContent = 'Jasa Buket Uang';

    tabList.appendChild(tabBtnSatin);
    tabList.appendChild(tabBtnUang);
    tabNavWrapper.appendChild(tabList);
    container.appendChild(tabNavWrapper);

    // Panels container
    const panelsWrapper = document.createElement('div');
    panelsWrapper.className = 'w-full';

    const panelSatin = createSatinPricePanel();
    const panelUang = createMoneyPricePanel();
    panelsWrapper.appendChild(panelSatin);
    panelsWrapper.appendChild(panelUang);
    container.appendChild(panelsWrapper);

    // Tab switching event handlers
    const switchTab = (target) => {
      if (target === 'satin') {
        tabBtnSatin.classList.add('bg-brand-rose', 'text-white', 'shadow-rose-sm');
        tabBtnSatin.classList.remove('text-neutral-700', 'hover:text-brand-rose');
        tabBtnSatin.setAttribute('aria-selected', 'true');

        tabBtnUang.classList.remove('bg-brand-rose', 'text-white', 'shadow-rose-sm');
        tabBtnUang.classList.add('text-neutral-700', 'hover:text-brand-rose');
        tabBtnUang.setAttribute('aria-selected', 'false');

        panelSatin.classList.remove('hidden');
        panelUang.classList.add('hidden');
      } else {
        tabBtnUang.classList.add('bg-brand-rose', 'text-white', 'shadow-rose-sm');
        tabBtnUang.classList.remove('text-neutral-700', 'hover:text-brand-rose');
        tabBtnUang.setAttribute('aria-selected', 'true');

        tabBtnSatin.classList.remove('bg-brand-rose', 'text-white', 'shadow-rose-sm');
        tabBtnSatin.classList.add('text-neutral-700', 'hover:text-brand-rose');
        tabBtnSatin.setAttribute('aria-selected', 'false');

        panelUang.classList.remove('hidden');
        panelSatin.classList.add('hidden');
      }
    };

    tabBtnSatin.addEventListener('click', () => switchTab('satin'));
    tabBtnUang.addEventListener('click', () => switchTab('uang'));

    // Keyboard support for tabs (ArrowLeft, ArrowRight)
    tabList.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        tabBtnUang.focus();
        switchTab('uang');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        tabBtnSatin.focus();
        switchTab('satin');
      }
    });
  }

  Object.assign(app, { renderHargaSection });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
