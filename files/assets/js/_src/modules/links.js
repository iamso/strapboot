/* global autocreate */

// import autocreate from 'autocreate.js';
import app from './app';

import * as utils from './utils';

app.on('init', () => {
  autocreate({
    selector: 'a[href]:not(.ignore-link):not([target="_blank"])',
    create: function(element) {
      element.addEventListener('click', async e => {
        const href = element.href;
        let _href = element.getAttribute('href');
        const target = element.target;
        const regex = new RegExp('^' + location.origin);

        if (href) {
          if (e.metaKey || e.shiftKey || e.ctrlKey || e.altKey) {
            return;
          }
          if (/^(?!http.*$).*/.test(href)) {
            return;
          }
          if (href.indexOf(location.origin + location.pathname) === 0 && href.indexOf('#') >= 0) {
            _href = '#' + href.split('#').pop();
          }
          if (_href.match(/^\#.+/)) {
            const anchor = document.querySelector(_href);
            if (anchor) {
              e.preventDefault();
              await app.scroll.to(anchor);
              location.hash = _href;
              return false;
            }
          }

          if (!_href.match(/^\#/) && href.match(regex) && (!target || target === '_self')) {
            e.preventDefault();
            // await app.loader.show();
            app.router.redirect(href);
            return false;
          }
        }

        return false;

      });
    },
    destroy: function(element) {

    }
  });
});
