/**
 * Social Sharing Scripts
 * adds all the social media sharing scripts
 */

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

  var initSocialButtons = function() {
    // Google+
    //
    window.___gcfg = {lang: app.lang};

    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = '//apis.google.com/js/platform.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

    // Facebook
    //
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      var lang = app.lang + '_' + app.lang.toUpperCase();
      js.src = "//connect.facebook.net/"+lang+"/sdk.js#xfbml=1&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    // Twitter
    //
    (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}})(document, 'script', 'twitter-wjs');
  };

  app.regInit(initSocialButtons);

});
