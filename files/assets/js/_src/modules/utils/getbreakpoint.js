import em2px from './em2px';
import breakpoints from './breakpoints';

// get the current breakpoint
export function getBreakpoint() {
  const wWidth = window.innerWidth;
  return Object.keys(breakpoints).filter(breakpoint => {
    return (wWidth >= em2px(breakpoints[breakpoint]));
  }).reverse()[0] || 'xs';
}

export default getBreakpoint;
