import breakpointOrder from '@/utils/breakpointOrder';

export function getBreakpointIndex(breakpoint) {
  return breakpointOrder.indexOf(breakpoint);
}

export default getBreakpointIndex;
