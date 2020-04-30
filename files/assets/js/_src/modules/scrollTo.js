import autocreate from 'autocreate.js';
import app from '@/modules/app';

app.on('init', () => {
  autocreate({
    selector: '[data-scroll-to]',
    create: function(el) {
      const target = document.querySelector(el.dataset.scrollTo || el.getAttribute('href'));
      if (target) {
        el.addEventListener('click', e => {
          e.preventDefault();
          app.scroll.to(target);
          return false;
        });
      }
    },
    destroy: function(el) {}
  });
});
