import Routrrr from 'routrrr';
import app from './app';

import * as utils from './utils';

app.regInit(() => {
  const routrrr = app.router = new Routrrr();

  let p = Promise.resolve();

  routrrr
    .use(req => {
      if (app.initialized) {
        p = p.then(async () => {
          return Promise.all([
            app.loader.show(),
            app.request.get(req.pathname)
          ]).then(([l, data]) => {
            return new Promise(async (resolve, reject) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(data, 'text/html');
              const main = doc.querySelector('#site-content');

              if (main) {
                document.title = doc.title;
                app.el.main.innerHTML = main.innerHTML;
              }

              await app.loader.hide();
              resolve();
            });
          }).catch(() => {});
        });
      }
      else {

      }
    })
    .init();

});
