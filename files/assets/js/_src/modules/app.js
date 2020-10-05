import FastClick from 'fastclick';
import App from '@/lib/App';
import get from '@/lib/get';
import SiteLoader from '@/lib/SiteLoader';
import Scrrroll from 'scrrroll';
import {easeInOutQuad} from 'easings.js';
import {isAndroid, isIos, isIos9, isIphone, isIpad, isSafari, isIE, isEdge, isTouch} from '@/utils/features';

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
  isAndroid && app.el.html.classList.add('is-android');
  isIos && app.el.html.classList.add('is-ios');
  isIos9 && app.el.html.classList.add('is-ios-9');
  isIphone && app.el.html.classList.add('is-iphone');
  isIpad && app.el.html.classList.add('is-ipad');
  isSafari && app.el.html.classList.add('is-safari');
  isIE && app.el.html.classList.add('is-ie');
  isEdge && app.el.html.classList.add('is-edge');

  app.el.html.classList.add(`${isTouch ? '' : 'no-'}touchevents`);
  (isIos9 || isIE || isEdge) && app.el.html.classList.add('no-clip-path');
});

export default app;
