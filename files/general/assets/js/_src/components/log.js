;(function (factory) {
  'use strict';

  if (/^f/.test(typeof define) && define.amd) {
    define([], factory);
  }
  else if (/^o/.test(typeof exports)) {
    factory();
  }
  else {
    factory();
  }
})(function () {
  'use strict';

  var c = console;

  c && c.log('%cMade with %c❤ %cin Switzerland.', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: black; font-size: 14px;', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: red; font-size: 14px;', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; color: black; font-size: 14px;');

});
