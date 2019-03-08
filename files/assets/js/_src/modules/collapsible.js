/* global autocreate */

// import autocreate from 'autocreate.js';
import app from './app';

import * as utils from './utils';

app.regInit(() => {
  autocreate({
    selector: '.collapsible',
    create: function(element) {
      const trigger = element.querySelector('.collapsible-trigger');
      const content = element.querySelector('.collapsible-content');
      const contentTransition = e => {
        content.removeEventListener('transitionend', contentTransition);
        content.style.maxHeight = '';
      };

      trigger && content && trigger.addEventListener('click', e => {
        e.preventDefault;

        content.removeEventListener('transitionend', contentTransition);
        content.addEventListener('transitionend', contentTransition);

        content.style.maxHeight = `${content.scrollHeight}px`;

        setTimeout(() => {
          element.classList.toggle('collapsed');
        }, 25);

        return false;
      });

    },
    destroy: function(element) {},
  });
});
