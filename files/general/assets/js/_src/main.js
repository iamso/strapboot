/**
 * Main JS
 * main script, this is where all the action happens ;)
 */

;(function (factory) {
  'use strict';

  if (/^f/.test(typeof define) && define.amd) {
    define(['ujs', 'fastclick', './components/cssevents.js'], factory);
  }
  else if (/^o/.test(typeof exports)) {
    factory(require('ujs'), require('fastclick'), require('./components/cssevents.js'));
  }
  else {
    factory(jQuery, FastClick);
  }
})(function ($, FastClick) {
  'use strict';


  var el;

  var app = {
    name: '{%= name %}',
    isMobile: false,
    isTouch: Modernizr.touchevents,
    isIos: /(iPad|iPhone|iPod)/g.test( navigator.userAgent ),
    isAndroid: /(Android)/gi.test( navigator.userAgent ),
    cssAnimations: Modernizr.cssanimations,
    cssTransitions: Modernizr.csstransitions,

    // app init function
    init: function() {
      el = {
        win: $(window),
        doc: $(document),
        html: $('html'),
        body: $('body')
      };

      this.lang = el.html.attr('lang');

      // attach fastclick listener
      FastClick.attach(document.body);

      // add os specific classes
      this.isIos && el.html.addClass('is-ios');
      this.isAndroid && el.html.addClass('is-android');

      this.runInit();

    },

    // array of registered init functions
    initFn: [],

    // register init function
    regInit: function(fn) {
      return this.initFn.push(fn) - 1;
    },

    // unregister init function
    unregInit: function(i) {
      /^f/.test(typeof i) ?
        (i = this.initFn.indexOf(i)) > -1 ?
          this.initFn.splice(i,1) :
          void(0) :
            this.initFn.splice(i,1);
    },

    // run registered init functions
    runInit: function() {
      var fn = this.initFn;
      for (var i in fn) {
        fn[i]();
      }
    }

  };

  /**
   * Assign app to window
   * @type {object}
   */
  window.app = app;

  /**
   * DOM ready function
   */
  $(app.init.bind(app));

  /**
   * Require additional ujsscripts
   */
  if (!/^u/.test(typeof require)) {
    require('./components/social.js');
    require('./components/log.js');
  }

});
