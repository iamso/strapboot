export function em2px(em) {
  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return em * fontSize;
}

export default em2px;
