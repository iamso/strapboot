import em2px from './em2px';
import breakpoints from './breakpoints';

// get the pixel value of a breakpoint
export function breakpointPixels(breakpoint) {
  return em2px(breakpoints[breakpoint]);
}

export default breakpointPixels;
