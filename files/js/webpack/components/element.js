export default class Element {
  constructor(type = 'div', {id = '', classes = []} = {}) {
    this.el = type instanceof Node ? type : document.createElement(type);
    this.init(id, classes);
  }
  init(id, classes = []) {
    this.classList = this.el.classList;
    if (id) {
      this.el.id = id;
    }
    for (const c of classes) {
      this.classList.add(c);
    }
  }
  bind(app) {
    this.app = app;
  }
  attach(parent = document.body) {
    parent = parent instanceof Element ? parent.element : parent;
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
    for (const e of events) {
      this.el.addEventListener(e, handler);
    }
    return this;
  }
  off(event, handler) {
    const events = event.split(' ');
    for (const e of events) {
      this.el.removeEventListener(e, handler);
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
    if (value !== []._) {
      this.el.setAttribute(attribute, value);
      return this;
    }
    return this.el.getAttribute(attribute);
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
