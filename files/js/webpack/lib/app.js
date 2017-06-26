export default class App {
  constructor() {
    this.isMobile = false;
    this.isTouch = Modernizr.touchevents;

    this.isIos = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
    this.isIphone = /(iPhone|iPod)/g.test( navigator.userAgent );
    this.isIpad = /(iPad)/g.test( navigator.userAgent );
    this.isAndroid = /(Android)/gi.test( navigator.userAgent );

    this.isIE = /Trident\/|MSIE /.test(navigator.userAgent);
    this.isEdge = /Edge\//.test(navigator.userAgent);
    this.isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    this.isSafari = navigator.userAgent.indexOf("Safari") > -1;
    this.isOpera = navigator.userAgent.toLowerCase().indexOf("op") > -1;

    if ((this.isChrome) && (this.isSafari)) {
      this.isSafari=false;
    }
    if ((this.isChrome) && (this.isOpera)) {
      this.isChrome=false;
    }

    this.cssAnimations = Modernizr.cssanimations;
    this.cssTransitions = Modernizr.csstransitions;
    this.cssTransformSVG = (() => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 2 2');
      Object.assign(svg.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '2px',
        height: '2px',
        zIndex: 2147483647,
      });
      svg.innerHTML = '<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';
      document.body.appendChild(svg);
      const result = document.elementFromPoint(1, 1) !== svg;
      svg.parentNode.removeChild(svg);
      return result;
    })();
    this._initFn = [];
    this._pageInitFn = [];
  }

  // register init function
  regInit(fn) {
    return this._initFn.push(fn) - 1;
  }

  // unregister init function
  unregInit(i) {
    /^f/.test(typeof i) ?
      (i = this._initFn.indexOf(i)) > -1 ?
        this._initFn.splice(i,1) :
        void(0) :
          this._initFn.splice(i,1);
  }

  // run registered init functions
  init() {
    let p = Promise.resolve();
    for (let fn of this._initFn) {
      p = p.then(() => Promise.resolve(fn()));
    }
    return p;
  }

  // register pageInit function
  regPageInit(fn) {
    return this._pageInitFn.push(fn) - 1;
  }

  // unregister pageInit function
  unregPageInit(i) {
    /^f/.test(typeof i) ?
      (i = this._pageInitFn.indexOf(i)) > -1 ?
        this._pageInitFn.splice(i,1) :
        void(0) :
          this._pageInitFn.splice(i,1);
  }

  // run registered init functions
  pageInit() {
    let p = Promise.resolve();
    for (let fn of this._pageInitFn) {
      p = p.then(() => Promise.resolve(fn()));
    }
    return p;
  }
}
