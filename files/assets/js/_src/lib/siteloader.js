const defaults = {
  loaded: 'site--loaded',
  ready: 'site--ready',
  el: '.site-loader',
};

export default class SiteLoader {
  constructor(options) {
    this.options = Object.assign({}, defaults, options);
    this.html = document.documentElement;
    this.el = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el;
    this.init();
  }
  init() {
    // this.el.addEventListener('click', e => {
    //   if (document.readyState === 'complete') {
    //     this.hide();
    //     this.el.removeEventListener('click');
    //   }
    // });

    return this.show();
  }
  show() {
    return new Promise((resolve, reject) => {
      if (!this.el) {
        resolve();
        return;
      }
      const listener = e => {
        this.el.removeEventListener('transitionend', listener);
        resolve(this);
      };
      this.el.addEventListener('transitionend', listener);
      if (!this.html.classList.contains(this.options.loaded) || !this.html.classList.contains(this.options.ready)) {
        resolve(this);
      }
      this.html.classList.remove(this.options.loaded);
      this.html.classList.remove(this.options.ready);
    });
  }
  hide() {
    return new Promise((resolve, reject) => {
      if (!this.el) {
        resolve();
        return;
      }
      const listener = e => {
        this.el.removeEventListener('transitionend', listener);
        resolve(this);
        this.html.classList.add(this.options.ready);
      };
      this.el.addEventListener('transitionend', listener);
      this.html.classList.remove(this.options.init);
      this.html.classList.add(this.options.loaded);
    });
  }
  toggle() {
    return this.html.classList.contains(this.options.loaded) ? this.show() : this.hide();
  }
}
