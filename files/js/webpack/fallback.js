const base = document.querySelector('#fallback-js').dataset.base;

// check for jQuery presence
!!window.jQuery || document.write('<script src="' + (base || '') + '/assets/js/vendor/jquery.min.js"><\/script>');

// check for Promise support
!!window.Promise || document.write('<script src="' + (base || '') + '/assets/js/vendor/promise.min.js"><\/script>');

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
