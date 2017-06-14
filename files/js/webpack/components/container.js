import Element from './element';

export default class Container extends Element {
  constructor() {
    super({type: 'div', classes: ['container']});
  }
}
