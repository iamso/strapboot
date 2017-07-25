const base = document.querySelector('#fallback-js').dataset.base;

// check for jQuery presence
!!window.jQuery || document.write('<script src="' + (base || '') + '/assets/js/vendor/jquery.min.js"><\/script>');

// check for Promise support
!!window.Promise || document.write('<script src="' + (base || '') + '/assets/js/vendor/promise.min.js"><\/script>');

if (!window.location.origin) {
  Object.defineProperty(window.location, 'origin', {
    get: function() {
      return this.protocol + "//" + this.hostname + (this.port ? ':' + this.port: '');
    }
  });
}
