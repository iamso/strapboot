/* global autocreate */

// import autocreate from 'autocreate.js';
import app from '@/modules/app';

const baseClass = 'collapsible';

app.on('init', () => {
  autocreate({
    selector: `.${baseClass}`,
    create: function(element) {
      const trigger = element.querySelector(`.${baseClass}__trigger`);
      const content = element.querySelector(`.${baseClass}__content`);
      const contentTransition = e => {
        content.removeEventListener('transitionend', contentTransition);
        content.style.maxHeight = '';
      };

      trigger && content && trigger.addEventListener('click', e => {
        e.preventDefault();

        content.removeEventListener('transitionend', contentTransition);
        content.addEventListener('transitionend', contentTransition);

        content.style.maxHeight = `${content.scrollHeight}px`;

        setTimeout(() => {
          element.classList.toggle(`${baseClass}--collapsed`);
        }, 25);

        return false;
      });

    },
    destroy: function(element) {},
  });
});
