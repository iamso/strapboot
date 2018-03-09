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

// breakpoints in rem
export const breakpoints = {
  xs: 30,
  sm: 48,
  md: 64,
  lg: 75,
  xl: 90,
  xxl: 120,
  xxxl: 140,
};

// get the current breakpoint
export function getBreakpoint() {
  const wWidth = window.innerWidth;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Object.keys(breakpoints).filter(breakpoint => {
    return (wWidth >= breakpoints[breakpoint] * fontSize);
  }).reverse()[0] || 'xs';
}

// check if the breakpoint matches
export function breakpointMatch(breakpoint, type = 'min') {
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const index = breakpointOrder.indexOf(breakpoint) + 1;
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
