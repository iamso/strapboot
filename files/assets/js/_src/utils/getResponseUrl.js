// get the response url in ajax requests
export function getResponseURL(xhr = {}) {
  try {
    if ('responseURL' in xhr) {
      return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL');
    }
  }
  catch(e) {
    // no need to do anything
  }
  return '';
}

export default getResponseURL;
