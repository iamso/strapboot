import Element from './element';

export default class Input extends Element {
  constructor({type = 'input', id = '', classes = []} = {}) {
    super({type, id, classes});
  }
  focus() {
    this.el.focus();
  }
  get value() {
    return this.el.value;
  }
  set value(value) {
    this.el.value = ''+value;
  }
  get type() {
    return this.el.type;
  }
  set type(type) {
    this.el.type = ''+type;
  }
  get placeholder() {
    return this.el.placeholder;
  }
  set placeholder(placeholder) {
    this.el.placeholder = ''+placeholder;
  }
  get checked() {
    return this.el.checked;
  }
  set checked(checked) {
    return this.el.checked = !!checked;
  }
}
