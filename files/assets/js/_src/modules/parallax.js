/* global autocreate */

// import autocreate from 'autocreate.js';
import app from './app';

import * as utils from './utils';

app.on('init', () => {
  autocreate({
    selector: '.parallax-media',
    create: function(el) {

      this.updateParallax = () => {
        const rect = el.getBoundingClientRect();
        const img = el.firstElementChild;
        const diff = img.clientHeight - rect.height;

        const position = rect.bottom;
        const top = 0;
        const bottom = window.innerHeight + rect.height;
        const range = bottom;

        if (position <= bottom && position >= top) {
          const factor = position / range;
          const move = Math.round(factor * diff);
          img.style.transform = `translate3d(0, -${move}px, 0)`;
        }
        else if (position > bottom) {
          img.style.transform = `translate3d(0, -${diff}px, 0)`;
        }
        else {
          img.style.transform = 'translate3d(0, 0, 0)';
        }
      };

      window.addEventListener('scroll', this.updateParallax);
      window.addEventListener('resize', this.updateParallax);

      this.updateParallax();
    },
    destroy: function(el) {
      window.removeEventListener('scroll', this.updateParallax);
      window.removeEventListener('resize', this.updateParallax);
    }
  });
});
