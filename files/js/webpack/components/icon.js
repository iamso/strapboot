import SVG from './svg';

export default class Icon extends SVG {
  constructor(name) {
    super();

    this.use = new SVG('use');
    this.set(name);
    this.append(this.use);
  }
  set(name) {
    this.use.attr('xlink:href', `#icon-${name}`);
  }
}
