import * as features from '@/utils/features';
import breakpointMatch from '@/utils/breakpointMatch';

export default class App {
  constructor() {
    this.env = process.env.NODE_ENV;
    this.mobileBreakpoint = 'xs';

    for (let i in features) {
      if (features.hasOwnProperty(i)) {
        this[i] = features[i];
      }
    }

    this._events = {};
  }

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
    else {
      for (const listener of this._events[event]) {
        listener(data);
      }
    }
  }
}
