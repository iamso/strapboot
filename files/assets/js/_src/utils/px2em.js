export function px2em(px) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return px / fontSize;
}

export default px2em;
