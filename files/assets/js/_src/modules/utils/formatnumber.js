export function formatNumber(num = 0, userOpts = {}) {
  const defaults = {
    decimals: 2,
    prefix: '',
    suffix: '',
    decimal: '.',
    thousand: '’',
    minLength: 3,
  };
  const opts = Object.assign({}, defaults, userOpts);

  // Cast the string to a number
  if (num === num + '') {
    num *= 1;
  }

  if (!isFinite(num)) {
    return false;
  }

  const length = num.toFixed(0).length;
  num = num.toFixed(opts.decimals);

  // Replace the dot
  num = num.replace(/\./, opts.decimal);

  // Set the thousand separator
  if (length > opts.minLength) {
    num = num.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousand);
  }

  num = `${opts.prefix}${num}${opts.suffix}`;

  return num;
}

export default formatNumber;
