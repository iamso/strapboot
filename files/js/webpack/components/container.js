import Element from './element';

export default class Container extends Element {
  constructor() {
    super('div', {classes: ['container']});
  }
}
