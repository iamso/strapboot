import breakpointMatch from '@/utils/breakpointMatch';

export default class App {
  env = process.env.NODE_ENV;
  mobileBreakpoint = 'xs';
  _events = {};

  constructor() {}

  get isMobile() {
    return breakpointMatch(this.mobileBreakpoint, 'max');
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

    for (const listener of this._events[event]) {
      listener(data);
    }
  }
}
