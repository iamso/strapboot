import InSicht from 'insicht';

import app from './app';
import * as utils from './utils';

export default InSicht;

app.regInit(() => {

  const insicht = new InSicht({
    container: document.documentElement,
    selector: '[data-insicht]',
    visibleClass: 'sichtbar',
    stagger: 200,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {},
  });

});
