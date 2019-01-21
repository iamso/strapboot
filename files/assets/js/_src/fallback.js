(function(window, document) {

  // current script src dir
  const src = [].slice.call(document.querySelectorAll('script'), 0).pop().src.replace(/\/[^\/]+$/, '');

  // demonstrate javascript support
  const html = document.documentElement;
  html.classList.remove('no-js');
  html.classList.add('js');

  // check for jQuery presence
  // !!window.jQuery || document.write(`<script src="${src}/vendor/jquery.min.js"><\/script>`);

  // check for Promise support
  // !!window.Promise || document.write(`<script src="${src}/vendor/promise.min.js"><\/script>`);
  !!window.Promise || document.write(`<script src="${src}/vendor/polyfill.min.js"><\/script>`);

  // check for object-fit support
  // !!('objectFit' in html.style) || (html.classList.add('no-objectfit'), document.write(`<script src="${src}/vendor/objectFitPolyfill.basic.min.js"><\/script>`));
  !!('objectFit' in html.style) || html.classList.add('no-objectfit');

  // check for IntersectionObserver support
  !!window.IntersectionObserver || document.write(`<script src="${src}/vendor/intersection-observer.js"><\/script>`);

  // check for location origin support (mostly IE)
  if (!window.location.origin) {
    window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  }

  // fallback for requestIdleCallback
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function(cb) {
      const start = Date.now();
      return setTimeout(() => {
        cb({
          didTimeout: false,
          timeRemaining: () => {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };

  // fallback for cancelIdleCallback
  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function(id) {
      clearTimeout(id);
    };

})(window, document);
