import Routrrr from 'routrrr';
import app from '@/modules/app';

app.on('init', () => {
  const routrrr = app.router = new Routrrr();

  let p = Promise.resolve();

  routrrr
    .use(req => {
      if (app.initialized) {
        p = p.then(async () => {
          const request = new Request(req.pathname, {
            headers: new Headers({
              accept: 'text/html'
            })
          });

          return Promise.all([
            app.loader.show(),
            app.get(request)
          ]).then(([, data]) => {
            return new Promise(async resolve => {
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
    })
    .init();

});
