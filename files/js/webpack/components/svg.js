import Element from './element';

export default class SVG extends Element {
  constructor(type = 'svg', {id = '', classes = []} = {}) {
    const el = type instanceof Node ? type : document.createElementNS('http://www.w3.org/2000/svg', type);
    super(el, {id, classes});
  }
  init(id, classes = []) {
    this.classList = {
      contains: (className) => {
        const regex = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return regex.test(this.className);
      },
      add: (className) => {
        if (!this.classList.contains(className)) {
          this.className += `${this.className ? ' ' : ''}${className}`;
        }
      },
      remove: (className) => {
        const regex = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
        this.className = this.className.replace(regex, '$2');
      },
      toggle: (className) => {
        if (this.classList.contains(className)) {
          this.classList.remove(className);
          return false;
        }
        this.classList.add(className);
        return true;
      },
    };
    if (id) {
      this.el.id = id;
    }
    for (const c of classes) {
      this.classList.add(c);
    }
  }
  attr(attribute, value) {
    const ns = attribute.split(':');
    if (value !== []._) {
      if (ns.length < 2) {
        this.el.setAttribute(attribute, value);
      }
      else {
        this.el.setAttributeNS(`http://www.w3.org/1999/${ns[0]}`, attribute, value);
      }
      return this;
    }
    else if (ns.length < 2) {
      return this.el.getAttribute(attribute);
    }
    this.el.getAttributeNS(`http://www.w3.org/1999/${ns[0]}`, attribute);
  }
  get className() {
    return this.attr('class') || '';
  }
  set className(className) {
    this.attr('class', className);
  }
}
