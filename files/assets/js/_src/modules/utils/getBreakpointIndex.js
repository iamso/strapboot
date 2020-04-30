import breakpointOrder from '@/modules/utils/breakpointOrder';

export function getBreakpointIndex(breakpoint) {
  return breakpointOrder.indexOf(breakpoint);
}

export default getBreakpointIndex;
