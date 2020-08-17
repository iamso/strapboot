export function urlParams(obj, prefix) {
  if (obj instanceof FormData) {
    const temp = {};

    obj.forEach(function(value, key){
      temp[key] = value;
    });

    obj = temp;
  }
  else if (!/^o/.test(typeof obj)) {
    return obj;
  }

  const str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== '') {
      const k = prefix ? prefix + "[" + p + "]" : p;
      const v = obj[p];
      str.push(typeof v === "object" ? urlParams(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export function getUrlParams(queryString) {
	const params = {};

  if (!(queryString = location.search.replace('?',''))) {
    return params;
  }

  const queryParams = queryString.split('&');
  const regex = /\[\]$/;

  for (let param of queryParams) {
    let [name, value] = decodeURIComponent(param).split('=');
    value = value ? value.split('+').join(' ') : '';
    if (regex.test(name)) {
      name = name.replace(regex, '');
      if (!Array.isArray(params[name])) {
        params[name] = [];
      }
      params[name] = [...params[name], value];
    }
    else {
      params[name] = value;
    }
  }

  return params;
}

