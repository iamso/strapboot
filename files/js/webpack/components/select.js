import Element from './element';

export class Option extends Element {
  constructor({id = '', classes = []} = {}) {
    super('option', {id, classes});
  }
  get value() {
    return this.el.value;
  }
  set value(value) {
    this.el.value = value;
  }
  get disabled() {
    return this.el.disabled;
  }
  set disabled(disabled) {
    this.el.disabled = disabled;
  }
}

export default class Select extends Element {
  constructor({id = '', classes = []} = {}) {
    super('select', {id, classes});
  }
  focus() {
    this.el.focus();
  }
  get value() {
    return this.el.value;
  }
  set value(value) {
    this.el.value = '' + value;
  }
  get disabled() {
    return this.el.disabled;
  }
  set disabled(disabled) {
    this.el.disabled = disabled;
  }
  add(options) {
    if (!Array.isArray(options)) {
      options = [options];
    }
    for (const option of options) {
      const o = new Option();
      o.text = option.text;
      o.value = option.value;
      this.options.push(o);
      this.append(o);
    }
  }
  set(options) {
    this.reset();
    this.add(options);
  }
  reset() {
    this.options = [];
    this.el.innerHTML = '';
    this.el.value = '';
  }
}
