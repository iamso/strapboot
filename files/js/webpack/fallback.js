const base = document.querySelector('#fallback-js').dataset.base;

// check for jQuery presence
!!window.jQuery || document.write('<script src="' + (base || '') + '/assets/js/vendor/jquery.min.js"><\/script>');

// check for Promise support
!!window.Promise || document.write('<script src="' + (base || '') + '/assets/js/vendor/promise.min.js"><\/script>');

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

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
  }

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function(id) {
    clearTimeout(id);
  }
