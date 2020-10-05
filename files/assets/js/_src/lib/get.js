function get(url, progress) {
  return new Promise((resolve, reject) => {
    let contentType;
    fetch(url)
      .then(response => {
        // if (!response.ok) {
        //   throw Error(response.status+' '+response.statusText);
        // }

        contentType = response.headers.get('Content-Type');

        if (!response.body) {
          return response;
        }

        const contentLength = response.headers.get('content-length');
        if (!contentLength) {
          return response;
        }

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        return new Response(
          new ReadableStream({
            start(controller) {
              const reader = response.body.getReader();

              function read() {
                reader.read().then(({done, value}) => {
                  if (done) {
                    controller.close();
                    return;
                  }
                  loaded += value.byteLength;
                  if (typeof progress === 'function') {
                    progress(loaded, total);
                  }
                  controller.enqueue(value);
                  read();
                }).catch(error => {
                  controller.error(error);
                });
              }
              read();
            }
          })
        );
      })
      .then(response => {
        if (contentType.indexOf('application/json') >= 0) {
          return response.json();
        }
        return response.text();
      })
      .then(data => {
        if (typeof progress === 'function') {
          progress(100, 100);
        }
        resolve(data);
      })
      .catch(error => {
        console.error('not found:', url);
        reject(error);
      });
  });
}

export default get;
