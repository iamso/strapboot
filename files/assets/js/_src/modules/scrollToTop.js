import autocreate from 'autocreate.js';
import app from '@/modules/app';

app.on('init', () => {

  autocreate({
    selector: '.scroll-to-top',
    create: function(el) {
      el.addEventListener('click', e => {
        e.preventDefault();
        app.scroll.toTop(1000);
        return false;
      });
    },
    destroy: function(el) {}
  });

  app.el.win.addEventListener('scroll', e => {
    app.el.html.classList.toggle('site--scrolled', window.pageYOffset >= 30);
    app.el.html.classList.toggle('site--scrolled-deep', window.pageYOffset >= 200);
  });
});
