import autocreate from 'autocreate.js';
import app from '@/modules/app';

const shareUrls = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  twitter: 'https://twitter.com/intent/tweet?url=',
  google: 'https://plus.google.com/share?url=',
  whatsapp: 'https://api.whatsapp.com/send?text=',
  pinterest: 'http://pinterest.com/pin/create/button/?url=',
  email: '',
};

app.on('init', () => {
  autocreate({
    selector: '[data-share]',
    create: function(element) {
      element.addEventListener('click', e => {
        e.preventDefault();

        const share = element.dataset.share;
        const url = element.dataset.url || window.location.href;
        const media = element.dataset.media;
        const text = encodeURIComponent(element.dataset.text || document.title);
        const subject = encodeURIComponent(element.dataset.subject);
        let shareUrl = shareUrls[share] + encodeURIComponent(url);

        if (share === 'whatsapp') {
          shareUrl = shareUrls[share] + text + encodeURIComponent('\n' + url);
        }
        else if (share === 'pinterest') {
          shareUrl += `&description=${text}`;
          if (media) {
            shareUrl += `&media=${media}`;
          }
        }
        else {
          shareUrl += `&text=${text}`;
        }

        if (share === 'mail') {
          window.location.href = `mailto:?subject=${subject}&body=${`${text}${encodeURIComponent(`\n\n${url}`)}`}`;
        }
        else {
          window.open(shareUrl, 'share', 'width=600,height=472');
        }

        return false;
      });
    },
    destroy: function(element) {}
  });
});
