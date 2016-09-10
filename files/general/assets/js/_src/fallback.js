/**
 * Fallback/Polyfill Scripts
 * adds fallback- and polyfill-scripts if necessary
 */

;(function (factory) {
  'use strict';

  if (/^f/.test(typeof define) && define.amd) {
    define([], factory);
  }
  else if (/^o/.test(typeof exports)) {
    factory();
  }
  else {
    factory();
  }
})(function () {
  'use strict';

  var base = $('#fallback-js').data('base');

  // check for jQuery presence
  window.jQuery || document.write('<script src="' + (base || '') + '/assets/js/vendor/jquery.min.js"><\/script>');

});
