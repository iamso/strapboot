let isTouch = (('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

let isIos = /iP(hone|od|ad)/g.test(navigator.platform);
let isIos9 = /iP(hone|od|ad)/g.test(navigator.platform) && +(navigator.appVersion).match(/OS (\d+)?/)[1] <= 9;
let isIphone = /iP(hone|od)/g.test(navigator.platform);
let isIpad = /(iPad)/g.test(navigator.platform);
let isAndroid = /(Android)/gi.test(navigator.userAgent);

let isIE = /Trident\/|MSIE /.test(navigator.userAgent);
let isEdge = /Edge\//.test(navigator.userAgent);
let isChrome = navigator.userAgent.indexOf('Chrome') > -1;
let isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
let isSafari = navigator.userAgent.indexOf('Safari') > -1;
let isOpera = navigator.userAgent.toLowerCase().indexOf('op') > -1;

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

let supportsObjectFit = ('objectFit' in document.documentElement.style);

const mobileBreakpoint = 1024;
const isMobile = () => {
	return window.innerWidth < mobileBreakpoint;
};

export {
	isTouch,
	isIos,
	isIos9,
	isIphone,
	isIpad,
	isAndroid,
	isIE,
	isEdge,
	isChrome,
	isFirefox,
	isSafari,
	isOpera,
	supportsPassive,
	supportsObjectFit,
	mobileBreakpoint,
	isMobile
}


