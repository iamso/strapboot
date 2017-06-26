import $ from 'jquery';
import u from 'ujs';
import http from 'httprom';
import 'cssevents';
import app from './modules/app';
import log from './modules/log';
import social from './modules/social';
import Element from './components/element';


app.regInit(() => {
  // httpromise example
  http('https://req.dev.so')
    .get()
      .then((data) => {
        console.log(data);
      });
});

app.regInit(() => {
  const el = new Element('h3');
  el.text = 'This is dynamically created Element';
  el.attach(app.$.main[0]);
});

app.regInit(social);
app.regInit(log);

$(() => {
  app.init().then(() => {
    app.initialized = true;
    app.pageInit().then(() => {
      // do something
    });
  });
});

window.app = app; // remove for prod
