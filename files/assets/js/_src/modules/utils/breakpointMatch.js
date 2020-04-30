import breakpoints from '@/modules/utils/breakpoints';
import breakpointOrder from '@/modules/utils/breakpointOrder';
import getBreakpointIndex from '@/modules/utils/getBreakpointIndex';

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
