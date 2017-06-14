export default class Element {
  constructor({type = 'div', id = '', classes = []} = {}) {
    this.el = document.createElement(type);
    if (id) {
      this.el.id = id;
    }
    for (let c of classes) {
      this.el.classList.add(c);
    }
  }
  bind(app) {
    this.app = app;
  }
  attach(parent = document.body) {
    parent = parent.nodeType === 1 ? parent : parent.element;
    if (!parent.contains(this.el)) {
      parent.appendChild(this.el);
    }
    return this;
  }
  detach() {
    this.el.parentNode.removeChild(this.el);
    return this;
  }
  append(child) {
    child = child.nodeType === 1 ? child : child.element;
    this.el.appendChild(child);
    return this;
  }
  prepend(child) {
    child = child.nodeType === 1 ? child : child.element;
    this.el.insertBefore(child, this.el.firstChild);
    return this;
  }
  remove(child) {
    child = child.nodeType === 1 ? child : child.element;
    this.el.removeChild(child);
    return this;
  }
  empty() {
    this.el.innerHTML = '';
    return this;
  }
  on(event, handler) {
    const events = event.split(' ');
    for (let event of events) {
      this.el.addEventListener(event, handler);
    }
    return this;
  }
  off(event, handler) {
    const events = event.split(' ');
    for (let event of events) {
      this.el.removeEventListener(event, handler);
    }
    return this;
  }
  find(selector) {
    return [].slice.call(this.el.querySelectorAll(selector), 0);
  }
  get element() {
    return this.el;
  }
  get children() {
    return [].slice.call(this.el.children, 0);
  }
  attr(attribute, value) {
    if (value !== undefined) {
      this.el.setAttribute(attribute, value);
      return this;
    }
    else {
      return this.el.getAttribute(attribute);
    }
  }
  get text() {
    return this.el.innerText;
  }
  set text(text) {
    this.el.innerText = text;
  }
  get html() {
    return this.el.innerHTML;
  }
  set html(html) {
    this.el.innerHTML = html;
  }
}
