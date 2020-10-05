(function(window, document) {

  // fallback for currentScript
  if (!document.currentScript) {
    Object.defineProperty(document, 'currentScript', {
      get: () => {
        return [].slice.call(document.querySelectorAll('script'), 0).pop();
      }
    });
  }

  // current script src dir
  const src = document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf('/') + 1);

  // demonstrate javascript support
  const html = document.documentElement;
  html.classList.remove('no-js');
  html.classList.add('js');

  // check for fetch support
  !!window.fetch || document.write(`<script src="${src}/vendor/fetch.umd.js"><\/script>`);

  // check for Promise support
  !!window.Promise || document.write(`<script src="${src}/vendor/polyfill.min.js"><\/script>`);

  // check for IntersectionObserver support
  !!window.IntersectionObserver || document.write(`<script src="${src}/vendor/intersection-observer.js"><\/script>`);

  // check for object-fit support
  !!('objectFit' in html.style) || html.classList.add('no-objectfit');

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
