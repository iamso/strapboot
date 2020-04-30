import InSicht from '@/modules/insicht';

import app from '@/modules/app';

import sortBreakpoints from '@/modules/utils/sortbreakpoints';
import breakpointMatch from '@/modules/utils/breakpointmatch';
import throttle from '@/modules/utils/throttle';

const loadedClass = 'media--loaded';

app.on('init', () => {

  const loadImg = new InSicht({
    container: document.documentElement,
    selector: '[data-load-img], [data-load-bg], [data-load-video]',
    visibleClass: 'insicht--sichtbar',
    stagger: 100,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {
      const data = item.dataset;
      const src = data.loadImg || data.loadBg || data.loadVideo;
      const isBg = !!data.loadBg;
      const isVideo = !!data.loadVideo;

      if (!src) {
        return;
      }

      if (isVideo) {
        const video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.setAttribute('playsinline', true);
        video.oncanplay = () => {
          item.src = video.src;
          item.classList.add(loadedClass);
        };
        video.src = src;
      }
      else {
        const img = new Image();
        img.onload = () => {
          try {
            if (isBg) {
              item.style.backgroundImage = `url(${img.src})`;
            }
            else {
              item.src = img.src;
            }
            item.classList.add(loadedClass);
          }
          catch(e) {}
        };
        img.src = src;
      }
    },
  });

  const loadMediaInside = new InSicht({
    container: document.documentElement,
    selector: '[data-load-media-inside]',
    visibleClass: 'insicht--sichtbar',
    stagger: 100,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {
      const elements = [].slice.call(item.querySelectorAll('[data-img-src], [data-bg-src], [data-video-src]'), 0);

      for (const el of elements) {
        const data = el.dataset;
        const src = data.imgSrc || data.bgSrc || data.videoSrc;
        const isBg = !!data.bgSrc;
        const isVideo = !!data.videoSrc;

        if (!src) {
          continue;
        }

        if (isVideo) {
          const video = document.createElement('video');
          video.muted = true;
          video.autoplay = true;
          video.loop = true;
          video.setAttribute('playsinline', true);
          video.oncanplay = () => {
            el.src = video.src;
            el.classList.add(loadedClass);
          };
          video.src = src;
        }
        else {
          const img = new Image();
          img.onload = () => {
            try {
              if (isBg) {
                el.style.backgroundImage = `url(${img.src})`;
              }
              else {
                el.src = img.src;
              }
              el.classList.add(loadedClass);
            }
            catch(e) {}
          };
          img.src = src;
        }
      }
    },
  });

  const loadSrcset = new InSicht({
    container: document.documentElement,
    selector: '[data-load-srcset], [data-load-bg-srcset], [data-load-video-srcset]',
    visibleClass: 'insicht--sichtbar',
    stagger: 100,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {
      const data = item.dataset;
      const thumb = item.src;
      const isBg = !!data.loadBgSrcset;
      const isVideo = !!data.loadVideoSrcset;

      item.dataset.currentSrc = thumb;

      try {
        const srcset = sortBreakpoints(JSON.parse(data.loadSrcset || data.loadBgSrcset || data.loadVideoSrcset));
        const resize = () => {
          let src = srcset[0].value;
          for (const s of srcset) {
            if (breakpointMatch(s.breakpoint)) {
              src = s.value;
            }
          }

          if (src && src !== item.dataset.currentSrc) {
            try {
              if (isVideo) {
                const video = document.createElement('video');
                video.muted = true;
                video.autoplay = true;
                video.loop = true;
                video.setAttribute('playsinline', true);
                video.oncanplay = () => {
                  item.src = video.src;
                  item.dataset.currentSrc = src
                  item.classList.add(loadedClass);
                };
                video.src = src;
              }
              else {
                const img = new Image();
                img.onload = () => {
                  try {
                    if (isBg) {
                      item.style.backgroundImage = `url(${img.src})`;
                    }
                    else {
                      item.src = img.src;
                    }
                    item.dataset.currentSrc = src;
                    item.classList.add(loadedClass);
                  }
                  catch(e) {}
                };
                img.src = src;
              }
            }
            catch(er) {}
          }
        };

        window.addEventListener('resize', throttle(resize, 50));
        resize();
      }
      catch(e) {

      }
    },
  });

  const loadSrcsetInside = new InSicht({
    container: document.documentElement,
    selector: '[data-load-srcset-inside]',
    visibleClass: 'insicht--sichtbar',
    stagger: 100,
    threshold: 0,
    autoRefresh: true,
    init: (item, instance) => {},
    done: (item, instance) => {
      const elements = [].slice.call(item.querySelectorAll('[data-img-srcset], [data-bg-srcset], [data-video-srcset]'), 0);

      for (const el of elements) {
        const data = el.dataset;
        const thumb = el.src;
        const isBg = !!data.bgSrcset;
        const isVideo = !!data.videoSrcset;

        el.dataset.currentSrc = thumb;

        try {
          const srcset = sortBreakpoints(JSON.parse(data.imgSrcset || data.bbgSrcset || data.videoSrcset));
          const resize = () => {
            let src = srcset[0].value;
            for (const s of srcset) {
              if (breakpointMatch(s.breakpoint)) {
                src = s.value;
              }
            }

            if (src && src !== el.dataset.currentSrc) {
              try {
                if (isVideo) {
                  const video = document.createElement('video');
                  video.muted = true;
                  video.autoplay = true;
                  video.loop = true;
                  video.setAttribute('playsinline', true);
                  video.oncanplay = () => {
                    if (el.src !== video.src) {
                      el.src = video.src;
                    }
                    el.dataset.currentSrc = src;
                    el.classList.add(loadedClass);
                  };
                  video.src = src;
                }
                else {
                  const img = new Image();
                  img.onload = () => {
                    try {
                      if (isBg) {
                        el.style.backgroundImage = `url(${img.src})`;
                      }
                      else {
                        el.src = img.src;
                      }
                      el.dataset.currentSrc = src;
                      el.classList.add(loadedClass);
                    }
                    catch(e) {}
                  };
                  img.src = src;
                }
              }
              catch(er) {}
            }
          };

          window.addEventListener('resize', throttle(resize, 50));
          resize();
        }
        catch(e) {

        }
      }
    },
  });


});