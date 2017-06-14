import Element from './element';

export default class Dialog extends Element {
  constructor() {
    super({type: 'div', classes: ['dialog-container']});

    this.root = document.body;

    this.title = new Element({type: 'h5', classes: ['dialog-title']});
    this.txt = new Element({type: 'div', classes: ['dialog-text']});
    this.cancel = new Element({type: 'button', classes: ['dialog-button', 'dialog-cancel']});
    this.ok = new Element({type: 'button', classes: ['dialog-button', 'dialog-ok']});

    this.buttons = new Element({type: 'div', classes: ['dialog-buttons']});
    this.buttons
      .append(this.ok)
      .append(this.cancel);

    this.window = new Element({type: 'div', classes: ['dialog-window']});
    this.window
      .append(this.title)
      .append(this.txt)
      .append(this.buttons);

    this.append(this.window);

    this.cancel.on('click', e => {
      this.close();
    });
    this.fn = e => {};
    this.ok.on('click', e => {
      this.fn && this.fn(this);
      this.close();
    });
  }
  open({
    title = 'Dialog Title',
    text = 'Dialog Text',
    cancel = 'cancel',
    ok = 'ok',
    fn = e => {},
  } = {}) {
    this.title.text = title;
    this.txt.text = text;
    this.cancel.text = cancel;
    this.ok.text = ok;
    this.fn = fn;
    this.root.classList.add('show-dialog');
  }
  close() {
    this.fn = e => {};
    this.root.classList.remove('show-dialog');
  }
}
