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
  xs:  30,
  sm:  48,
  md:  64,
  lg:  75,
  xl:  90,
  xxl: 120,
};

// get the current breakpoint
export function getBreakpoint() {
  const wWidth = window.innerWidth;
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Object.keys(breakpoints).filter(breakpoint => {
    return (wWidth >= breakpoints[breakpoint] * fontSize);
  }).reverse()[0] || 'xs';
};

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
      return false
    }
  }
  else {
    type = 'min';
  }
  return window.matchMedia(`(${type}-width: ${size}em)`).matches;
};
