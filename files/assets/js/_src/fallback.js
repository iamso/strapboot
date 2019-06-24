(function(window, document) {

  // current script src dir
  const src = document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf('/') + 1);

  // demonstrate javascript support
  const html = document.documentElement;
  html.classList.remove('no-js');
  html.classList.add('js');

  // check for IntersectionObserver support
  !!window.IntersectionObserver || document.write(`<script src="${src}/vendor/intersection-observer.js"><\/script>`);

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
