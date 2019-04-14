import InSicht from 'insicht';

import app from './app';

export default InSicht;

app.on('init', () => {

  app.insicht = new InSicht({
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
