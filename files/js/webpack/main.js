'use strict';

import $ from 'jquery';
import u from 'ujs';
import FastClick from 'fastclick';
import http from 'httprom';
import './lib/cssevents';
import App from './modules/app';
import log from './modules/log';
import social from './modules/social';

const app = new App();

app.regInit(() => {
  app.$ = {
    win: $(window),
    doc: $(document),
    docEl: $(document.documentElement),
    html: $('html'),
    body: $('body'),
  };
  app.name = '{%= name %}';
  app.lang = app.$.html.attr('lang');

  // attach fastclick listener
  FastClick.attach(document.body);

  // add os specific classes
  app.isIos && app.$.html.addClass('is-ios');
  app.isAndroid && app.$.html.addClass('is-android');
});

app.regInit(() => {
  // httpromise example
  http('https://req.dev.so')
    .get()
      .then((data) => {
        console.log(data);
      });
});

app.regInit(social);
app.regInit(log);

window.app = app;
$(app.init.bind(app));
