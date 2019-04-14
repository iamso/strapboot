/* global autocreate */

// import autocreate from 'autocreate.js';
import app from './app';

import throttle from './utils/throttle';

app.on('init', () => {
  autocreate({
    selector: '[data-object-fit]',
    create: function(el) {

      if (app.el.html.hasClass('no-objectfit') && !window.objectFitPolyfill) {

        this.resize = e => {
          const parent = el.parentNode;
          const parentWidth = parent.clientWidth;
          const parentHeight = parent.clientHeight;

          const width = el.videoWidth || el.naturalWidth;
          const height = el.videoHeight || el.naturalHeight;
          const factor = Math.max(
            parentWidth / width,
            parentHeight / height
          );
          el.style.width = `${width * factor}px`;
          el.style.height = `${height * factor}px`;
        };

        this.throttled = throttle(this.resize);

        window.addEventListener('resize', this.throttled);
        window.addEventListener('load', this.resize);

        el.oncanplay = el.onload = this.throttled;

        this.resize();
      }
    },
    destroy: function(el) {
      this.throttled && window.removeEventListener('resize', this.throttled);
      this.resize && window.removeEventListener('load', this.resize);
    }
  });
});
