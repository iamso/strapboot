export function debounce(fn, delay = 250, scope) {
  let timer = null;
  return function() {
    const context = scope || this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export default debounce;
