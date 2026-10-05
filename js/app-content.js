(function (app) {

  'use strict';

  function initFaq() {
    const container = document.getElementById('faq-container');
    FAQS.forEach((faq, i) => {
      const item = document.createElement('div');
      item.className = 'faq-item bg-white border border-neutral-200 rounded-xl overflow-hidden';

      const btn = document.createElement('button');
      btn.className = 'w-full flex justify-between items-center p-4 text-left focus-visible-ring';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', `faq-content-${i}`);

      const title = document.createElement('span');
      title.className = 'font-bold text-neutral-900';
      title.textContent = faq.t;

      const icon = document.createElement('span');
      icon.className = 'text-neutral-400 transition-transform duration-300 transform';
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

      btn.appendChild(title);
      btn.appendChild(icon);

      const content = document.createElement('div');
      content.id = `faq-content-${i}`;
      content.className = 'faq-content bg-neutral-50 px-4';

      const text = document.createElement('p');
      text.className = 'py-4 text-neutral-700 text-sm';
      text.textContent = faq.j;
      content.appendChild(text);

      btn.onclick = () => {
        const isActive = item.classList.contains('active');
        // Close all others
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('active');
          el.querySelector('button').setAttribute('aria-expanded', 'false');
          el.querySelector('button span:last-child').style.transform = 'rotate(0deg)';
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          icon.style.transform = 'rotate(180deg)';
        }
      };

      item.appendChild(btn);
      item.appendChild(content);
      container.appendChild(item);
    });
  }

  function initTestimonials() {
    const grid = document.getElementById('features-grid') || document.getElementById('testimonial-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (typeof KEUNGGULAN !== 'undefined' && Array.isArray(KEUNGGULAN)) {
      KEUNGGULAN.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col gap-3 hover:shadow-md transition-shadow group';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'w-12 h-12 rounded-xl bg-brand-blush text-brand-rose flex items-center justify-center text-2xl mb-1 group-hover:scale-110 transition-transform';
        iconWrap.textContent = item.icon;

        const title = document.createElement('h3');
        title.className = 'font-bold text-neutral-900 text-base';
        title.textContent = item.judul;

        const desc = document.createElement('p');
        desc.className = 'text-neutral-600 text-sm leading-relaxed';
        desc.textContent = item.deskripsi;

        card.appendChild(iconWrap);
        card.appendChild(title);
        card.appendChild(desc);
        grid.appendChild(card);
      });
      return;
    }

    if (typeof TESTIMONIALS !== 'undefined' && Array.isArray(TESTIMONIALS)) {
      TESTIMONIALS.forEach(t => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col gap-4';

        const stars = document.createElement('div');
        stars.className = 'flex text-wa-green';
        stars.innerHTML = '★★★★★';

        const text = document.createElement('p');
        text.className = 'text-neutral-700 text-sm flex-1 italic';
        text.textContent = `"${t.teks}"`;

        const name = document.createElement('p');
        name.className = 'font-bold text-neutral-900 text-sm';
        name.textContent = `- ${t.nama}`;

        card.appendChild(stars);
        card.appendChild(text);
        card.appendChild(name);
        grid.appendChild(card);
      });
    }
  }

  Object.assign(app, { initFaq, initTestimonials });

})(globalThis[Symbol.for('buketduasatu.app')] ||= {});
