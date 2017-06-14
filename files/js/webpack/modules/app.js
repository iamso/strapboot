'use strict';

export default class App {
  constructor() {
    this.isMobile = false;
    this.isTouch = Modernizr.touchevents;
    this.isIos = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
    this.isAndroid = /(Android)/gi.test( navigator.userAgent );
    this.cssAnimations = Modernizr.cssanimations;
    this.cssTransitions = Modernizr.csstransitions;
    this._initFn = [];
  }

  // register init function
  regInit(fn) {
    return this._initFn.push(fn) - 1;
  }

  // unregister init function
  unregInit(i) {
    /^f/.test(typeof i) ?
      (i = this._initFn.indexOf(i)) > -1 ?
        this._initFn.splice(i, 1) :
        void(0) :
          this._initFn.splice(i, 1);
  }

  // run registered init functions
  init() {
    for (let fn of this._initFn) {
      fn();
    }
  }
}
