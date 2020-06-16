import breakpointOrder from '@/utils/breakpointOrder';

export function sortBreakpoints(obj = {}) {
  const arr = [];
  for (const breakpoint of breakpointOrder) {
    if (obj[breakpoint]) {
      arr.push({
        breakpoint: breakpoint,
        value: obj[breakpoint],
      });
    }
  }
  return arr;
}

export default sortBreakpoints;
