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
  });

  app.el.win.addEventListener('scroll', () => {
    app.el.html.classList.toggle('site--scrolled', window.pageYOffset >= 30);
    app.el.html.classList.toggle('site--scrolled-deep', window.pageYOffset >= 200);
  });
});
