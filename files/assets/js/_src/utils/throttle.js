export function throttle(fn, threshhold = 250, scope) {
  let last;
  let deferTimer;
  return function() {
    const context = scope || this;
    const now = Date.now();
    const args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    }
    else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export default throttle;
