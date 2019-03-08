import 'autocreate.js';
import app from './modules/app';
import './modules/loader';
import './modules/router';
import './modules/objectfit';
import './modules/collapsible';
import './modules/scrolltotop';
import './modules/scrollto';
import './modules/parallax';
import './modules/insicht';
import './modules/loadimg';
import './modules/share';
import './modules/log';
import './modules/links';
// import './modules/social';

import * as utils from './modules/utils';

// use a getter for isMobile
delete app.isMobile;
Object.defineProperty(app, 'isMobile', {
  get: () => utils.breakpointMatch('xs', 'max')
});

window.addEventListener('pageshow', e => {
  if (e.persisted) {
    window.location.reload();
  }
});

window.addEventListener('load', () => {
  try {
    app.loader.hide();
  }
  catch(err) {}
});

app.regInit(async () => {
  // request example
  const data = await app.request.get('https://req.dev.so');
  console.log(data);
});

document.addEventListener('DOMContentLoaded', async () => {
  await app.init();
  await app.pageInit();
  app.initialized = true;
  if (document.readyState === 'complete') {
    try {
      app.loader.hide();
    }
    catch(err) {}
  }
  const event = document.createEvent('Event');
  event.initEvent('site-init', true, true);
  window.dispatchEvent(event);
});

window.addEventListener('site-init', () => {
  console.log('all done');
});

window.app = app;
