'use strict';

const base = document.querySelector('#fallback-js').dataset.base;

// check for jQuery presence
!!window.jQuery || document.write('<script src="' + (base || '') + '/assets/js/vendor/jquery.min.js"><\/script>');

// check for Promise support
!!window.Promise || document.write('<script src="' + (base || '') + '/assets/js/vendor/promise.min.js"><\/script>');
