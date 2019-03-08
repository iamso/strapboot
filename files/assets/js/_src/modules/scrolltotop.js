/* global autocreate */

// import autocreate from 'autocreate.js';
import app from './app';

import * as utils from './utils';

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
    if (window.pageYOffset >= 200) {
      app.el.html.classList.add('has-scrolled');
    }
    else {
      app.el.html.classList.remove('has-scrolled');
    }
  });
});
