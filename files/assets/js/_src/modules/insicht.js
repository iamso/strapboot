import InSicht from 'insicht';
import app from '@/modules/app';

app.on('init', () => {

  app.insicht = new InSicht({
    container: document.documentElement,
    selector: '.insicht',
    visibleClass: 'insicht--sichtbar',
    stagger: 200,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {},
  });

});
