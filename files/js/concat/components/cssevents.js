;(function(window, document, undefined) {
  'use strict';

  var t,
      el = document.createElement("div");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "msTransition"    : "MSTransitionEnd",
    "WebkitTransition": "webkitTransitionEnd"
  };

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "msAnimation"    : "MSAnimationEnd",
    "WebkitAnimation": "webkitAnimationEnd"
  };

  for (t in transitions){
    if (el.style[t] !== undefined){
      window.transitionEnd = transitions[t];
      break;
    }
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      window.animationEnd = animations[t];
      break;
    }
  }

})(window, document);
