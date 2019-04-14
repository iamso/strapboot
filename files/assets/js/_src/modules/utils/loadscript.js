// load script dynamically
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script.loaded[src="${src}"]:not(.error)`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.async = true;
    script.onload = (e) => {
      script.classList.add('loaded');
      resolve();
    };
    script.onerror = (e) => {
      script.classList.add('error');
      reject();
    };
    script.src = src;
    document.body.appendChild(script);
  });
}

export default loadScript;
