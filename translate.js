(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('language-toggle');
  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');

  function applyLanguage(lang) {
    document.querySelectorAll('[data-en][data-te]').forEach(el => {
      el.textContent = el.dataset[lang];
    });
    document.querySelectorAll('[data-placeholder-en][data-placeholder-te]').forEach(el => {
      el.placeholder = el.dataset[`placeholder${lang === 'te' ? 'Te' : 'En'}`];
    });
    root.lang = lang === 'te' ? 'te' : 'en-IN';
    document.title = lang === 'te'
      ? 'ప్రాపర్టీ ఎక్స్‌పర్ట్ | మంచిర్యాలలో ప్రాపర్టీలు'
      : 'Property Expert | Premium Property Guidance in Mancherial';
    toggle.textContent = lang === 'te' ? 'English' : 'తెలుగు';
    toggle.setAttribute('aria-label', lang === 'te' ? 'Switch website to English' : 'వెబ్‌సైట్‌ను తెలుగులోకి మార్చండి');
    localStorage.setItem('peLanguage', lang);
  }

  toggle.addEventListener('click', () => applyLanguage(root.lang === 'te' ? 'en' : 'te'));
  applyLanguage(localStorage.getItem('peLanguage') === 'te' ? 'te' : 'en');

  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
    menu.textContent = nav.classList.contains('open') ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.textContent = '☰';
  }));

  document.querySelectorAll('[data-project]').forEach(link => link.addEventListener('click', () => {
    const select = document.getElementById('project');
    if (select) select.value = link.dataset.project;
  }));

  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
    document.getElementById(button.dataset.dialog).showModal();
  }));
  document.querySelectorAll('.close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));

  document.getElementById('lead').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const value = id => document.getElementById(id).value.trim();
    const telugu = root.lang === 'te';
    const message = telugu
      ? `హాయ్ ప్రాపర్టీ ఎక్స్‌పర్ట్,\n\nప్రాపర్టీ / సైట్ సందర్శన విచారణ\nపేరు: ${value('name')}\nఫోన్: ${value('phone')}\nప్రాజెక్ట్: ${document.getElementById('project').selectedOptions[0].textContent}\nసందర్శించాలనుకునే తేదీ: ${value('date') || 'ఎంచుకోలేదు'}\nఅవసరాలు: ${value('message') || 'తెలియజేయలేదు'}`
      : `Hi Property Expert,\n\nProperty / Site Visit Enquiry\nName: ${value('name')}\nPhone: ${value('phone')}\nProject: ${value('project')}\nPreferred date: ${value('date') || 'Not selected'}\nRequirement: ${value('message') || 'Not specified'}`;
    window.open(`https://wa.me/917981904164?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();
