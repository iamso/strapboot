export default class App {
  constructor() {
    this.isMobile = false;
    this.isTouch = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    this.hasServiceWorker = ('serviceWorker' in navigator);

    this.isIos = /iP(hone|od|ad)/g.test(navigator.platform);
    this.isIos9 = /iP(hone|od|ad)/g.test(navigator.platform) && +(navigator.appVersion).match(/OS (\d+)?/)[1] <= 9;
    this.isIphone = /iP(hone|od)/g.test(navigator.platform);
    this.isIpad = /(iPad)/g.test(navigator.platform);
    this.isAndroid = /(Android)/gi.test(navigator.userAgent);

    this.isIE = /Trident\/|MSIE /.test(navigator.userAgent);
    this.isEdge = /Edge\//.test(navigator.userAgent);
    this.isChrome = navigator.userAgent.indexOf('Chrome') > -1;
    this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
    this.isSafari = navigator.userAgent.indexOf('Safari') > -1;
    this.isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;

    if ((this.isChrome) && (this.isSafari)) {
      this.isSafari = false;
    }
    if ((this.isChrome) && (this.isOpera)) {
      this.isChrome = false;
    }

    let supportsPassive = false;

    try {
      window.addEventListener('test', null, {
        get passive() {
          supportsPassive = true;
        },
      });
    } catch (e) {
      // do nothing
    }

    this.supportsPassive = supportsPassive;

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

    this._events = {};
  }

  $(selector) {
    return document.querySelector(selector);
  }

  $$(selector) {
    return [].slice.call(document.querySelectorAll(selector), 0);
  }

  on(event, listener) {
    if (!Array.isArray(this._events[event])) {
      this._events[event] = [];
    }

    this._events[event].push(listener);
  }

  off(event, listener) {
    if (!Array.isArray(this._events[event])) {
      return;
    }

    const index = this._events[event].indexOf(listener);

    if (index > -1) {
      this._events.splice(index, 1);
    }
  }

  emit(event, data, sequential) {
    if (!Array.isArray(this._events[event])) {
      return;
    }

    if (sequential) {
      let p = Promise.resolve();
      for (const listener of this._events[event]) {
        p = p.then(() => Promise.resolve(listener(data)));
      }
      return p;
    }
    else {
      for (const listener of this._events[event]) {
        listener(data);
      }
    }
  }
}
