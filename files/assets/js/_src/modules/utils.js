// compare two (object-) arrays
export function compareArrays(arr1 = [], arr2 = [], props = []) {
  return arr1.length === arr2.length && arr1.every((item, i) => {
    let same = true;

    if (props && Array.isArray(props) && props.length) {
      for (const prop of props) {
        if (arr1[i][prop] !== arr2[i][prop]) {
          same = false;
          break;
        }
      }
    }
    else {
      same = arr1[i] === arr2[i];
    }
    return same;
  });
}

// get the response url in ajax requests
export function getResponseURL(xhr = {}) {
  try {
    if ('responseURL' in xhr) {
      return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL');
    }
  }
  catch(e) {}
  return '';
}

export function em2px(em) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return em * fontSize;
}

export function px2em(px) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / fontSize;
}

// breakpoints in rem
export const breakpoints = {
  xxs: 20,
  xs: 30,
  sm: 48,
  md: 62,
  lg: 75,
  xl: 90,
  xxl: 120,
  xxxl: 140,
};

export const breakpointOrder = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

// get the pixel value of a breakpoint
export function breakpointPixels(breakpoint) {
  return em2px(breakpoints[breakpoint]);
}

// get the current breakpoint
export function getBreakpoint() {
  const wWidth = window.innerWidth;
  return Object.keys(breakpoints).filter(breakpoint => {
    return (wWidth >= em2px(breakpoints[breakpoint]));
  }).reverse()[0] || 'xs';
}

export function getBreakpointIndex(breakpoint) {
  return breakpointOrder.indexOf(breakpoint);
}

export function sortBreakpoints(obj = {}) {
  const arr = [];
  for (const breakpoint of breakpointOrder) {
    if (obj[breakpoint]) {
      arr.push({
        breakpoint: breakpoint,
        value: obj[breakpoint],
      });
    }
  }
  return arr;
}

// check if the breakpoint matches
export function breakpointMatch(breakpoint, type = 'min') {
  const index = getBreakpointIndex(breakpoint) + 1;
  let size = breakpoints[breakpoint];

  if (type === 'max') {
    if (index && index < breakpointOrder.length) {
      size = breakpoints[breakpointOrder[index]] - 0.001;
    }
    else {
      return false;
    }
  }
  else {
    type = 'min';
  }
  return window.matchMedia(`(${type}-width: ${size}em)`).matches;
}

// sleep function using promise
export function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

// load script dynamically
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script.loaded[src="${src}"]:not(.error)`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.onload = (e) => {
      script.classList.add('loaded');
      resolve();
    };
    script.onerror = (e) => {
      script.classList.add('error');
      reject();
    };
    script.src = src;
    document.body.appendChild(script);
  });
}

// cache object for micro template function
const tmplCache = {};

// micro templating function
export function tmpl(str, data) {
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  const fn = !/<%?.*%?>/.test(str) ?
    tmplCache[str] = tmplCache[str] ||
    tmpl(document.querySelector(str).innerHTML) :

    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    /* eslint-disable no-new-func */
    new Function('obj',
      'var p=[],print=function(){p.push.apply(p,arguments);};' +

      // Introduce the data as local variables using with(){}
      'with(obj){p.push(\'' +

      // Convert the template into pure JavaScript
      str
        .replace(/[\r\t\n]/g, ' ')
        .split('<%').join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '\',$1,\'')
        .split('\t').join('\');')
        .split('%>').join('p.push(\'')
        .split('\r').join('\\\'')
        .replace(/@([\w_]+)/g, '(typeof ($1) !== \'undefined\' && ($1))') +
      '\');}return p.join(\'\');');

  // Provide some basic currying to the user
  return data ? fn(data) : fn;
}

export function debounce(fn, delay = 250, scope) {
  let timer = null;
  return function() {
    const context = scope || this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

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

export function formatNumber(num = 0, userOpts = {}) {
  const defaults = {
    decimals: 2,
    prefix: '',
    suffix: '',
    decimal: '.',
    thousand: '’',
    minLength: 3,
  };
  const opts = Object.assign({}, defaults, userOpts);

  // Cast the string to a number
  if (num === num + '') {
    num *= 1;
  }

  if (!isFinite(num)) {
    return false;
  }

  const length = num.toFixed(0).length;
  num = num.toFixed(opts.decimals);

  // Replace the dot
  num = num.replace(/\./, opts.decimal);

  // Set the thousand separator
  if (length > opts.minLength) {
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousand);
  }

  num = `${opts.prefix}${num}${opts.suffix}`;

  return num;
}
