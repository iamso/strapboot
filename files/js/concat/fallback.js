/**
 * Fallback/Polyfill Scripts
 * adds fallback- and polyfill-scripts if necessary
 */

;(function(window, document, undefined) {
  'use strict';

  var base = document.querySelector('#fallback-js').dataset.base;

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
      var start = Date.now();
      return setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
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

})(window, document);
