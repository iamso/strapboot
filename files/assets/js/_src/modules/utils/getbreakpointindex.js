import breakpointOrder from './breakpointorder';

export function getBreakpointIndex(breakpoint) {
  return breakpointOrder.indexOf(breakpoint);
}

export default getBreakpointIndex;
