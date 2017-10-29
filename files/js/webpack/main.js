import $ from 'jquery';
import u from 'ujs';
import http from 'httprom';
import 'cssevents';
import app from './modules/app';
import './modules/log';
import './modules/social';
import Element from './components/element';

import * as utils from './modules/utils';

// use a getter for isMobile
delete app.isMobile;
Object.defineProperty(app, 'isMobile', {
  get: () => utils.breakpointMatch('xs', 'max')
});

app.regInit(async () => {
  // httpromise example
  const data = await http('https://req.dev.so').get();
  console.log(data);
});

app.regInit(() => {
  const el = new Element('h3');
  el.text = 'This is dynamically created Element';
  el.attach(app.$.main[0]);
});

app.regInit(social);
app.regInit(log);

$(async () => {
  await app.init();
  app.initialized = true;
  await app.pageInit();
  // do something
});

window.app = app; // remove for prod
