// cache object for micro template function
const tmplCache = {};

// micro templating function
export function tmpl(str, data) {
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  const fn = !/<%?.*%?>/.test(str) ?
    tmplCache[str] = tmplCache[str] ||
    tmpl(document.querySelector(str).innerHTML) :

    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    /* eslint-disable no-new-func */
    new Function('obj',
      'var p=[],print=function(){p.push.apply(p,arguments);};' +

      // Introduce the data as local variables using with(){}
      'with(obj){p.push(\'' +

      // Convert the template into pure JavaScript
      str
        .replace(/[\r\t\n]/g, ' ')
        .split('<%').join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '\',$1,\'')
        .split('\t').join('\');')
        .split('%>').join('p.push(\'')
        .split('\r').join('\\\'')
        .replace(/@([\w_]+)/g, '(typeof ($1) !== \'undefined\' && ($1))') +
      '\');}return p.join(\'\');');

  // Provide some basic currying to the user
  return data ? fn(data) : fn;
}

export default tmpl;
