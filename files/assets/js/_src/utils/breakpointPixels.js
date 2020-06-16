import em2px from '@/utils/em2px';
import breakpoints from '@/utils/breakpoints';

// get the pixel value of a breakpoint
export function breakpointPixels(breakpoint) {
  return em2px(breakpoints[breakpoint]);
}

export default breakpointPixels;
