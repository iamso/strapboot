let lastScrollY = 0;
let lastScrollX = 0;

export function storeScrollPos(y = window.pageYOffset, x = window.pageXOffset) {
  lastScrollX = x;
  lastScrollY = y;
}

export function restoreScrollPos(y = lastScrollY, x = lastScrollX) {
  window.scrollTo(x, y);
}
