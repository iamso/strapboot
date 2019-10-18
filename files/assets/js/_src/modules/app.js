/* global FastClick */

import 'fastclick';
import App from '@/lib/app';
import get from '@/lib/get';
import SiteLoader from '@/lib/siteloader';
import Scrrroll from 'scrrroll';
import {easeInOutQuad} from 'easings.js';

const app = new App();

app.src = document.currentScript.src.substr(0, document.currentScript.src.lastIndexOf('/') + 1);

app.get = get;
app.loader = new SiteLoader();
app.scroll = Scrrroll;
app.scroll.duration = 800;
app.scroll.easing = easeInOutQuad;

app.on('init', () => {
  app.el = {
    win: window,
    doc: document,
    html: document.documentElement,
    body: document.body,
    header: app.$('#site-header'),
    main: app.$('#site-content'),
    footer: app.$('#site-footer'),
  };
  app.name = '{%= name %}';
  app.lang = app.el.html.lang;

  // attach fastclick listener
  FastClick.attach(app.el.body);

  // add os specific classes
  app.isAndroid && app.el.html.classList.add('is-android');
  app.isIos && app.el.html.classList.add('is-ios');
  app.isIos9 && app.el.html.classList.add('is-ios-9');
  app.isIphone && app.el.html.classList.add('is-iphone');
  app.isIpad && app.el.html.classList.add('is-ipad');
  app.isSafari && app.el.html.classList.add('is-safari');
  app.isIE && app.el.html.classList.add('is-ie');
  app.isEdge && app.el.html.classList.add('is-edge');

  app.el.html.classList.add(`${app.isTouch ? '' : 'no-'}touchevents`);
  (app.isIos9 || app.isIE || app.isEdge) && app.el.html.classList.add('no-clip-path');
});

export default app;
