import breakpoints from '@/utils/breakpoints';
import breakpointOrder from '@/utils/breakpointOrder';
import getBreakpointIndex from '@/utils/getBreakpointIndex';

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

export default breakpointMatch;
