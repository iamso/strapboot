import http from 'httprom';
import Cacherrr from 'cacherrr';

export default class Request {
  constructor(cacheTime = 15*60*1000) {
    this.cacheTime = cacheTime;
    this.cache = new Cacherrr(cacheTime);

    try {
      if (localStorage.requestCache) {
        const entries = JSON.parse(localStorage.requestCache)
        this.cache.entries = entries;
      }
    }
    catch(er) {}
  }
  get(url, cacheTime = this.cacheTime, onProgress) {
    return new Promise((resolve, reject) => {
      this.cache.get(url)
        .then(data => {
          if (typeof onProgress === 'function') {
            onProgress(1, 1);
          }
          console.info('from cache:', url);
          resolve(data);
        })
        .catch(err => {
          const req = http(url);

          if (typeof onProgress === 'function') {
            req.xhr.onprogress = (e) => {
              if (e.lengthComputable) {
                onProgress(e.total, e.loaded);
              }
            };
          }

          req.get()
            .then(data => {
              console.info('from server:', url);
              this.cache.set(url, data, cacheTime).then(d => {
                try {
                  try {
                    localStorage.requestCache = JSON.stringify(this.cache.entries);
                  }
                  catch(er) {
                    localStorage.removeItem('requestCache');
                  }
                }
                catch(er2) {}
                resolve(d);
              });
            })
            .catch(data => {
              console.error('not found:', url);
              reject();
            });
        });
    });
  }
}
