const isTouch = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

const isIos = /iP(hone|od|ad)/g.test(navigator.platform);
const isIos9 = /iP(hone|od|ad)/g.test(navigator.platform) && +(navigator.appVersion).match(/OS (\d+)?/)[1] <= 9;
const isIphone = /iP(hone|od)/g.test(navigator.platform);
const isIpad = /(iPad)/g.test(navigator.platform);
const isAndroid = /(Android)/gi.test(navigator.userAgent);

const isIE = /Trident\/|MSIE /.test(navigator.userAgent);
const isEdge = /Edge\//.test(navigator.userAgent);
const isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
const isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;
let isChrome = navigator.userAgent.indexOf('Chrome') > -1;
let isSafari = navigator.userAgent.indexOf('Safari') > -1;

if ((isChrome) && (isSafari)) {
	isSafari = false;
}
if ((isChrome) && (isOpera)) {
	isChrome = false;
}

let supportsPassive = false;

try {
	window.addEventListener('test', null, {
		get passive() {
			supportsPassive = true;
		},
	});
} catch (e) {
	// do nothing
}

const supportsObjectFit = ('objectFit' in document.documentElement.style);

const hasServiceWorker = ('serviceWorker' in navigator);

const cssTransformSVG = (() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 2 2');
  svg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    z-index: 2147483647;
  `;
  svg.innerHTML = '<rect width="1" height="1" style="transform: translate(1px, 1px)"/>';
  document.body.appendChild(svg);
  const result = document.elementFromPoint(1, 1) !== svg;
  svg.parentNode.removeChild(svg);
  return result;
})();

export {
	isTouch,
	isIos,
	isIos9,
	isIphone,
	isIpad,
	isAndroid,
	isIE,
	isEdge,
	isFirefox,
	isChrome,
	isOpera,
	isSafari,
	supportsPassive,
	supportsObjectFit,
  hasServiceWorker,
  cssTransformSVG
}


